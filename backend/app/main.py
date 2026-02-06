from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
from typing import Dict, List
import os

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

app = FastAPI(title="Credit Score Prediction API", 
              description="API for predicting credit scores using ML")

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

def get_loan_decision(score_band: str, risk_score: float) -> Dict:
    """Determine loan decision based on credit score band and risk"""
    if score_band == "Excellent":
        return {
            "decision": "APPROVED",
            "risk_level": "LOW",
            "interest_rate": "7.5% - 9.5%"
        }
    elif score_band == "Good":
        return {
            "decision": "APPROVED",
            "risk_level": "MODERATE",
            "interest_rate": "10.5% - 12.5%"
        }
    elif score_band == "Fair":
        return {
            "decision": "APPROVED WITH CONDITIONS",
            "risk_level": "MEDIUM",
            "interest_rate": "13.5% - 15.5%"
        }
    else:  # Poor
        if risk_score < 70:
            return {
                "decision": "REVIEW REQUIRED",
                "risk_level": "HIGH",
                "interest_rate": "16.5% - 18.5%"
            }
        else:
            return {
                "decision": "DECLINED",
                "risk_level": "VERY HIGH",
                "interest_rate": "N/A"
            }

def generate_insights(data: CreditData, risk_score: float, score_band: str, 
                      loan_to_income: float, utilization_per_loan: float) -> Dict[str, List[str]]:
    """Generate actionable insights based on user's data"""
    insights = []
    
    if data.credit_utilization > 0.7:
        insights.append("⚠️ High credit utilization (>70%). Consider paying down balances to improve score.")
    
    if data.missed_payments > 2:
        insights.append(f"⚠️ {data.missed_payments} missed payments detected. Focus on timely payments.")
    
    if loan_to_income > 0.5:
        insights.append("⚠️ High loan-to-income ratio. Consider reducing loan amount or increasing income.")
    
    if utilization_per_loan > 0.4:
        insights.append("⚠️ High credit utilization per active loan. Consider closing unnecessary accounts.")
    
    if data.credit_history_years < 2:
        insights.append("📊 Short credit history. Keep accounts open and active to build history.")
    
    if data.age < 25:
        insights.append("👤 Young borrower. Building credit history is key at this stage.")
    
    # Positive insights
    if data.missed_payments == 0:
        insights.append("✅ Excellent payment history - keep it up!")
    
    if data.credit_utilization < 0.3:
        insights.append("✅ Good credit utilization ratio.")
    
    return {"recommendations": insights}

@app.get("/")
def read_root():
    return {"message": "Credit Score Prediction API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/predict")
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
        
        # ADD THE 4 MISSING ENGINEERED FEATURES:
        payment_reliability = 1.0 / (1.0 + data.missed_payments)
        debt_to_income = (data.total_active_loans * 100000) / (data.monthly_income + 0.001)
        age_credit_interaction = data.age * data.credit_history_years
        score_to_income_ratio = 500 / (data.monthly_income + 0.001)  # Using average CIBIL score as placeholder
        
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
        
        # Debug: Check if we have all features
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
        
        return {
            "status": "success",
            "prediction": {
                "credit_score_band": score_band,
                "risk_score": round(risk_score, 2),
                "loan_decision": decision_info['decision'],
                "risk_level": decision_info['risk_level'],
                "suggested_interest_rate": decision_info['interest_rate'],
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
                "insights": generate_insights(data, risk_score, score_band, loan_to_income, utilization_per_loan)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)