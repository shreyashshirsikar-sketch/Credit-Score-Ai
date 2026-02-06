// src/components/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultPage.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('creditData');
    if (!savedData) {
      navigate('/');
      return;
    }

    const parsedData = JSON.parse(savedData);
    setFormData(parsedData);
    calculateAnalysis(parsedData);
  }, [navigate]);

  const calculateAnalysis = (data) => {
    // Extract values
    const age = parseInt(data.age);
    const monthlyIncome = parseInt(data.monthlyIncome);
    const totalLoanAmount = parseInt(data.totalLoanAmount);
    const loanTenure = parseInt(data.loanTenure);
    const creditUtilization = parseInt(data.creditUtilization);
    const missedPayments = parseInt(data.missedPayments);
    const activeLoans = parseInt(data.activeLoans);
    const creditHistoryLength = parseInt(data.creditHistoryLength);

    // Calculate simulated credit score
    let score = 700; // Base score

    // Adjustments based on factors
    if (age >= 30 && age <= 50) score += 20;
    else if (age < 25) score -= 10;

    // Debt-to-income ratio
    const monthlyDebt = totalLoanAmount / (loanTenure || 1);
    const dtiRatio = (monthlyDebt / (monthlyIncome || 1)) * 100;
    if (dtiRatio < 30) score += 20;
    else if (dtiRatio > 50) score -= 25;

    // Credit utilization
    if (creditUtilization < 30) score += 25;
    else if (creditUtilization > 70) score -= 20;

    // Missed payments
    score -= missedPayments * 20;

    // Active loans
    if (activeLoans <= 2) score += 10;
    else if (activeLoans >= 5) score -= 15;

    // Credit history
    if (creditHistoryLength > 7) score += 25;
    else if (creditHistoryLength < 2) score -= 20;

    // Clamp score between 300-900
    score = Math.max(300, Math.min(900, Math.round(score)));

    // Determine credit band
    let creditBand = 'Poor';
    let bandColor = 'poor';
    if (score >= 750) {
      creditBand = 'Excellent';
      bandColor = 'excellent';
    } else if (score >= 700) {
      creditBand = 'Good';
      bandColor = 'good';
    } else if (score >= 650) {
      creditBand = 'Fair';
      bandColor = 'fair';
    }

    // Determine risk level
    let riskLevel = 'High';
    let riskColor = 'high';
    if (score >= 700) {
      riskLevel = 'Low';
      riskColor = 'low';
    } else if (score >= 650) {
      riskLevel = 'Medium';
      riskColor = 'medium';
    }

    // Generate improvement tips
    const tips = generateImprovementTips({
      creditUtilization,
      missedPayments,
      activeLoans,
      creditHistoryLength,
      dtiRatio,
      score
    });

    setAnalysis({
      score,
      creditBand,
      bandColor,
      riskLevel,
      riskColor,
      creditUtilization,
      dtiRatio: dtiRatio.toFixed(1),
      tips
    });
  };

  const generateImprovementTips = (data) => {
    const tips = [];

    if (data.creditUtilization > 30) {
      tips.push({
        icon: 'fa-percentage',
        title: 'Reduce Credit Utilization',
        description: `Your current utilization is ${data.creditUtilization}%. Aim for below 30% by paying down credit card balances.`
      });
    }

    if (data.missedPayments > 0) {
      tips.push({
        icon: 'fa-calendar-check',
        title: 'Avoid Late Payments',
        description: `You have ${data.missedPayments} missed payment(s). Set up automatic payments for at least the minimum amount due.`
      });
    }

    if (data.dtiRatio > 40) {
      tips.push({
        icon: 'fa-balance-scale',
        title: 'Improve Debt-to-Income Ratio',
        description: `Your DTI ratio is ${data.dtiRatio}%. Consider increasing income or reducing debt to get below 36%.`
      });
    }

    if (data.activeLoans > 3) {
      tips.push({
        icon: 'fa-hand-holding-usd',
        title: 'Consolidate Loans',
        description: `You have ${data.activeLoans} active loans. Consider consolidating them for better management.`
      });
    }

    if (data.creditHistoryLength < 3) {
      tips.push({
        icon: 'fa-history',
        title: 'Build Credit History',
        description: 'Keep old accounts open and consider becoming an authorized user on established accounts.'
      });
    }

    // Always include these general tips
    tips.push({
      icon: 'fa-file-invoice',
      title: 'Monitor Credit Reports',
      description: 'Regularly check all three credit reports for errors and dispute inaccuracies promptly.'
    });

    tips.push({
      icon: 'fa-search',
      title: 'Limit Hard Inquiries',
      description: 'Space out credit applications to minimize hard inquiries on your report.'
    });

    return tips;
  };

  const handleNewAnalysis = () => {
    localStorage.removeItem('creditData');
    navigate('/');
  };

  if (!formData || !analysis) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <i className="fas fa-cog fa-spin"></i>
        </div>
        <h2>Analyzing Your Credit Profile...</h2>
        <p>Please wait while we process your information</p>
      </div>
    );
  }

  return (
    <div className="result-container">
      <header className="result-header">
        <div className="header-content">
          <h1><i className="fas fa-chart-pie"></i> Credit Analysis Results</h1>
          <p>Based on your provided information</p>
        </div>
        <button onClick={handleNewAnalysis} className="btn-new-analysis">
          <i className="fas fa-redo"></i> New Analysis
        </button>
      </header>

      {/* Score Display */}
      <div className="score-section">
        <div className="score-card">
          <div className="score-label">
            <h3>✅ Predicted CIBIL Score</h3>
            <p>Based on your financial profile</p>
          </div>
          <div className="score-value">{analysis.score}</div>
          <div className={`score-band band-${analysis.bandColor}`}>
            <i className="fas fa-trophy"></i> {analysis.creditBand} Credit
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="indicators-grid">
        <div className="indicator-card">
          <div className="indicator-header">
            <i className="fas fa-layer-group"></i>
            <h4>Credit Band</h4>
          </div>
          <div className={`indicator-value band-${analysis.bandColor}`}>
            {analysis.creditBand}
          </div>
          <div className="indicator-description">
            Classification of your creditworthiness
          </div>
        </div>

        <div className="indicator-card">
          <div className="indicator-header">
            <i className="fas fa-exclamation-triangle"></i>
            <h4>Risk Level</h4>
          </div>
          <div className={`indicator-value risk-${analysis.riskColor}`}>
            {analysis.riskLevel}
          </div>
          <div className="indicator-description">
            Perceived lending risk level
          </div>
        </div>

        <div className="indicator-card">
          <div className="indicator-header">
            <i className="fas fa-percentage"></i>
            <h4>Credit Utilization</h4>
          </div>
          <div className="indicator-value">
            {analysis.creditUtilization}%
          </div>
          <div className="indicator-description">
            Current credit limit usage
          </div>
        </div>

        <div className="indicator-card">
          <div className="indicator-header">
            <i className="fas fa-balance-scale"></i>
            <h4>Debt-to-Income</h4>
          </div>
          <div className="indicator-value">
            {analysis.dtiRatio}%
          </div>
          <div className="indicator-description">
            Monthly debt vs income ratio
          </div>
        </div>
      </div>

      {/* Improvement Tips */}
      <div className="tips-section">
        <div className="section-header">
          <h2><i className="fas fa-lightbulb"></i> ✅ Improvement Tips</h2>
          <p>Personalized recommendations to enhance your credit profile</p>
        </div>

        <div className="tips-grid">
          {analysis.tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <div className="tip-icon">
                <i className={`fas ${tip.icon}`}></i>
              </div>
              <div className="tip-content">
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="summary-section">
        <div className="summary-card">
          <h3><i className="fas fa-file-alt"></i> Summary</h3>
          <p>
            Your credit score of <strong>{analysis.score}</strong> falls into the{' '}
            <strong className={`band-${analysis.bandColor}`}>{analysis.creditBand}</strong>{' '}
            category, indicating a <strong className={`risk-${analysis.riskColor}`}>
            {analysis.riskLevel.toLowerCase()}</strong> risk level for lenders.
          </p>
          <p>
            Focus on implementing the suggested improvements to potentially increase your 
            score over the next 6-12 months.
          </p>
          <div className="summary-actions">
            <button onClick={handleNewAnalysis} className="btn btn-primary">
              <i className="fas fa-calculator"></i> Perform New Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;