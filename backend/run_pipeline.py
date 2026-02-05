# run_pipeline.py
#!/usr/bin/env python3
"""
Complete ML Pipeline Runner
Runs all steps from data loading to deployment
"""

import subprocess
import sys
import os

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
                print(result.stdout[:500])  # Print first 500 chars
        else:
            print("❌ Failed!")
            if result.stderr:
                print("Error:", result.stderr[:500])
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

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
print(f"Cleaned data shape: {df.shape}")
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
print("EDA completed. Check 'eda_results/' folder")
"""
    
    # Step 3: Model Training
    step3_code = """
import sys
import os
sys.path.append('.')
from ml_model.train_model import train_credit_score_model
model, scaler, encoder, name, acc = train_credit_score_model()
print(f"Model trained: {name}, Accuracy: {acc:.2%}")
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
    
    # Step 4: API Server
    print("\n4️⃣ Start API Server")
    print("-" * 40)
    
    choice = input("Start API server? (y/n): ")
    if choice.lower() == 'y':
        print("Starting API server on http://localhost:8000")
        print("Press Ctrl+C to stop")
        subprocess.run(["python3", "run.py"])

if __name__ == "__main__":
    main()