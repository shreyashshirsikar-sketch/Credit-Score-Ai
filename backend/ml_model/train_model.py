import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

def train_credit_score_model():
    """
    Train ML model for credit score prediction using CSV data
    Returns: Best model and preprocessing objects
    """
    
    try:
        # Load the CSV file
        print("Loading CSV data...")
        df = pd.read_csv('CIBIL_Credit_Score_Large_Dataset.csv')
        print(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")
        
        # Show available columns
        print("Columns in dataset:", df.columns.tolist())
        
        # Prepare features - using relevant columns from your CSV
        # Based on your CSV columns, we'll use:
        features = [
            'Age',
            'Monthly_Income', 
            'Loan_Amount',
            'Credit_Utilization',
            'Missed_Payments_Last_12M',
            'Total_Active_Loans',
            'Credit_History_Years'
        ]
        
        # Create additional features
        df['Loan_to_Income_Ratio'] = df['Loan_Amount'] / df['Monthly_Income']
        df['Utilization_Per_Loan'] = df['Credit_Utilization'] / (df['Total_Active_Loans'] + 1)
        
        # Add new features to feature list
        features.append('Loan_to_Income_Ratio')
        features.append('Utilization_Per_Loan')
        
        # Prepare features and target
        X = df[features]
        y = df['CIBIL_Score_Band']  # This is the target column
        
        # Check data
        print("\nTarget distribution:")
        print(y.value_counts())
        
        print(f"\nUsing {len(features)} features:")
        for feature in features:
            print(f"  - {feature}")
        
        # Handle any missing values (if any)
        X = X.fillna(X.mean())
        
        # Encode target variable
        label_encoder = LabelEncoder()
        y_encoded = label_encoder.fit_transform(y)
        
        print(f"\nTarget classes: {label_encoder.classes_}")
        
        # Normalize features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Split data (80% train, 20% test)
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )
        
        print(f"\nTraining samples: {X_train.shape[0]}")
        print(f"Testing samples: {X_test.shape[0]}")
        
        # Train multiple models
        models = {
            'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
            'Decision Tree': DecisionTreeClassifier(random_state=42),
            'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100),
            'Gradient Boosting': GradientBoostingClassifier(random_state=42)
        }
        
        best_model = None
        best_model_name = ""
        best_accuracy = 0
        
        print("\nTraining models...")
        print("-" * 50)
        
        for name, model in models.items():
            # Train model
            model.fit(X_train, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test)
            
            # Calculate accuracy
            accuracy = accuracy_score(y_test, y_pred)
            
            print(f"{name}:")
            print(f"  Accuracy: {accuracy:.4f}")
            
            if accuracy > best_accuracy:
                best_accuracy = accuracy
                best_model = model
                best_model_name = name
        
        print("-" * 50)
        print(f"\n🎯 Best Model: {best_model_name}")
        print(f"🏆 Best Accuracy: {best_accuracy:.4f}")
        
        # Get detailed classification report for best model
        y_pred_best = best_model.predict(X_test)
        print("\n📊 Classification Report:")
        print(classification_report(y_test, y_pred_best, 
                                   target_names=label_encoder.classes_))
        
        # Feature importance for tree-based models
        if hasattr(best_model, 'feature_importances_'):
            print("\n🔍 Feature Importance:")
            importance_df = pd.DataFrame({
                'Feature': features,
                'Importance': best_model.feature_importances_
            }).sort_values('Importance', ascending=False)
            
            for idx, row in importance_df.iterrows():
                print(f"  {row['Feature']}: {row['Importance']:.4f}")
        
        # Create model directory if not exists
        os.makedirs('ml_model/saved_models', exist_ok=True)
        
        # Save model and preprocessing objects
        joblib.dump(best_model, 'ml_model/saved_models/credit_model.pkl')
        joblib.dump(scaler, 'ml_model/saved_models/scaler.pkl')
        joblib.dump(label_encoder, 'ml_model/saved_models/label_encoder.pkl')
        
        # Save feature list for reference
        joblib.dump(features, 'ml_model/saved_models/features.pkl')
        
        print("\n✅ Model training completed!")
        print(f"📁 Models saved to: ml_model/saved_models/")
        
        return best_model, scaler, label_encoder, best_model_name, best_accuracy
        
    except Exception as e:
        print(f"❌ Error in training: {e}")
        raise

if __name__ == "__main__":
    train_credit_score_model()