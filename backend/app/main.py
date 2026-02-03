import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any

# Import model training function
from ml_model.train_model import train_credit_score_model

# Initialize FastAPI
app = FastAPI(title="AI Credit Score Prediction API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request validation
class CreditData(BaseModel):
    income: float
    loan_amount: float
    credit_utilization: float
    missed_payments: int

# Model paths
MODEL_PATH = 'ml_model/saved_models/credit_model.pkl'
SCALER_PATH = 'ml_model/saved_models/scaler.pkl'
ENCODER_PATH = 'ml_model/saved_models/label_encoder.pkl'

# Load models with better error handling
def load_models():
    """Load trained models or train new ones if not found"""
    try:
        if not all(os.path.exists(path) for path in [MODEL_PATH, SCALER_PATH, ENCODER_PATH]):
            print("Models not found. Training new models...")
            return train_credit_score_model()
        
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        label_encoder = joblib.load(ENCODER_PATH)
        print("Models loaded successfully!")
        return model, scaler, label_encoder, "Pre-trained", None
    except Exception as e:
        print(f"Error loading models: {e}")
        print("Training new models...")
        return train_credit_score_model()

# Load models at startup
model, scaler, label_encoder, model_name, accuracy = load_models()

# Business logic for loan decision (Improved)
def get_loan_decision(score_band: str, risk_score: float) -> Dict[str, Any]:
    """
    Determine loan decision based on credit score band and risk score
    """
    score_band = score_band.lower()
    
    # Base decisions
    base_decisions = {
        'excellent': {
            'decision': 'Approve',
            'risk_level': 'Low',
            'interest_rate': '7-8%'
        },
        'good': {
            'decision': 'Approve',
            'risk_level': 'Medium',
            'interest_rate': '9-10%'
        },
        'fair': {
            'decision': 'Review',
            'risk_level': 'High',
            'interest_rate': '11-13%'
        },
        'poor': {
            'decision': 'Reject',
            'risk_level': 'Very High',
            'interest_rate': 'Not eligible'
        }
    }
    
    decision = base_decisions.get(score_band, {
        'decision': 'Review',
        'risk_level': 'Unknown',
        'interest_rate': 'TBD'
    })
    
    # Adjust based on risk score
    if risk_score > 80 and decision['decision'] == 'Approve':
        decision['decision'] = 'Review'
        decision['risk_level'] = 'High'
    
    return decision

@app.get("/")
def read_root():
    return {
        "message": "AI Credit Score Prediction API",
        "status": "running",
        "model_info": {
            "model_type": model_name,
            "accuracy": accuracy if accuracy else "N/A"
        },
        "endpoints": {
            "POST /predict": "Predict credit score",
            "GET /health": "Check API health",
            "POST /retrain": "Retrain model (admin)"
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "models_loaded": all([model, scaler, label_encoder])
    }

@app.post("/predict")
def predict_credit_score(data: CreditData):
    try:
        # Validate input
        if data.income <= 0:
            raise HTTPException(status_code=400, detail="Income must be positive")
        
        if data.credit_utilization < 0 or data.credit_utilization > 1:
            raise HTTPException(status_code=400, detail="Credit utilization must be between 0 and 1")
        
        if data.missed_payments < 0:
            raise HTTPException(status_code=400, detail="Missed payments cannot be negative")
        
        # Calculate loan to income ratio
        loan_to_income = data.loan_amount / data.income if data.income > 0 else 0
        
        # Prepare features in correct order
        features = np.array([[
            data.income,
            data.loan_amount,
            data.credit_utilization,
            data.missed_payments,
            loan_to_income
        ]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction_encoded = model.predict(features_scaled)
        
        # Decode prediction
        score_band = label_encoder.inverse_transform(prediction_encoded)[0]
        
        # Calculate risk score (0-100)
        risk_score = min(100, max(0, 
            (data.missed_payments * 15) + 
            (data.credit_utilization * 35) + 
            (loan_to_income * 25) +
            (1 if data.income < 30000 else 0) * 25
        ))
        
        # Get loan decision using business rules
        decision_info = get_loan_decision(score_band, risk_score)
        
        return {
            "status": "success",
            "prediction": {
                "credit_score_band": score_band,
                "risk_score": round(risk_score),
                "loan_decision": decision_info['decision'],
                "risk_level": decision_info['risk_level'],
                "suggested_interest_rate": decision_info['interest_rate'],
                "features": {
                    "income": data.income,
                    "loan_amount": data.loan_amount,
                    "credit_utilization": data.credit_utilization,
                    "missed_payments": data.missed_payments,
                    "loan_to_income_ratio": round(loan_to_income, 4)
                },
                "insights": generate_insights(data, risk_score, score_band)
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

def generate_insights(data: CreditData, risk_score: float, score_band: str) -> Dict[str, str]:
    """Generate actionable insights based on user's data"""
    insights = []
    
    if data.credit_utilization > 0.7:
        insights.append("High credit utilization (>70%). Consider paying down balances.")
    
    if data.missed_payments > 2:
        insights.append(f"{data.missed_payments} missed payments detected. Focus on timely payments.")
    
    if data.loan_amount / data.income > 0.5:
        insights.append("High loan-to-income ratio. Consider reducing loan amount.")
    
    if data.income < 30000 and risk_score > 60:
        insights.append("Low income combined with high risk factors.")
    
    return {"recommendations": insights}

# Training endpoint (for admin use)
@app.post("/retrain")
def retrain_model():
    try:
        global model, scaler, label_encoder, model_name, accuracy
        model, scaler, label_encoder, model_name, accuracy = train_credit_score_model()
        return {
            "status": "success",
            "message": "Model retrained successfully",
            "model": model_name,
            "accuracy": round(accuracy, 4),
            "model_size": f"{os.path.getsize(MODEL_PATH) / 1024:.2f} KB"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint for what-if analysis
@app.post("/what-if")
def what_if_analysis(data: CreditData, income_increase: float = 0):
    """Analyze how changes would affect credit score"""
    try:
        # Create modified scenario
        modified_data = CreditData(
            income=data.income * (1 + income_increase/100),
            loan_amount=data.loan_amount,
            credit_utilization=data.credit_utilization,
            missed_payments=data.missed_payments
        )
        
        # Get original prediction
        original = predict_credit_score(data)
        
        # Get modified prediction
        modified = predict_credit_score(modified_data)
        
        return {
            "original": original["prediction"],
            "modified": modified["prediction"],
            "change": {
                "risk_score_change": modified["prediction"]["risk_score"] - original["prediction"]["risk_score"],
                "decision_change": original["prediction"]["loan_decision"] != modified["prediction"]["loan_decision"]
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))