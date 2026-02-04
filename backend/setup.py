#!/usr/bin/env python3
"""
Setup script for Credit Score AI
This will:
1. Install dependencies
2. Train the initial model
3. Start the API server
"""

import os
import sys
import subprocess
import time

def run_command(command, description):
    """Run a shell command and print status"""
    print(f"\n{'='*60}")
    print(f"📦 {description}")
    print(f"{'='*60}")
    print(f"Running: {command}")
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Success!")
            if result.stdout:
                print("Output:", result.stdout[:500])  # Print first 500 chars
        else:
            print("❌ Failed!")
            print("Error:", result.stderr)
            return False
        return True
    except Exception as e:
        print(f"❌ Exception: {e}")
        return False

def main():
    """Main setup function"""
    
    print("\n" + "="*60)
    print("🚀 CREDIT SCORE AI - SETUP SCRIPT")
    print("="*60)
    
    # Step 1: Check Python version
    print("\n🐍 Checking Python version...")
    python_version = sys.version_info
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
        print("❌ Python 3.8 or higher required")
        return
    
    print(f"✅ Python {python_version.major}.{python_version.minor}.{python_version.micro}")
    
    # Step 2: Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing dependencies"):
        print("\n⚠️ Trying to install dependencies individually...")
        deps = [
            "fastapi==0.104.1",
            "uvicorn[standard]==0.24.0",
            "pandas==2.2.0",
            "scikit-learn==1.3.2",
            "joblib==1.3.2",
            "pydantic==2.5.0",
            "numpy==1.26.4",
            "python-dotenv==1.0.0"
        ]
        for dep in deps:
            if not run_command(f"pip install {dep}", f"Installing {dep}"):
                return
    
    # Step 3: Check CSV file
    print("\n📄 Checking for CSV data...")
    csv_path = "CIBIL_Credit_Score_Large_Dataset.csv"
    if os.path.exists(csv_path):
        print(f"✅ Found CSV file: {csv_path}")
    else:
        print(f"❌ CSV file not found at: {csv_path}")
        print("Please place your CSV file in the root directory")
        return
    
    # Step 4: Train the model
    print("\n🤖 Training machine learning model...")
    try:
        from ml_model.train_model import train_credit_score_model
        model, scaler, encoder, model_name, accuracy = train_credit_score_model()
        print(f"✅ Model training complete!")
        print(f"   Model: {model_name}")
        print(f"   Accuracy: {accuracy:.2%}")
    except Exception as e:
        print(f"❌ Model training failed: {e}")
        return
    
    # Step 5: Create test data file
    print("\n🧪 Creating test data...")
    test_data = {
        "age": 35,
        "monthly_income": 50000,
        "loan_amount": 300000,
        "credit_utilization": 0.4,
        "missed_payments": 1,
        "total_active_loans": 2,
        "credit_history_years": 5
    }
    
    with open("test_request.json", "w") as f:
        import json
        json.dump(test_data, f, indent=2)
    print("✅ Created test_request.json")
    
    # Step 6: Show next steps
    print("\n" + "="*60)
    print("🎉 SETUP COMPLETE!")
    print("="*60)
    print("\n📋 NEXT STEPS:")
    print("1. Start the API server:")
    print("   python run.py")
    print("")
    print("2. Test the API:")
    print("   curl -X POST http://localhost:8000/predict \\")
    print("        -H 'Content-Type: application/json' \\")
    print("        -d @test_request.json")
    print("")
    print("3. Open in browser:")
    print("   http://localhost:8000")
    print("")
    print("4. API Documentation:")
    print("   http://localhost:8000/docs")
    print("\n" + "="*60)

if __name__ == "__main__":
    main()