# run_pipeline.py
#!/usr/bin/env python3
"""
Complete ML Pipeline Runner
Runs all steps from data loading to deployment with enhanced metrics
"""

import subprocess
import sys
import os
import json

def run_step(step_num, step_name, python_script):
    """Run a Python script for a pipeline step"""
    print(f"\n{step_num} {step_name}")
    print("-" * 40)
    
    try:
        # Run the Python script
        result = subprocess.run(
            ["python3", "-c", python_script],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print("✅ Success!")
            if result.stdout:
                # Print relevant output
                lines = result.stdout.split('\n')
                for line in lines:
                    if any(keyword in line for keyword in ['Accuracy:', 'Precision:', 'Recall:', 'F1-Score:', '✅', '❌', '⚠️']):
                        print(f"  {line}")
        else:
            print("❌ Failed!")
            if result.stderr:
                print("Error:", result.stderr[:500])
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def display_summary():
    """Display training summary from metrics file"""
    metrics_file = "ml_model/evaluation_results/detailed_metrics.json"
    
    if os.path.exists(metrics_file):
        print("\n" + "="*60)
        print("📊 TRAINING SUMMARY")
        print("="*60)
        
        try:
            with open(metrics_file, 'r') as f:
                metrics = json.load(f)
            
            print(f"\n🤖 Model: {metrics['model_name']}")
            print(f"📅 Trained: {metrics['timestamp']}")
            print(f"🧪 Test Samples: {metrics['test_samples']}")
            print(f"🏋️‍♂️ Train Samples: {metrics['train_samples']}")
            print(f"🎯 Features Used: {len(metrics['features_used'])}")
            
            print("\n📈 Overall Performance:")
            overall = metrics['overall_metrics']
            print(f"   • Accuracy:  {overall['accuracy']:.4f}")
            print(f"   • Precision: {overall['weighted_precision']:.4f}")
            print(f"   • Recall:    {overall['weighted_recall']:.4f}")
            print(f"   • F1-Score:  {overall['weighted_f1']:.4f}")
            
            print("\n🎯 Per-Class Performance:")
            for class_name, class_metrics in metrics['per_class_metrics'].items():
                status = "✅" if class_metrics['f1_score'] > 0.8 else "⚠️" if class_metrics['f1_score'] > 0.6 else "❌"
                print(f"   {status} {class_name}: P={class_metrics['precision']:.3f}, R={class_metrics['recall']:.3f}, F1={class_metrics['f1_score']:.3f}")
            
            print("\n📁 Generated Files:")
            files = [
                "model_report.html",
                "detailed_metrics.json",
                "confusion_matrix.png",
                "feature_importance.png",
                "precision_recall_plot.png"
            ]
            
            for file in files:
                path = f"ml_model/evaluation_results/{file}"
                if os.path.exists(path):
                    print(f"   • {file}")
                else:
                    print(f"   • {file} (missing)")
            
        except Exception as e:
            print(f"⚠️ Could not load metrics: {e}")

def main():
    print("=" * 60)
    print("🚀 CREDIT SCORE AI - COMPLETE ML PIPELINE")
    print("=" * 60)
    
    # Check if in virtual environment
    if not os.path.exists("venv") and not os.path.exists("../venv"):
        print("\n⚠️  Virtual environment not found!")
        print("Setting up virtual environment first...")
        
        # Create virtual environment
        subprocess.run(["python3", "-m", "venv", "venv"])
        print("✅ Virtual environment created")
        
        # Activate and install requirements
        print("Installing requirements...")
        if sys.platform == "darwin" or sys.platform == "linux":
            subprocess.run(["./venv/bin/pip", "install", "-r", "requirements.txt"])
        else:
            subprocess.run(["venv\\Scripts\\pip", "install", "-r", "requirements.txt"])
    
    # Step 1: Data Loading & Cleaning
    step1_code = """
import sys
import os
sys.path.append('.')
from ml_model.data_processor import DataProcessor
p = DataProcessor('CIBIL_Credit_Score_Large_Dataset.csv')
df = p.load_data()
df = p.clean_data()
print(f"✅ Cleaned data shape: {df.shape}")
"""
    
    # Step 2: EDA
    step2_code = """
import sys
import os
sys.path.append('.')
from ml_model.data_processor import DataProcessor
p = DataProcessor('CIBIL_Credit_Score_Large_Dataset.csv')
p.load_data()
p.clean_data()
p.exploratory_analysis()
print("✅ EDA completed. Check 'eda_results/' folder")
"""
    
    # Step 3: Model Training with Enhanced Metrics
    step3_code = """
import sys
import os
sys.path.append('.')
from ml_model.train_model import train_credit_score_model
model, scaler, encoder, name, acc = train_credit_score_model()
if model:
    print(f"✅ Model trained: {name}")
    print(f"📊 Check ml_model/evaluation_results/ for detailed metrics")
"""
    
    # Run steps
    steps = [
        ("1️⃣", "Data Loading & Cleaning", step1_code),
        ("2️⃣", "Exploratory Data Analysis", step2_code),
        ("3️⃣", "Model Training & Evaluation", step3_code),
    ]
    
    for step_num, step_name, step_code in steps:
        success = run_step(step_num, step_name, step_code)
        if not success:
            print(f"\n❌ Pipeline stopped at {step_name}")
            return
    
    # Display summary
    display_summary()
    
    # Step 4: API Server
    print("\n" + "="*60)
    print("4️⃣ Start API Server")
    print("="*60)
    
    print("\n🌐 API Endpoints Available:")
    print("   • GET  /              - Welcome message")
    print("   • GET  /health        - Health check")
    print("   • POST /predict       - Make predictions")
    print("   • GET  /docs          - Interactive API docs (Swagger UI)")
    print("   • GET  /redoc         - Alternative API docs")
    
    print("\n📁 Check your model report:")
    print("   file://" + os.path.abspath("ml_model/evaluation_results/model_report.html"))
    
    choice = input("\n🚀 Start API server? (y/n): ")
    if choice.lower() == 'y':
        print("\n" + "="*60)
        print("🚀 Starting API server on http://localhost:8000")
        print("📚 Open http://localhost:8000/docs for API documentation")
        print("🛑 Press Ctrl+C to stop")
        print("="*60)
        subprocess.run(["python3", "run.py"])
    else:
        print("\n✅ Pipeline completed successfully!")
        print("\n📋 Next steps:")
        print("   1. Start API server: python run.py")
        print("   2. Test API: python test_api.py")
        print("   3. View report: open ml_model/evaluation_results/model_report.html")

if __name__ == "__main__":
    main()