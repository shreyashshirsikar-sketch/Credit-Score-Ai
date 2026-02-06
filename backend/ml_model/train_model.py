# ml_model/train_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (accuracy_score, classification_report, 
                           confusion_matrix, f1_score, precision_score, 
                           recall_score, precision_recall_fscore_support,
                           precision_recall_curve, average_precision_score)
import joblib
import os
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
from sklearn.preprocessing import label_binarize

# Import the data processor
from ml_model.data_processor import DataProcessor

def plot_precision_recall_curve(y_true, y_pred, class_names, save_path='ml_model/evaluation_results/precision_recall_plot.png'):
    """Plot precision-recall for each class"""
    # Binarize the output for multi-class
    y_true_bin = label_binarize(y_true, classes=range(len(class_names)))
    y_pred_bin = label_binarize(y_pred, classes=range(len(class_names)))
    
    # Calculate precision-recall for each class
    precision = {}
    recall = {}
    avg_precision = {}
    
    for i in range(len(class_names)):
        precision[i], recall[i], _ = precision_recall_curve(y_true_bin[:, i], y_pred_bin[:, i])
        avg_precision[i] = average_precision_score(y_true_bin[:, i], y_pred_bin[:, i])
    
    # Plot
    plt.figure(figsize=(12, 8))
    colors = ['blue', 'green', 'red', 'orange', 'purple', 'brown']
    
    for i, class_name in enumerate(class_names):
        plt.plot(recall[i], precision[i], color=colors[i % len(colors)], 
                lw=2, label=f'{class_name} (AP={avg_precision[i]:.2f})')
    
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curve (Per Class)')
    plt.legend(loc="best")
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(save_path)
    plt.close()
    print(f"✅ Precision-recall curve saved to {save_path}")

def generate_html_report(metrics_dict, cm, save_path='ml_model/evaluation_results/model_report.html'):
    """Generate HTML report with all metrics"""
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Credit Score Model Report</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 40px; background: #f5f7fa; }}
            .container {{ max-width: 1200px; margin: auto; }}
            .header {{ background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }}
            .metrics {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }}
            .card {{ background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-left: 5px solid #3498db; }}
            table {{ width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
            th, td {{ padding: 15px; text-align: left; border-bottom: 1px solid #eee; }}
            th {{ background-color: #3498db; color: white; font-weight: 600; }}
            tr:hover {{ background-color: #f8f9fa; }}
            .good {{ color: #27ae60; font-weight: bold; }}
            .medium {{ color: #f39c12; font-weight: bold; }}
            .poor {{ color: #e74c3c; font-weight: bold; }}
            .metric-box {{ display: inline-block; padding: 10px 20px; margin: 5px; background: #ecf0f1; border-radius: 5px; }}
            h1, h2, h3 {{ color: #2c3e50; }}
            .success {{ color: #27ae60; }}
            .warning {{ color: #f39c12; }}
            .danger {{ color: #e74c3c; }}
            .summary {{ background: white; padding: 20px; border-radius: 10px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 Credit Score Model Evaluation Report</h1>
                <p>Generated on {metrics_dict['timestamp']}</p>
            </div>
            
            <div class="summary">
                <h2>📊 Executive Summary</h2>
                <div class="metrics">
                    <div class="card">
                        <h3>Model Information</h3>
                        <p><strong>Model:</strong> {metrics_dict['model_name']}</p>
                        <p><strong>Test Samples:</strong> {metrics_dict['test_samples']}</p>
                        <p><strong>Features Used:</strong> {len(metrics_dict['features_used'])}</p>
                    </div>
                    <div class="card">
                        <h3>Overall Performance</h3>
                        <p><span class="metric-box">Accuracy: <b>{metrics_dict['overall_metrics']['accuracy']:.4f}</b></span></p>
                        <p><span class="metric-box">Precision: <b>{metrics_dict['overall_metrics']['weighted_precision']:.4f}</b></span></p>
                        <p><span class="metric-box">Recall: <b>{metrics_dict['overall_metrics']['weighted_recall']:.4f}</b></span></p>
                        <p><span class="metric-box">F1-Score: <b>{metrics_dict['overall_metrics']['weighted_f1']:.4f}</b></span></p>
                    </div>
                </div>
            </div>
            
            <h2>🎯 Per-Class Performance Metrics</h2>
            <table>
                <tr>
                    <th>Credit Score Band</th>
                    <th>Precision</th>
                    <th>Recall</th>
                    <th>F1-Score</th>
                    <th>Support</th>
                    <th>Status</th>
                </tr>
    """
    
    # Add rows for each class
    for class_name, metrics in metrics_dict['per_class_metrics'].items():
        # Determine status based on F1-score
        f1 = metrics['f1_score']
        if f1 > 0.8:
            status = "✅ Excellent"
            status_class = "success"
        elif f1 > 0.6:
            status = "⚠️ Good"
            status_class = "warning"
        else:
            status = "❌ Needs Improvement"
            status_class = "danger"
        
        html_content += f"""
                <tr>
                    <td><strong>{class_name}</strong></td>
                    <td class="{ 'good' if metrics['precision'] > 0.8 else 'medium' if metrics['precision'] > 0.6 else 'poor' }">
                        {metrics['precision']:.4f}
                    </td>
                    <td class="{ 'good' if metrics['recall'] > 0.8 else 'medium' if metrics['recall'] > 0.6 else 'poor' }">
                        {metrics['recall']:.4f}
                    </td>
                    <td class="{ 'good' if metrics['f1_score'] > 0.8 else 'medium' if metrics['f1_score'] > 0.6 else 'poor' }">
                        {metrics['f1_score']:.4f}
                    </td>
                    <td>{metrics['support']}</td>
                    <td class="{status_class}">{status}</td>
                </tr>
        """
    
    html_content += """
            </table>
            
            <h2>📈 Confusion Matrix Analysis</h2>
            <p><strong>Rows:</strong> True Labels | <strong>Columns:</strong> Predicted Labels</p>
            <table>
    """
    
    # Add confusion matrix
    class_names = list(metrics_dict['per_class_metrics'].keys())
    html_content += "<tr><th>True \\ Predicted</th>" + "".join([f"<th>{name}</th>" for name in class_names]) + "</tr>"
    
    for i, true_class in enumerate(class_names):
        html_content += f"<tr><th>{true_class}</th>"
        for j in range(len(class_names)):
            value = cm[i][j]
            # Color code: diagonal cells (correct predictions) in green
            # Off-diagonal cells (errors) in orange/red based on value
            if i == j:
                bg_color = "#27ae60"  # Green for correct predictions
                text_color = "white"
            elif value > 0:
                bg_color = "#f39c12"  # Orange for misclassifications
                text_color = "white"
            else:
                bg_color = "#ecf0f1"
                text_color = "black"
            
            html_content += f"<td style='background-color:{bg_color};color:{text_color};font-weight:bold;'>{value}</td>"
        html_content += "</tr>"
    
    html_content += """
            </table>
            
            <div class="card">
                <h3>📊 Key Insights:</h3>
                <ul>
                    <li><strong>Diagonal values</strong> show correct predictions for each class</li>
                    <li><strong>Off-diagonal values</strong> indicate misclassifications</li>
                    <li>Larger off-diagonal values suggest classes that are frequently confused</li>
                    <li>Check for patterns: Are "Fair" scores often misclassified as "Good"?</li>
                </ul>
            </div>
            
            <h2>🔝 Top 10 Most Important Features</h2>
            <div class="card">
                <ol>
    """
    
    # Add top features (first 10)
    for i, feature in enumerate(metrics_dict['features_used'][:10], 1):
        html_content += f"<li>{feature}</li>"
    
    html_content += """
                </ol>
            </div>
            
            <div class="card">
                <h3>📋 Recommendations for Model Improvement:</h3>
                <ol>
                    <li><strong>Low Precision Class:</strong> Consider collecting more data or engineering new features</li>
                    <li><strong>Low Recall Class:</strong> Try class weighting or oversampling techniques</li>
                    <li><strong>Confused Classes:</strong> Check feature importance for distinguishing between these classes</li>
                    <li><strong>Overall:</strong> Consider ensemble methods or hyperparameter tuning</li>
                </ol>
            </div>
            
            <hr>
            <div style="text-align: center; color: #7f8c8d; margin-top: 40px;">
                <p><i>Report generated automatically by Credit Score AI System</i></p>
                <p><i>Next training recommended in 30 days or after 1000 new samples</i></p>
            </div>
        </div>
    </body>
    </html>
    """
    
    with open(save_path, 'w') as f:
        f.write(html_content)
    
    print(f"✅ HTML report saved to {save_path}")

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
    X_train, X_test, y_train, y_test = processor.prepare_data(target_column='CIBIL_Score_Band')
    
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
    best_predictions = None
    
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
            best_predictions = y_pred
    
    # Step 8: Enhanced Evaluation Metrics
    print(f"\n🏆 Best Model: {best_model_name} (Accuracy: {best_accuracy:.4f})")
    
    # Detailed evaluation on test set
    y_pred_best = best_model.predict(X_test_scaled)
    
    print("\n📊 DETAILED EVALUATION METRICS:")
    print("=" * 60)
    
    # 1. Overall metrics
    print("\n📈 OVERALL METRICS:")
    print("-" * 40)
    overall_accuracy = accuracy_score(y_test_encoded, y_pred_best)
    overall_precision = precision_score(y_test_encoded, y_pred_best, average='weighted')
    overall_recall = recall_score(y_test_encoded, y_pred_best, average='weighted')
    overall_f1 = f1_score(y_test_encoded, y_pred_best, average='weighted')
    
    print(f"Accuracy:  {overall_accuracy:.4f}")
    print(f"Precision: {overall_precision:.4f}")
    print(f"Recall:    {overall_recall:.4f}")
    print(f"F1-Score:  {overall_f1:.4f}")
    
    # 2. Per-class metrics
    print("\n🎯 PER-CLASS METRICS:")
    print("-" * 40)
    
    # Get per-class precision, recall, f1
    precision_per_class = precision_score(y_test_encoded, y_pred_best, average=None)
    recall_per_class = recall_score(y_test_encoded, y_pred_best, average=None)
    f1_per_class = f1_score(y_test_encoded, y_pred_best, average=None)
    
    # Create a dataframe for better visualization
    metrics_df = pd.DataFrame({
        'Class': label_encoder.classes_,
        'Precision': precision_per_class,
        'Recall': recall_per_class,
        'F1-Score': f1_per_class,
        'Support': [sum(y_test_encoded == i) for i in range(len(label_encoder.classes_))]
    })
    
    print(metrics_df.to_string(index=False))
    
    # 3. Classification report
    print("\n📋 DETAILED CLASSIFICATION REPORT:")
    print("-" * 40)
    print(classification_report(y_test_encoded, y_pred_best, 
                                target_names=label_encoder.classes_))
    
    # 4. Confusion matrix
    print("\n🎯 CONFUSION MATRIX:")
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
    print("✅ Confusion matrix saved to ml_model/evaluation_results/confusion_matrix.png")
    
    # Feature importance (for tree-based models)
    if hasattr(best_model, 'feature_importances_'):
        print("\n🔝 TOP 10 FEATURE IMPORTANCES:")
        feature_importance = pd.DataFrame({
            'feature': X_train.columns,
            'importance': best_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(feature_importance.head(10).to_string(index=False))
        
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
        print("✅ Feature importance plot saved")
    
    # Calculate all detailed metrics
    precision, recall, f1, support = precision_recall_fscore_support(
        y_test_encoded, y_pred_best, labels=range(len(label_encoder.classes_))
    )
    
    detailed_metrics = {
        'model_name': best_model_name,
        'overall_metrics': {
            'accuracy': float(overall_accuracy),
            'weighted_precision': float(overall_precision),
            'weighted_recall': float(overall_recall),
            'weighted_f1': float(overall_f1)
        },
        'per_class_metrics': {},
        'confusion_matrix': cm.tolist(),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'test_samples': len(X_test),
        'train_samples': len(X_train),
        'features_used': list(X_train.columns),
        'target_classes': label_encoder.classes_.tolist()
    }
    
    # Add per-class metrics
    for i, class_name in enumerate(label_encoder.classes_):
        detailed_metrics['per_class_metrics'][class_name] = {
            'precision': float(precision[i]),
            'recall': float(recall[i]),
            'f1_score': float(f1[i]),
            'support': int(support[i])
        }
    
    # Create directories
    os.makedirs("ml_model/saved_models", exist_ok=True)
    os.makedirs("ml_model/evaluation_results", exist_ok=True)
    
    # Save models
    model_filename = "credit_model.pkl"
    model_path = f"ml_model/saved_models/{model_filename}"
    
    joblib.dump(best_model, model_path)
    joblib.dump(scaler, "ml_model/saved_models/scaler.pkl")
    joblib.dump(label_encoder, "ml_model/saved_models/label_encoder.pkl")
    joblib.dump(list(X_train.columns), "ml_model/saved_models/features.pkl")
    
    # Also save as default model
    joblib.dump(best_model, "ml_model/saved_models/credit_model.pkl")
    
    # Save detailed metrics to JSON
    import json
    with open('ml_model/evaluation_results/detailed_metrics.json', 'w') as f:
        json.dump(detailed_metrics, f, indent=2)
    
    print(f"\n💾 Models saved:")
    print(f"   - Main model: {model_path}")
    print(f"   - Scaler: ml_model/saved_models/scaler.pkl")
    print(f"   - Label encoder: ml_model/saved_models/label_encoder.pkl")
    print(f"   - Features: ml_model/saved_models/features.pkl")
    
    # Generate visualizations
    print("\n📈 Generating visualizations...")
    try:
        # Precision-Recall Curve
        plot_precision_recall_curve(y_test_encoded, y_pred_best, label_encoder.classes_)
        
        # HTML Report
        generate_html_report(detailed_metrics, cm)
        
        # Additional metrics summary
        with open('ml_model/evaluation_results/metrics_summary.txt', 'w') as f:
            f.write(f"MODEL EVALUATION SUMMARY\n")
            f.write("="*50 + "\n\n")
            f.write(f"Model: {best_model_name}\n")
            f.write(f"Timestamp: {detailed_metrics['timestamp']}\n")
            f.write(f"Test Samples: {len(X_test)}\n")
            f.write(f"Accuracy: {overall_accuracy:.4f}\n")
            f.write(f"Precision: {overall_precision:.4f}\n")
            f.write(f"Recall: {overall_recall:.4f}\n")
            f.write(f"F1-Score: {overall_f1:.4f}\n\n")
            
            f.write("PER-CLASS METRICS:\n")
            f.write("-"*40 + "\n")
            for class_name, metrics in detailed_metrics['per_class_metrics'].items():
                f.write(f"{class_name}:\n")
                f.write(f"  Precision: {metrics['precision']:.4f}\n")
                f.write(f"  Recall:    {metrics['recall']:.4f}\n")
                f.write(f"  F1-Score:  {metrics['f1_score']:.4f}\n")
                f.write(f"  Support:   {metrics['support']}\n\n")
        
        print("✅ All evaluation files saved to ml_model/evaluation_results/")
        
    except Exception as e:
        print(f"⚠️ Warning: Some visualizations failed: {e}")
    
    print("\n" + "="*60)
    print("🎉 TRAINING PIPELINE COMPLETE!")
    print("="*60)
    print(f"\n📋 Key Results:")
    print(f"   • Best Model: {best_model_name}")
    print(f"   • Accuracy:   {overall_accuracy:.2%}")
    print(f"   • Precision:  {overall_precision:.2%}")
    print(f"   • Recall:     {overall_recall:.2%}")
    print(f"   • F1-Score:   {overall_f1:.2%}")
    print(f"\n📁 Check these files:")
    print(f"   • ml_model/evaluation_results/model_report.html")
    print(f"   • ml_model/evaluation_results/detailed_metrics.json")
    print(f"   • ml_model/evaluation_results/precision_recall_plot.png")
    print("\n" + "="*60)
    
    return best_model, scaler, label_encoder, best_model_name, overall_accuracy

if __name__ == "__main__":
    train_credit_score_model()