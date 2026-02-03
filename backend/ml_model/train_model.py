import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

def train_credit_score_model():
    """
    Train ML model for credit score prediction
    Returns: Best model and preprocessing objects
    """
    
    # Create sample dataset (you can replace with actual CSV file)
    data = {
        'Income': [40000, 60000, 30000, 80000, 25000, 90000, 50000, 70000, 20000, 100000],
        'Loan_Amount': [500000, 300000, 700000, 200000, 900000, 150000, 400000, 250000, 1000000, 100000],
        'Credit_Utilization': [0.6, 0.4, 0.8, 0.3, 0.9, 0.2, 0.5, 0.4, 0.95, 0.1],
        'Missed_Payments': [2, 0, 4, 1, 6, 0, 1, 1, 7, 0],
        'Credit_Score_Band': ['Fair', 'Good', 'Poor', 'Good', 'Poor', 'Excellent', 'Fair', 'Good', 'Poor', 'Excellent']
    }
    
    df = pd.DataFrame(data)
    
    # Create new feature: Loan to Income Ratio
    df['Loan_to_Income'] = df['Loan_Amount'] / df['Income']
    
    # Prepare features and target
    X = df[['Income', 'Loan_Amount', 'Credit_Utilization', 'Missed_Payments', 'Loan_to_Income']]
    y = df['Credit_Score_Band']
    
    # Encode target variable
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Normalize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y_encoded, test_size=0.2, random_state=42
    )
    
    # Train Logistic Regression
    log_reg = LogisticRegression(random_state=42)
    log_reg.fit(X_train, y_train)
    y_pred_log = log_reg.predict(X_test)
    accuracy_log = accuracy_score(y_test, y_pred_log)
    
    # Train Decision Tree
    dt = DecisionTreeClassifier(random_state=42)
    dt.fit(X_train, y_train)
    y_pred_dt = dt.predict(X_test)
    accuracy_dt = accuracy_score(y_test, y_pred_dt)
    
    # Select best model
    if accuracy_log >= accuracy_dt:
        best_model = log_reg
        model_name = "Logistic Regression"
        accuracy = accuracy_log
    else:
        best_model = dt
        model_name = "Decision Tree"
        accuracy = accuracy_dt
    
    print(f"Best Model: {model_name}")
    print(f"Accuracy: {accuracy:.2f}")
    
    # Create model directory if not exists
    os.makedirs('ml_model/saved_models', exist_ok=True)
    
    # Save model and preprocessing objects
    joblib.dump(best_model, 'ml_model/saved_models/credit_model.pkl')
    joblib.dump(scaler, 'ml_model/saved_models/scaler.pkl')
    joblib.dump(label_encoder, 'ml_model/saved_models/label_encoder.pkl')
    
    return best_model, scaler, label_encoder, model_name, accuracy

if __name__ == "__main__":
    train_credit_score_model()