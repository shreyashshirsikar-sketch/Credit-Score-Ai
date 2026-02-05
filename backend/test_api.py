import requests
import json
import time
import sys

# Test data
test_data = {
    "age": 35,
    "monthly_income": 50000,
    "loan_amount": 300000,
    "credit_utilization": 0.4,
    "missed_payments": 1,
    "total_active_loans": 2,
    "credit_history_years": 5
}

# API endpoints
BASE_URL = "http://localhost:8000"
HEALTH_ENDPOINT = f"{BASE_URL}/health"
PREDICT_ENDPOINT = f"{BASE_URL}/predict"
ROOT_ENDPOINT = BASE_URL

def check_server_status():
    """Check if the API server is running"""
    print("🔍 Checking server status...")
    
    endpoints_to_check = [
        (ROOT_ENDPOINT, "Root endpoint"),
        (HEALTH_ENDPOINT, "Health endpoint"),
    ]
    
    for url, name in endpoints_to_check:
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                print(f"✅ {name} is responding (Status: {response.status_code})")
                if name == "Health endpoint":
                    health_data = response.json()
                    print(f"   - Model loaded: {health_data.get('model_loaded', 'Unknown')}")
                    print(f"   - Status: {health_data.get('status', 'Unknown')}")
            else:
                print(f"⚠️  {name} returned status: {response.status_code}")
        except requests.ConnectionError:
            print(f"❌ {name} - Connection failed (Server may not be running)")
            return False
        except requests.Timeout:
            print(f"⚠️  {name} - Request timed out")
            return False
        except Exception as e:
            print(f"❌ {name} - Error: {e}")
            return False
    
    return True

def check_model_files():
    """Check if model files exist"""
    print("\n📁 Checking model files...")
    
    model_files = [
        "ml_model/saved_models/credit_model.pkl",
        "ml_model/saved_models/scaler.pkl", 
        "ml_model/saved_models/label_encoder.pkl",
        "ml_model/saved_models/features.pkl"
    ]
    
    import os
    all_files_exist = True
    
    for file_path in model_files:
        if os.path.exists(file_path):
            file_size = os.path.getsize(file_path) / 1024  # Convert to KB
            print(f"✅ {file_path} - {file_size:.2f} KB")
        else:
            print(f"❌ {file_path} - NOT FOUND")
            all_files_exist = False
    
    return all_files_exist

def test_prediction():
    """Test the prediction endpoint"""
    print(f"\n🧪 Testing prediction endpoint...")
    print(f"📊 Test Data: {json.dumps(test_data, indent=2)}")
    
    try:
        response = requests.post(PREDICT_ENDPOINT, json=test_data, timeout=10)
        
        print(f"\n📡 Response Status: {response.status_code}")
        print(f"⏱️  Response Time: {response.elapsed.total_seconds():.2f} seconds")
        
        if response.status_code == 200:
            result = response.json()
            print("\n✅ PREDICTION SUCCESSFUL!")
            print("=" * 60)
            
            # Display prediction results
            pred = result.get('prediction', {})
            if pred:
                print(f"🎯 Credit Score Band: {pred.get('credit_score_band', 'N/A')}")
                print(f"⚠️  Risk Score: {pred.get('risk_score', 'N/A')}")
                print(f"📋 Loan Decision: {pred.get('loan_decision', 'N/A')}")
                print(f"📊 Risk Level: {pred.get('risk_level', 'N/A')}")
                print(f"💰 Suggested Interest Rate: {pred.get('suggested_interest_rate', 'N/A')}")
                
                # Display features
                print(f"\n📈 Calculated Features:")
                features = pred.get('features', {})
                for key, value in features.items():
                    print(f"   • {key}: {value}")
                
                # Display insights
                insights = pred.get('insights', {}).get('recommendations', [])
                if insights:
                    print(f"\n💡 Insights & Recommendations:")
                    for insight in insights:
                        print(f"   • {insight}")
                else:
                    print(f"\n📝 No insights generated")
            else:
                print("⚠️  No prediction data in response")
            
            # Display raw response (truncated)
            print(f"\n📄 Full Response (truncated):")
            print(json.dumps(result, indent=2)[:500] + "...")
            
            return True
            
        else:
            print(f"\n❌ PREDICTION FAILED!")
            print(f"Error details: {response.text}")
            return False
            
    except requests.ConnectionError:
        print("❌ Cannot connect to prediction endpoint")
        return False
    except requests.Timeout:
        print("❌ Prediction request timed out")
        return False
    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return False

def run_comprehensive_test():
    """Run all checks"""
    print("=" * 60)
    print("🧪 CREDIT SCORE BACKEND - COMPREHENSIVE TEST")
    print("=" * 60)
    
    # Step 1: Check model files
    model_files_ok = check_model_files()
    
    if not model_files_ok:
        print("\n⚠️  Some model files are missing. The backend may not work properly.")
        print("   To fix this, run: python ml_model/train_model.py")
    
    # Step 2: Check if server is running
    print("\n" + "=" * 60)
    print("🌐 CHECKING API SERVER STATUS")
    print("=" * 60)
    
    server_running = check_server_status()
    
    if not server_running:
        print("\n❌ API server is not running.")
        print("   To start the server, run: python run.py")
        print("   Or: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload")
        return False
    
    # Step 3: Test prediction
    print("\n" + "=" * 60)
    print("🤖 TESTING PREDICTION FUNCTIONALITY")
    print("=" * 60)
    
    prediction_success = test_prediction()
    
    # Summary
    print("\n" + "=" * 60)
    print("📋 TEST SUMMARY")
    print("=" * 60)
    
    summary = {
        "Model Files": "✅ OK" if model_files_ok else "❌ MISSING",
        "Server Status": "✅ RUNNING" if server_running else "❌ NOT RUNNING",
        "Prediction Test": "✅ SUCCESS" if prediction_success else "❌ FAILED"
    }
    
    for check, status in summary.items():
        print(f"{check}: {status}")
    
    if all([model_files_ok, server_running, prediction_success]):
        print("\n🎉 ALL TESTS PASSED! Backend is fully functional.")
    else:
        print("\n⚠️  Some tests failed. See recommendations above.")
    
    return all([model_files_ok, server_running, prediction_success])

def test_multiple_scenarios():
    """Test multiple different scenarios"""
    print("\n" + "=" * 60)
    print("🔬 TESTING MULTIPLE SCENARIOS")
    print("=" * 60)
    
    scenarios = [
        {
            "name": "Good Credit Profile",
            "data": {
                "age": 40,
                "monthly_income": 75000,
                "loan_amount": 200000,
                "credit_utilization": 0.25,
                "missed_payments": 0,
                "total_active_loans": 1,
                "credit_history_years": 10
            }
        },
        {
            "name": "Risky Profile", 
            "data": {
                "age": 22,
                "monthly_income": 25000,
                "loan_amount": 500000,
                "credit_utilization": 0.85,
                "missed_payments": 3,
                "total_active_loans": 5,
                "credit_history_years": 1
            }
        },
        {
            "name": "Average Profile",
            "data": {
                "age": 30,
                "monthly_income": 45000,
                "loan_amount": 350000,
                "credit_utilization": 0.55,
                "missed_payments": 2,
                "total_active_loans": 3,
                "credit_history_years": 4
            }
        }
    ]
    
    for scenario in scenarios:
        print(f"\n📋 Scenario: {scenario['name']}")
        print("-" * 40)
        
        try:
            response = requests.post(PREDICT_ENDPOINT, json=scenario['data'], timeout=5)
            
            if response.status_code == 200:
                result = response.json()
                pred = result.get('prediction', {})
                
                print(f"   Score Band: {pred.get('credit_score_band', 'N/A')}")
                print(f"   Decision: {pred.get('loan_decision', 'N/A')}")
                print(f"   Risk: {pred.get('risk_level', 'N/A')}")
                
                # Show first insight if available
                insights = pred.get('insights', {}).get('recommendations', [])
                if insights:
                    print(f"   Top Insight: {insights[0][:50]}...")
            else:
                print(f"   ❌ Failed: {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    # Run comprehensive test
    success = run_comprehensive_test()
    
    # If everything is working, run multiple scenarios
    if success:
        test_multiple_scenarios()
    
    # Final instructions
    print("\n" + "=" * 60)
    print("📚 QUICK REFERENCE")
    print("=" * 60)
    print("""
Commands to run:
1. Train model:    python ml_model/train_model.py
2. Start server:   python run.py
3. Run pipeline:   python run_pipeline.py
4. Setup:          python setup.py

API Endpoints:
• Root:           http://localhost:8000/
• Health:         http://localhost:8000/health  
• Predict:        http://localhost:8000/predict
• Docs:           http://localhost:8000/docs

To test with curl:
curl -X POST http://localhost:8000/predict \\
     -H "Content-Type: application/json" \\
     -d '{"age":35,"monthly_income":50000,"loan_amount":300000,"credit_utilization":0.4,"missed_payments":1,"total_active_loans":2,"credit_history_years":5}'
    """)
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)