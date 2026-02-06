// src/components/InputPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InputPage.css';

const InputPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    age: '35',
    monthlyIncome: '75000',
    totalLoanAmount: '1500000',
    loanTenure: '60',
    creditUtilization: '35',
    missedPayments: '0',
    activeLoans: '2',
    creditHistoryLength: '8'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['age', 'monthlyIncome', 'totalLoanAmount', 'loanTenure', 
                           'creditUtilization', 'activeLoans', 'creditHistoryLength'];
    const isValid = requiredFields.every(field => formData[field] && formData[field] !== '');
    
    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    localStorage.setItem('creditData', JSON.stringify(formData));
    navigate('/result');
  };

  const handleReset = () => {
    setFormData({
      age: '',
      monthlyIncome: '',
      totalLoanAmount: '',
      loanTenure: '',
      creditUtilization: '',
      missedPayments: '0',
      activeLoans: '',
      creditHistoryLength: ''
    });
  };

  return (
    <div className="input-container">
      <header className="header">
        <h1><i className="fas fa-chart-line"></i> Credit Score Analyzer</h1>
        <p>Enter your financial details to get a comprehensive credit analysis</p>
      </header>

      <div className="form-card">
        <h2><i className="fas fa-user-edit"></i> Personal & Credit Information</h2>
        <p className="form-subtitle">Please provide accurate details for precise analysis</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Age Field */}
            <div className="form-group">
              <label>1️⃣ Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                placeholder="Enter age (18-80)" 
                min="18"
                max="80"
                required 
              />
            </div>
            
            {/* Monthly Income Field */}
            <div className="form-group">
              <label>2️⃣ Monthly Income (₹)</label>
              <input 
                type="number" 
                name="monthlyIncome" 
                value={formData.monthlyIncome} 
                onChange={handleChange} 
                placeholder="Monthly income" 
                min="0"
                required 
              />
            </div>
            
            {/* Total Loan Amount Field */}
            <div className="form-group">
              <label>3️⃣ Total Loan Amount (₹)</label>
              <input 
                type="number" 
                name="totalLoanAmount" 
                value={formData.totalLoanAmount} 
                onChange={handleChange} 
                placeholder="Total loan amount" 
                min="0"
                required 
              />
            </div>
            
            {/* Loan Tenure Field */}
            <div className="form-group">
              <label>4️⃣ Loan Tenure (months)</label>
              <input 
                type="number" 
                name="loanTenure" 
                value={formData.loanTenure} 
                onChange={handleChange} 
                placeholder="Loan tenure in months" 
                min="1"
                max="360"
                required 
              />
            </div>
            
            {/* Credit Utilization Field */}
            <div className="form-group">
              <label>5️⃣ Credit Utilization (%)</label>
              <input 
                type="number" 
                name="creditUtilization" 
                value={formData.creditUtilization} 
                onChange={handleChange} 
                placeholder="Credit utilization %" 
                min="0"
                max="100"
                required 
              />
            </div>
            
            {/* Missed Payments Field */}
            <div className="form-group">
              <label>6️⃣ Missed Payments</label>
              <select name="missedPayments" value={formData.missedPayments} onChange={handleChange}>
                <option value="0">0 - No missed payments</option>
                <option value="1">1 missed payment</option>
                <option value="2">2 missed payments</option>
                <option value="3">3 missed payments</option>
                <option value="4">4 or more</option>
              </select>
            </div>
            
            {/* Active Loans Field */}
            <div className="form-group">
              <label>7️⃣ Active Loans</label>
              <input 
                type="number" 
                name="activeLoans" 
                value={formData.activeLoans} 
                onChange={handleChange} 
                placeholder="Number of active loans" 
                min="0"
                required 
              />
            </div>
            
            {/* Credit History Field */}
            <div className="form-group">
              <label>8️⃣ Credit History (Years)</label>
              <input 
                type="number" 
                name="creditHistoryLength" 
                value={formData.creditHistoryLength} 
                onChange={handleChange} 
                placeholder="Credit history in years" 
                min="0"
                max="50"
                required 
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              <i className="fas fa-redo"></i> Reset Form
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-chart-bar"></i> Analyze Credit Score
            </button>
          </div>
        </form>
      </div>
      
      <div className="info-box">
        <h3><i className="fas fa-info-circle"></i> About This Analysis</h3>
        <ul>
          <li>All calculations are performed locally in your browser</li>
          <li>Your data is never transmitted to any server</li>
          <li>Results are based on standard credit scoring models</li>
          <li>For demonstration purposes only</li>
        </ul>
      </div>
    </div>
  );
};

// MAKE SURE THIS LINE EXISTS AT THE END:
export default InputPage;