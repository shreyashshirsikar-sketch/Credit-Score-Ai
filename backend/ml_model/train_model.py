# ml_model/train_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score
import joblib
import os
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Import the data processor
from ml_model.data_processor import DataProcessor

def train_credit_score_model():
    """Complete training pipeline with all steps"""
    print("🚀 Starting Credit Score Model Training Pipeline")
    print("=" * 60)
    
    # Step 1-5: Data Processing
    processor = DataProcessor("CIBIL_Credit_Score_Large_Dataset.csv")
    
    # Load data
    df = processor.load_data()
    
    # Clean data
    df = processor.clean_data()
    
    # Perform EDA
    processor.exploratory_analysis()
    
    # Feature engineering
    df = processor.feature_engineering()
    
    # Prepare data for training
    X_train, X_test, y_train, y_test = processor.prepare_data(target_column='Credit_Score')
    
    if X_train is None:
        return None, None, None, "Error: No data prepared", 0
    
    # Step 6: Model Training
    print("\n🤖 Training models...")
    
    # Encode target variable
    label_encoder = LabelEncoder()
    y_train_encoded = label_encoder.fit_transform(y_train)
    y_test_encoded = label_encoder.transform(y_test)
    
    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Try multiple models
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
        'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42)
    }
    
    best_model = None
    best_accuracy = 0
    best_model_name = ""
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train_scaled, y_train_encoded)
        
        # Step 7: Model Testing
        y_pred = model.predict(X_test_scaled)
        accuracy = accuracy_score(y_test_encoded, y_pred)
        
        print(f"  Test Accuracy: {accuracy:.4f}")
        
        if accuracy > best_accuracy:
            best_accuracy = accuracy
            best_model = model
            best_model_name = name
    
    # Step 8: Evaluation Metrics
    print(f"\n🏆 Best Model: {best_model_name} (Accuracy: {best_accuracy:.4f})")
    
    # Detailed evaluation on test set
    y_pred_best = best_model.predict(X_test_scaled)
    
    print("\n📊 Detailed Evaluation Metrics:")
    print("-" * 40)
    
    # Classification report
    print("\n📋 Classification Report:")
    print(classification_report(y_test_encoded, y_pred_best, 
                                target_names=label_encoder.classes_))
    
    # Confusion matrix
    print("🎯 Confusion Matrix:")
    cm = confusion_matrix(y_test_encoded, y_pred_best)
    print(cm)
    
    # Plot confusion matrix
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=label_encoder.classes_,
                yticklabels=label_encoder.classes_)
    plt.title(f'Confusion Matrix - {best_model_name}')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.tight_layout()
    plt.savefig('ml_model/evaluation_results/confusion_matrix.png')
    plt.close()
    
    # Feature importance (for tree-based models)
    if hasattr(best_model, 'feature_importances_'):
        print("\n🔝 Feature Importance:")
        feature_importance = pd.DataFrame({
            'feature': X_train.columns,
            'importance': best_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(feature_importance.head(10))
        
        # Plot feature importance
        plt.figure(figsize=(12, 8))
        top_features = feature_importance.head(15)
        plt.barh(range(len(top_features)), top_features['importance'])
        plt.yticks(range(len(top_features)), top_features['feature'])
        plt.xlabel('Importance')
        plt.title('Top 15 Feature Importances')
        plt.gca().invert_yaxis()
        plt.tight_layout()
        plt.savefig('ml_model/evaluation_results/feature_importance.png')
        plt.close()
    
    # Save models and artifacts
    print("\n💾 Saving models and artifacts...")
    
    # Create directories
    os.makedirs("ml_model/saved_models", exist_ok=True)
    os.makedirs("ml_model/evaluation_results", exist_ok=True)
    
    # Save models
    model_filename = f"credit_model_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pkl"
    model_path = f"ml_model/saved_models/{model_filename}"
    
    joblib.dump(best_model, model_path)
    joblib.dump(scaler, "ml_model/saved_models/scaler.pkl")
    joblib.dump(label_encoder, "ml_model/saved_models/label_encoder.pkl")
    joblib.dump(list(X_train.columns), "ml_model/saved_models/features.pkl")
    
    # Also save as default model
    joblib.dump(best_model, "ml_model/saved_models/credit_model.pkl")
    
    # Save evaluation metrics
    evaluation_results = {
        'model_name': best_model_name,
        'accuracy': best_accuracy,
        'f1_score': f1_score(y_test_encoded, y_pred_best, average='weighted'),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'test_samples': len(X_test),
        'features_used': list(X_train.columns)
    }
    
    import json
    with open('ml_model/evaluation_results/model_metrics.json', 'w') as f:
        json.dump(evaluation_results, f, indent=2)
    
    print(f"✅ Model saved: {model_path}")
    print(f"✅ Evaluation results saved to ml_model/evaluation_results/")
    
    return best_model, scaler, label_encoder, best_model_name, best_accuracy

if __name__ == "__main__":
    train_credit_score_model()