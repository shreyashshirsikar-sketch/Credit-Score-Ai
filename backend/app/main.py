from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import json
import os
from datetime import datetime
from typing import Dict, List, Optional

# Initialize FastAPI app
app = FastAPI(
    title="Credit Score Prediction API",
    description="API for predicting credit scores using ML",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and preprocessing objects
try:
    model = joblib.load('ml_model/saved_models/credit_model.pkl')
    scaler = joblib.load('ml_model/saved_models/scaler.pkl')
    label_encoder = joblib.load('ml_model/saved_models/label_encoder.pkl')
    features = joblib.load('ml_model/saved_models/features.pkl')
    print("✅ Models loaded successfully")
    print(f"📊 Model expects {len(features)} features: {features}")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    # Create dummy objects for development
    model = None
    scaler = None
    label_encoder = None
    features = []

# Pydantic model for input validation
class CreditData(BaseModel):
    age: float
    monthly_income: float
    loan_amount: float
    credit_utilization: float
    missed_payments: int
    total_active_loans: int
    credit_history_years: float
    loan_tenure_months: float

class PredictionResponse(BaseModel):
    status: str
    prediction: Dict

def get_loan_decision(score_band: str, risk_score: float) -> Dict:
    """Determine loan decision based on credit score band and risk"""
    if score_band == "Excellent":
        return {
            "decision": "APPROVED",
            "risk_level": "LOW",
            "interest_rate": "7.5% - 9.5%",
            "approval_chance": "Very High (>90%)"
        }
    elif score_band == "Good":
        return {
            "decision": "APPROVED",
            "risk_level": "MODERATE",
            "interest_rate": "10.5% - 12.5%",
            "approval_chance": "High (75-90%)"
        }
    elif score_band == "Fair":
        return {
            "decision": "APPROVED WITH CONDITIONS",
            "risk_level": "MEDIUM",
            "interest_rate": "13.5% - 15.5%",
            "approval_chance": "Medium (50-75%)"
        }
    else:  # Poor
        if risk_score < 70:
            return {
                "decision": "REVIEW REQUIRED",
                "risk_level": "HIGH",
                "interest_rate": "16.5% - 18.5%",
                "approval_chance": "Low (25-50%)"
            }
        else:
            return {
                "decision": "DECLINED",
                "risk_level": "VERY HIGH",
                "interest_rate": "N/A",
                "approval_chance": "Very Low (<25%)"
            }

def generate_insights(data: CreditData, risk_score: float, score_band: str, 
                      loan_to_income: float, utilization_per_loan: float) -> Dict[str, List[str]]:
    """Generate actionable insights based on user's data"""
    insights = []
    warnings = []
    recommendations = []
    
    # Warnings
    if data.credit_utilization > 0.7:
        warnings.append("High credit utilization (>70%). Consider paying down balances to improve score.")
    
    if data.missed_payments > 2:
        warnings.append(f"{data.missed_payments} missed payments detected. Focus on timely payments.")
    
    if loan_to_income > 0.5:
        warnings.append("High loan-to-income ratio. Consider reducing loan amount or increasing income.")
    
    if utilization_per_loan > 0.4:
        warnings.append("High credit utilization per active loan. Consider closing unnecessary accounts.")
    
    # Recommendations
    if data.credit_history_years < 2:
        recommendations.append("Short credit history. Keep accounts open and active to build history.")
    
    if data.age < 25:
        recommendations.append("Young borrower. Building credit history is key at this stage.")
    
    # Positive feedback
    if data.missed_payments == 0:
        recommendations.append("Excellent payment history - keep it up!")
    
    if data.credit_utilization < 0.3:
        recommendations.append("Good credit utilization ratio.")
    
    if loan_to_income < 0.3:
        recommendations.append("Healthy loan-to-income ratio.")
    
    # Score-based insights
    if score_band in ["Poor", "Fair"]:
        recommendations.append("Consider improving your credit score by reducing outstanding debt.")
    
    return {
        "warnings": warnings,
        "recommendations": recommendations,
        "score_analysis": f"Your credit score is categorized as '{score_band}' with a risk score of {risk_score:.1f}/100"
    }

@app.get("/")
def read_root():
    return {
        "message": "Credit Score Prediction API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": [
            "/docs - API documentation",
            "/health - Health check",
            "/status - System status",
            "/predict - Make predictions",
            "/metrics - Model performance metrics",
            "/feature-importance - Feature importance data",
            "/sample-data - Get sample input data"
        ]
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy" if model is not None else "degraded",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None,
        "encoder_loaded": label_encoder is not None,
        "features_loaded": len(features) > 0
    }

@app.get("/status")
async def get_system_status():
    """Get system status"""
    return {
        "status": "running",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": os.path.exists("ml_model/saved_models/credit_model.pkl"),
        "api_version": "1.0.0",
        "total_features": len(features) if features else 0,
        "supported_score_bands": ["Poor", "Fair", "Good", "Excellent"]
    }

@app.get("/metrics")
async def get_model_metrics():
    """Get model performance metrics"""
    metrics_file = "ml_model/evaluation_results/detailed_metrics.json"
    if os.path.exists(metrics_file):
        try:
            with open(metrics_file, 'r') as f:
                metrics = json.load(f)
            return {
                "status": "success",
                "metrics": metrics,
                "last_updated": datetime.fromtimestamp(os.path.getmtime(metrics_file)).isoformat()
            }
        except Exception as e:
            return {"status": "error", "message": f"Error reading metrics: {str(e)}"}
    
    # Return default metrics if file doesn't exist
    return {
        "status": "success",
        "metrics": {
            "accuracy": 0.85,
            "precision": 0.83,
            "recall": 0.82,
            "f1_score": 0.82,
            "confusion_matrix": [[150, 20], [25, 180]],
            "classification_report": {
                "Poor": {"precision": 0.80, "recall": 0.85, "f1-score": 0.82, "support": 170},
                "Fair": {"precision": 0.82, "recall": 0.78, "f1-score": 0.80, "support": 165},
                "Good": {"precision": 0.87, "recall": 0.85, "f1-score": 0.86, "support": 175},
                "Excellent": {"precision": 0.90, "recall": 0.88, "f1-score": 0.89, "support": 180}
            }
        },
        "note": "Using default metrics - train model to get actual metrics"
    }

@app.get("/feature-importance")
async def get_feature_importance():
    """Get feature importance data"""
    try:
        features_file = "ml_model/saved_models/features.pkl"
        model_file = "ml_model/saved_models/credit_model.pkl"
        
        if os.path.exists(features_file) and os.path.exists(model_file):
            features_list = joblib.load(features_file)
            model = joblib.load(model_file)
            
            if hasattr(model, 'feature_importances_'):
                importance = model.feature_importances_
                # Sort by importance
                feature_importance = sorted(
                    [{"feature": feat, "importance": float(imp)} 
                     for feat, imp in zip(features_list, importance)],
                    key=lambda x: x["importance"],
                    reverse=True
                )
                return {
                    "status": "success",
                    "total_features": len(feature_importance),
                    "feature_importance": feature_importance
                }
        
        # Return default if no model
        return {
            "status": "success",
            "total_features": 14,
            "feature_importance": [
                {"feature": "Credit_Utilization", "importance": 0.25},
                {"feature": "Missed_Payments_Last_12M", "importance": 0.18},
                {"feature": "Monthly_Income", "importance": 0.15},
                {"feature": "Loan_to_Income_Ratio", "importance": 0.12},
                {"feature": "Credit_History_Years", "importance": 0.10},
                {"feature": "Age", "importance": 0.08},
                {"feature": "Total_Active_Loans", "importance": 0.05},
                {"feature": "Utilization_Per_Loan", "importance": 0.04},
                {"feature": "Loan_Amount", "importance": 0.03},
                {"feature": "Payment_Reliability", "importance": 0.02},
                {"feature": "Debt_to_Income", "importance": 0.015},
                {"feature": "Age_Credit_Interaction", "importance": 0.01},
                {"feature": "Score_to_Income_Ratio", "importance": 0.005},
                {"feature": "Loan_Tenure_Months", "importance": 0.005}
            ],
            "note": "Using default feature importance - train model to get actual values"
        }
    except Exception as e:
        return {"status": "error", "message": f"Error getting feature importance: {str(e)}"}

@app.get("/sample-data")
async def get_sample_data():
    """Get sample input data for testing"""
    return {
        "status": "success",
        "samples": [
            {
                "description": "Good credit applicant",
                "data": {
                    "age": 35,
                    "monthly_income": 75000,
                    "loan_amount": 500000,
                    "credit_utilization": 0.3,
                    "missed_payments": 0,
                    "total_active_loans": 2,
                    "credit_history_years": 8,
                    "loan_tenure_months": 60
                }
            },
            {
                "description": "Average credit applicant",
                "data": {
                    "age": 28,
                    "monthly_income": 45000,
                    "loan_amount": 300000,
                    "credit_utilization": 0.6,
                    "missed_payments": 1,
                    "total_active_loans": 3,
                    "credit_history_years": 4,
                    "loan_tenure_months": 48
                }
            },
            {
                "description": "Poor credit applicant",
                "data": {
                    "age": 22,
                    "monthly_income": 25000,
                    "loan_amount": 200000,
                    "credit_utilization": 0.9,
                    "missed_payments": 3,
                    "total_active_loans": 5,
                    "credit_history_years": 1,
                    "loan_tenure_months": 36
                }
            }
        ]
    }

@app.post("/predict", response_model=PredictionResponse)
def predict_credit_score(data: CreditData):
    try:
        # Validate input
        if data.monthly_income <= 0:
            raise HTTPException(status_code=400, detail="Income must be positive")
        
        if data.credit_utilization < 0 or data.credit_utilization > 1:
            raise HTTPException(status_code=400, detail="Credit utilization must be between 0 and 1")
        
        if data.missed_payments < 0:
            raise HTTPException(status_code=400, detail="Missed payments cannot be negative")
        
        if data.total_active_loans < 0:
            raise HTTPException(status_code=400, detail="Total active loans cannot be negative")
        
        if data.loan_tenure_months <= 0:
            raise HTTPException(status_code=400, detail="Loan tenure must be positive")
        
        # Check if model is loaded
        if model is None or scaler is None or label_encoder is None:
            raise HTTPException(status_code=500, detail="Model not loaded. Please train the model first.")
        
        # Calculate ALL engineered features
        loan_to_income = data.loan_amount / data.monthly_income if data.monthly_income > 0 else 0
        utilization_per_loan = data.credit_utilization / (data.total_active_loans + 0.001)
        
        # Engineered features
        payment_reliability = 1.0 / (1.0 + data.missed_payments)
        debt_to_income = (data.total_active_loans * 100000) / (data.monthly_income + 0.001)
        age_credit_interaction = data.age * data.credit_history_years
        score_to_income_ratio = 500 / (data.monthly_income + 0.001)
        
        # Create COMPLETE features dictionary with ALL 14 features
        features_dict = {
            # Basic features (8):
            'Age': data.age,
            'Monthly_Income': data.monthly_income,
            'Loan_Amount': data.loan_amount,
            'Loan_Tenure_Months': data.loan_tenure_months,
            'Credit_Utilization': data.credit_utilization,
            'Missed_Payments_Last_12M': data.missed_payments,
            'Total_Active_Loans': data.total_active_loans,
            'Credit_History_Years': data.credit_history_years,
            
            # Engineered features (6):
            'Loan_to_Income_Ratio': loan_to_income,
            'Utilization_Per_Loan': utilization_per_loan,
            'Payment_Reliability': payment_reliability,
            'Debt_to_Income': debt_to_income,
            'Score_to_Income_Ratio': score_to_income_ratio,
            'Age_Credit_Interaction': age_credit_interaction
        }
        
        # Debug logging
        print(f"🔧 Features calculated: {len(features_dict)}")
        for key, value in features_dict.items():
            print(f"  {key}: {value:.6f}")
        
        # Create feature array in correct order
        features_array = np.array([[features_dict[feature] for feature in features]])
        
        # Scale features
        features_scaled = scaler.transform(features_array)
        
        # Make prediction
        prediction_encoded = model.predict(features_scaled)
        
        # Decode prediction
        score_band = label_encoder.inverse_transform(prediction_encoded)[0]
        
        # Calculate risk score (0-100)
        risk_score = min(100, max(0, 
            (data.missed_payments * 10) + 
            (data.credit_utilization * 30) + 
            (loan_to_income * 20) +
            (utilization_per_loan * 10) +
            ((data.age < 25) * 10) +
            (data.total_active_loans * 5)
        ))
        
        # Get loan decision using business rules
        decision_info = get_loan_decision(score_band, risk_score)
        
        # Generate insights
        insights = generate_insights(data, risk_score, score_band, loan_to_income, utilization_per_loan)
        
        return PredictionResponse(
            status="success",
            prediction={
                "credit_score_band": score_band,
                "risk_score": round(risk_score, 2),
                "loan_decision": decision_info['decision'],
                "risk_level": decision_info['risk_level'],
                "suggested_interest_rate": decision_info['interest_rate'],
                "approval_chance": decision_info['approval_chance'],
                "features": {
                    # Basic features:
                    "age": data.age,
                    "monthly_income": data.monthly_income,
                    "loan_amount": data.loan_amount,
                    "loan_tenure_months": data.loan_tenure_months,
                    "credit_utilization": data.credit_utilization,
                    "missed_payments": data.missed_payments,
                    "total_active_loans": data.total_active_loans,
                    "credit_history_years": data.credit_history_years,
                    
                    # Engineered features:
                    "loan_to_income_ratio": round(loan_to_income, 6),
                    "utilization_per_loan": round(utilization_per_loan, 6),
                    "payment_reliability": round(payment_reliability, 6),
                    "debt_to_income": round(debt_to_income, 6),
                    "score_to_income_ratio": round(score_to_income_ratio, 6),
                    "age_credit_interaction": round(age_credit_interaction, 6)
                },
                "insights": insights,
                "timestamp": datetime.now().isoformat()
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)