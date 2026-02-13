// Predict.jsx — Premium Glass UI with Perfect Center Alignment
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Slider,
  Paper,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  alpha,
  useTheme,
  Stack,
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { predictCreditScore, getSampleData } from '../api/api';

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("show");
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

const Predict = () => {
  const [formData, setFormData] = useState({
    age: 35,
    monthly_income: 75000,
    loan_amount: 500000,
    credit_utilization: 0.4,
    missed_payments: 1,
    total_active_loans: 2,
    credit_history_years: 7,
    loan_tenure_months: 72,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sampleData, setSampleData] = useState([]);
  const theme = useTheme();

  useScrollReveal();

  useEffect(() => {
    fetchSampleData();
  }, []);

  const fetchSampleData = async () => {
    try {
      const response = await getSampleData();
      setSampleData(response.samples);
    } catch (error) {
      console.error('Failed to fetch sample data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || value,
    }));
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictCreditScore(formData);
      setResult(response);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to make prediction');
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = (sample) => {
    setFormData(sample);
    setResult(null);
    setError(null);
  };

  const getScoreColor = (scoreBand) => {
    switch (scoreBand) {
      case 'Excellent': return theme.palette.success.main;
      case 'Good': return theme.palette.info.main;
      case 'Fair': return theme.palette.warning.main;
      case 'Poor': return theme.palette.error.main;
      default: return theme.palette.text.secondary;
    }
  };

  const getDecisionColor = (decision) => {
    if (decision.includes('APPROVED')) return theme.palette.success.main;
    if (decision.includes('REVIEW')) return theme.palette.warning.main;
    if (decision.includes('DECLINED')) return theme.palette.error.main;
    return theme.palette.text.secondary;
  };

  const InputField = ({ label, name, value, onChange, ...props }) => (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'left' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        size="small"
        {...props}
      />
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.97)} 0%, ${alpha(theme.palette.primary.light, 0.03)} 100%)`,
      py: 4,
    }}>
      <Container 
        maxWidth="md" 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          className="reveal opacity-0 translate-y-8"
          sx={{
            width: '100%',
            p: 4,
            mb: 3,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mx: 'auto',
              mb: 2,
            }}
          >
            <CalculateIcon sx={{ fontSize: 35 }} />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Credit Score Prediction
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your financial details to get an AI-powered credit assessment
          </Typography>
        </Paper>

        {/* Sample Profiles */}
        {sampleData.length > 0 && (
          <Accordion
            elevation={0}
            className="reveal opacity-0 translate-y-8"
            sx={{
              width: '100%',
              mb: 3,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  justifyContent: 'center',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShowChartIcon color="primary" />
                <Typography sx={{ fontWeight: 600 }}>Try Sample Profiles</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {sampleData.map((sample, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      background: alpha(theme.palette.background.paper, 0.6),
                      backdropFilter: 'blur(10px)',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {sample.description}
                    </Typography>
                    <Chip
                      label={`${sample.risk_level} Risk`}
                      size="small"
                      sx={{ my: 1 }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => loadSampleData(sample.data)}
                      fullWidth
                    >
                      Load Profile
                    </Button>
                  </Paper>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Form Card */}
        <Paper
          elevation={0}
          className="reveal opacity-0 translate-y-8"
          sx={{
            width: '100%',
            p: 4,
            mb: 3,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
          }}
        >
          {/* Form Header - YOUR EXACT CODE */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              mb: 2,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}>
              <CalculateIcon sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
              Financial Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Fill in your details below for an accurate assessment
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Age */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Age</Typography>
                  <Chip
                    label={`${formData.age} years`}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Slider
                  value={formData.age}
                  onChange={handleSliderChange('age')}
                  min={18}
                  max={70}
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>

              {/* Credit Utilization */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Credit Utilization</Typography>
                  <Chip
                    label={`${(formData.credit_utilization * 100).toFixed(0)}%`}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Slider
                  value={formData.credit_utilization}
                  onChange={handleSliderChange('credit_utilization')}
                  min={0}
                  max={1}
                  step={0.01}
                  sx={{ color: theme.palette.primary.main }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">0%</Typography>
                  <Typography variant="caption" color="text.secondary">100%</Typography>
                </Box>
              </Box>

              {/* Missed Payments */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Missed Payments</Typography>
                  <Chip
                    label={`${formData.missed_payments} in 12mo`}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Slider
                  value={formData.missed_payments}
                  onChange={handleSliderChange('missed_payments')}
                  min={0}
                  max={10}
                  sx={{ color: theme.palette.primary.main }}
                />
              </Box>

              {/* Text Fields Grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <InputField
                  label="Monthly Income (₹)"
                  name="monthly_income"
                  value={formData.monthly_income}
                  onChange={handleChange}
                  InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                />
                <InputField
                  label="Loan Amount (₹)"
                  name="loan_amount"
                  value={formData.loan_amount}
                  onChange={handleChange}
                  InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography> }}
                />
                <InputField
                  label="Active Loans"
                  name="total_active_loans"
                  value={formData.total_active_loans}
                  onChange={handleChange}
                />
                <InputField
                  label="Credit History (Years)"
                  name="credit_history_years"
                  value={formData.credit_history_years}
                  onChange={handleChange}
                />
                <InputField
                  label="Loan Tenure (Months)"
                  name="loan_tenure_months"
                  value={formData.loan_tenure_months}
                  onChange={handleChange}
                  sx={{ gridColumn: { sm: 'span 2' } }}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  endIcon={!loading && <TrendingUpIcon />}
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Generate Credit Assessment'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {/* Results */}
        {result && (
          <Paper
            elevation={0}
            className="reveal opacity-0 translate-y-8"
            sx={{
              width: '100%',
              p: 4,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center', mb: 3 }}>
              Assessment Results
            </Typography>

            {/* Score Circle */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative', width: 160, height: 160, mx: 'auto', mb: 2 }}>
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `conic-gradient(${getScoreColor(result.prediction.credit_score_band)} ${result.prediction.risk_score * 3.6}deg, ${alpha(theme.palette.divider, 0.3)} 0deg)`,
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '15%',
                  left: '15%',
                  width: '70%',
                  height: '70%',
                  borderRadius: '50%',
                  background: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    {result.prediction.risk_score}
                  </Typography>
                  <Typography variant="caption">/100</Typography>
                </Box>
              </Box>
              <Chip
                label={result.prediction.credit_score_band}
                sx={{
                  bgcolor: getScoreColor(result.prediction.credit_score_band),
                  color: 'white',
                  fontWeight: 700,
                  px: 2,
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Loan Decision */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Loan Decision
              </Typography>
              <Chip
                label={result.prediction.loan_decision}
                sx={{
                  bgcolor: getDecisionColor(result.prediction.loan_decision),
                  color: 'white',
                  fontWeight: 700,
                  mb: 2,
                  px: 2,
                }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Paper sx={{ p: 2, flex: 1, textAlign: 'center', background: 'transparent' }}>
                  <Typography variant="caption" color="text.secondary">Risk Level</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {result.prediction.risk_level}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2, flex: 1, textAlign: 'center', background: 'transparent' }}>
                  <Typography variant="caption" color="text.secondary">Interest Rate</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {result.prediction.suggested_interest_rate}
                  </Typography>
                </Paper>
              </Box>
            </Box>

            {/* Insights */}
            {result.prediction.insights && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
                  Insights
                </Typography>
                {result.prediction.insights.warnings?.map((w, i) => (
                  <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    • {w}
                  </Typography>
                ))}
                {result.prediction.insights.recommendations?.map((r, i) => (
                  <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    • {r}
                  </Typography>
                ))}
              </>
            )}
          </Paper>
        )}
      </Container>

      <style>{`
        .reveal {
          transition: all 0.8s ease;
          opacity: 0;
          transform: translateY(30px);
        }
        .reveal.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </Box>
  );
};

export default Predict;