import requests
import json

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

# API endpoint
url = "http://localhost:8000/predict"

try:
    print("🚀 Testing Credit Score API...")
    print("📊 Test Data:", json.dumps(test_data, indent=2))
    
    # Send request
    response = requests.post(url, json=test_data)
    
    if response.status_code == 200:
        result = response.json()
        print("\n✅ Success!")
        print("\n📈 Prediction Results:")
        print("-" * 40)
        print(f"Credit Score Band: {result['prediction']['credit_score_band']}")
        print(f"Risk Score: {result['prediction']['risk_score']}")
        print(f"Loan Decision: {result['prediction']['loan_decision']}")
        print(f"Risk Level: {result['prediction']['risk_level']}")
        print(f"Interest Rate: {result['prediction']['suggested_interest_rate']}")
        
        print("\n💡 Insights:")
        for insight in result['prediction']['insights']['recommendations']:
            print(f"  • {insight}")
    else:
        print(f"\n❌ Error: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"\n❌ Error occurred: {e}")