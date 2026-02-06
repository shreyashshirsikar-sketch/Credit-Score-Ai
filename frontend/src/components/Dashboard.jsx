// src/components/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart, 
  Shield, 
  Clock, 
  DollarSign, 
  CreditCard, 
  PieChart,
  CheckCircle,
  AlertCircle,
  Info,
  Calculator,
  Users,
  FileText,
  ArrowRight,
  Zap,
  Target,
  Lock,
  BarChart2
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    
    // Hero Section
    heroSection: {
      background: 'linear-gradient(135deg, #1a3a8f 0%, #2a56b7 100%)',
      color: 'white',
      padding: '80px 20px',
      borderRadius: '0 0 40px 40px',
      position: 'relative',
      overflow: 'hidden'
    },
    
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    },
    
    heroBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '12px 24px',
      borderRadius: '50px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '24px'
    },
    
    gradientText: {
      background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    
    heroDescription: {
      fontSize: '1.25rem',
      lineHeight: '1.6',
      maxWidth: '700px',
      margin: '0 auto 40px',
      opacity: '0.9'
    },
    
    heroActions: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    
    heroStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      maxWidth: '1200px',
      margin: '60px auto 0'
    },
    
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      transition: 'transform 0.3s ease'
    },
    
    statIcon: {
      width: '60px',
      height: '60px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    // Section Common Styles
    section: {
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    
    sectionHeader: {
      textAlign: 'center',
      marginBottom: '60px'
    },
    
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '16px'
    },
    
    sectionSubtitle: {
      fontSize: '1.125rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto'
    },
    
    // Steps Section
    stepsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      marginBottom: '80px'
    },
    
    stepCard: {
      textAlign: 'center',
      position: 'relative'
    },
    
    stepNumber: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      fontWeight: '700',
      margin: '0 auto 24px',
      position: 'relative'
    },
    
    stepContent: {
      marginTop: '20px'
    },
    
    stepTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '12px'
    },
    
    stepDescription: {
      color: '#64748b',
      lineHeight: '1.6'
    },
    
    // Features Grid
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    },
    
    featureCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease'
    },
    
    featureIcon: {
      width: '60px',
      height: '60px',
      background: '#f1f5f9',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px'
    },
    
    // Score Ranges
    scoreRangesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      maxWidth: '1000px',
      margin: '0 auto 40px'
    },
    
    scoreCard: {
      background: '#f8fafc',
      borderRadius: '15px',
      padding: '25px',
      textAlign: 'center'
    },
    
    scoreRange: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '20px'
    },
    
    rangeValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b'
    },
    
    rangeLabel: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#64748b'
    },
    
    rangeBar: {
      height: '8px',
      background: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    
    // Tips Section
    tipsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    
    tipCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px'
    },
    
    tipIcon: {
      position: 'relative',
      flexShrink: 0
    },
    
    importanceBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      fontSize: '0.7rem',
      fontWeight: '600',
      padding: '2px 8px',
      borderRadius: '10px',
      color: 'white'
    },
    
    // CTA Section
    ctaSection: {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
      color: 'white',
      padding: '80px 20px',
      margin: '40px 0',
      borderRadius: '30px'
    },
    
    ctaContent: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },
    
    // Buttons
    primaryBtn: {
      background: 'white',
      color: '#1e3a8a',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '1.125rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.3s ease'
    },
    
    secondaryBtn: {
      background: 'transparent',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '1.125rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.3s ease'
    },
    
    // Footer
    footer: {
      background: '#0f172a',
      color: '#cbd5e1',
      padding: '60px 20px 30px'
    },
    
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '60px',
      marginBottom: '40px'
    },
    
    footerBottom: {
      maxWidth: '1200px',
      margin: '0 auto',
      paddingTop: '30px',
      borderTop: '1px solid #334155',
      textAlign: 'center'
    },
    
    // Responsive
    '@media (max-width: 768px)': {
      heroTitle: {
        fontSize: '2rem'
      },
      heroStats: {
        gridTemplateColumns: '1fr'
      },
      featuresGrid: {
        gridTemplateColumns: '1fr'
      },
      scoreRangesGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      footerContent: {
        gridTemplateColumns: '1fr'
      }
    },
    
    '@media (max-width: 480px)': {
      heroActions: {
        flexDirection: 'column'
      },
      scoreRangesGrid: {
        gridTemplateColumns: '1fr'
      }
    }
  };

  const features = [
    {
      icon: <BarChart />,
      title: 'AI-Powered Prediction',
      description: 'Advanced algorithms analyze 8 key factors for accurate credit score estimation',
      color: '#3b82f6'
    },
    {
      icon: <Shield />,
      title: 'Secure & Private',
      description: 'Your data stays on your device. No personal information is stored',
      color: '#10b981'
    },
    {
      icon: <Clock />,
      title: 'Instant Results',
      description: 'Get your credit analysis in seconds with detailed improvement tips',
      color: '#8b5cf6'
    },
    {
      icon: <DollarSign />,
      title: 'Financial Insights',
      description: 'Understand how different factors impact your creditworthiness',
      color: '#f59e0b'
    },
    {
      icon: <CreditCard />,
      title: 'Credit Utilization',
      description: 'Learn the optimal credit usage for better scores',
      color: '#ef4444'
    },
    {
      icon: <PieChart />,
      title: 'Risk Analysis',
      description: 'Get your credit risk level categorized as Low, Medium, or High',
      color: '#6366f1'
    }
  ];

  const scoreRanges = [
    { range: '300-579', label: 'Poor', color: '#ef4444', width: '20%' },
    { range: '580-669', label: 'Fair', color: '#f59e0b', width: '40%' },
    { range: '670-739', label: 'Good', color: '#3b82f6', width: '60%' },
    { range: '740-799', label: 'Very Good', color: '#10b981', width: '80%' },
    { range: '800-850', label: 'Excellent', color: '#8b5cf6', width: '100%' }
  ];

  const quickTips = [
    {
      icon: <CheckCircle />,
      tip: 'Keep credit utilization below 30%',
      importance: 'High',
      color: '#f59e0b'
    },
    {
      icon: <CheckCircle />,
      tip: 'Never miss payment deadlines',
      importance: 'Critical',
      color: '#ef4444'
    },
    {
      icon: <CheckCircle />,
      tip: 'Maintain a healthy credit mix',
      importance: 'Medium',
      color: '#3b82f6'
    },
    {
      icon: <CheckCircle />,
      tip: 'Limit new credit applications',
      importance: 'High',
      color: '#f59e0b'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Enter Your Information',
      description: 'Fill in 8 key financial parameters including age, income, loan details, and credit history'
    },
    {
      number: '2',
      title: 'AI Analysis',
      description: 'Our algorithm processes your data using credit scoring models to generate accurate predictions'
    },
    {
      number: '3',
      title: 'Get Results & Tips',
      description: 'Receive your credit score, risk level, and personalized improvement recommendations'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <TrendingUp style={{ width: '20px', height: '20px' }} />
            <span>AI-Powered Credit Analysis</span>
          </div>
          
          <h1 style={styles.heroTitle}>
            Take Control of Your <span style={styles.gradientText}>Credit Health</span>
          </h1>
          
          <p style={styles.heroDescription}>
            Get a comprehensive analysis of your credit profile with personalized 
            improvement tips. Understand the factors that influence your credit score 
            and learn how to improve it.
          </p>
          
          <div style={styles.heroActions}>
            <button 
              style={styles.primaryBtn}
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Calculator style={{ width: '20px', height: '20px' }} />
              Start Credit Analysis
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
            
            <button 
              style={styles.secondaryBtn}
              onClick={() => navigate('/result')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              <FileText style={{ width: '20px', height: '20px' }} />
              View Sample Report
            </button>
          </div>
        </div>
        
        <div style={styles.heroStats}>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>
              <Users style={{ width: '30px', height: '30px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>
                8 Key Factors
              </h3>
              <p style={{ opacity: '0.8', fontSize: '0.9rem' }}>Comprehensive analysis</p>
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>
              <Lock style={{ width: '30px', height: '30px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>
                100% Secure
              </h3>
              <p style={{ opacity: '0.8', fontSize: '0.9rem' }}>Data stays on your device</p>
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={styles.statIcon}>
              <Zap style={{ width: '30px', height: '30px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '5px' }}>
                Instant Results
              </h3>
              <p style={{ opacity: '0.8', fontSize: '0.9rem' }}>Get analysis in seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionSubtitle}>
            Get detailed insights into your credit profile in three simple steps
          </p>
        </div>
        
        <div style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} style={styles.stepCard}>
              <div style={styles.stepNumber}>{step.number}</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{
                ...styles.featureCard,
                borderTop: `4px solid ${feature.color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={styles.featureIcon}>
                {React.cloneElement(feature.icon, { 
                  style: { width: '30px', height: '30px', color: '#475569' }
                })}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '12px' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Score Ranges Section */}
      <div style={{ background: 'white', padding: '80px 20px', margin: '40px 0' }}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Understanding Credit Score Ranges</h2>
          <p style={styles.sectionSubtitle}>Know where you stand and what each range means</p>
        </div>
        
        <div style={styles.scoreRangesGrid}>
          {scoreRanges.map((score, index) => (
            <div 
              key={index} 
              style={{
                ...styles.scoreCard,
                borderLeft: `4px solid ${score.color}`
              }}
            >
              <div style={styles.scoreRange}>
                <span style={styles.rangeValue}>{score.range}</span>
                <span style={styles.rangeLabel}>{score.label}</span>
              </div>
              <div style={styles.rangeBar}>
                <div style={{
                  height: '100%',
                  width: score.width,
                  background: score.color,
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
            background: '#f1f5f9',
            padding: '25px',
            borderRadius: '15px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <Info style={{ width: '24px', height: '24px', color: '#3b82f6', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                CIBIL Score Range
              </h4>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                In India, CIBIL scores range from 300 to 900. Higher scores indicate better creditworthiness.
                A score above 750 is generally considered excellent by most lenders.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Quick Credit Improvement Tips</h2>
          <p style={styles.sectionSubtitle}>Essential strategies to boost your credit score</p>
        </div>
        
        <div style={styles.tipsGrid}>
          {quickTips.map((tip, index) => (
            <div key={index} style={styles.tipCard}>
              <div style={styles.tipIcon}>
                {React.cloneElement(tip.icon, {
                  style: { width: '24px', height: '24px', color: '#10b981' }
                })}
                <span 
                  style={{
                    ...styles.importanceBadge,
                    background: tip.color
                  }}
                >
                  {tip.importance}
                </span>
              </div>
              <p style={{ color: '#1e293b', fontWeight: '500', lineHeight: '1.5', margin: 0 }}>
                {tip.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '20px' }}>
            Ready to Analyze Your Credit Profile?
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: '0.9', marginBottom: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get your personalized credit analysis and improvement plan in minutes.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            <button 
              style={{ ...styles.primaryBtn, padding: '20px 40px', fontSize: '1.25rem' }}
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Calculator style={{ width: '20px', height: '20px' }} />
              Start Free Analysis
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
            
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: '0.9' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#60a5fa' }} />
                <span>No credit card required</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: '0.9' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#60a5fa' }} />
                <span>100% private and secure</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: '0.9' }}>
                <CheckCircle style={{ width: '20px', height: '20px', color: '#60a5fa' }} />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Target style={{ width: '32px', height: '32px', color: '#60a5fa' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>CreditScoreAI</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              AI-powered credit analysis for better financial decisions
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div>
              <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '20px' }}>Product</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a>
                <a href="#how-it-works" style={{ color: '#94a3b8', textDecoration: 'none' }}>How It Works</a>
                <a href="#pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>Pricing</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '20px' }}>Resources</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#blog" style={{ color: '#94a3b8', textDecoration: 'none' }}>Blog</a>
                <a href="#guides" style={{ color: '#94a3b8', textDecoration: 'none' }}>Guides</a>
                <a href="#faq" style={{ color: '#94a3b8', textDecoration: 'none' }}>FAQ</a>
              </div>
            </div>
            
            <div>
              <h4 style={{ color: 'white', fontSize: '1rem', fontWeight: '600', marginBottom: '20px' }}>Legal</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
                <a href="#terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
                <a href="#disclaimer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Disclaimer</a>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={{ marginBottom: '20px', opacity: '0.7' }}>
            © 2024 CreditScoreAI. All rights reserved. For educational purposes only.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <AlertCircle style={{ width: '20px', height: '20px', color: '#f87171', flexShrink: 0 }} />
            <span style={{ fontSize: '0.9rem', opacity: '0.9' }}>
              This tool provides estimates only and is not a substitute for professional financial advice.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}