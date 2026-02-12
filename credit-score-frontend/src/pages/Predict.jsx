// Predict.jsx - Updated with modern form design
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalculateIcon from '@mui/icons-material/Calculate';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { predictCreditScore, getSampleData } from '../api/api';

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

  const InputField = ({ label, name, value, onChange, type = 'number', ...props }) => (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          },
        }}
        {...props}
      />
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" sx={{ fontWeight: 800, mb: 1 }}>
          Credit Score Prediction
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Enter your financial details to get an AI-powered credit assessment
        </Typography>
      </Box>

      {/* Sample Data */}
      {sampleData.length > 0 && (
        <Accordion
          sx={{
            mb: 4,
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              borderRadius: 3,
              '&.Mui-expanded': {
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ShowChartIcon color="primary" />
              <Typography variant="h6">Try Sample Profiles</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {sampleData.map((sample, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        {sample.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {sample.risk_level} Risk Profile
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => loadSampleData(sample.data)}
                        fullWidth
                        sx={{ borderRadius: 2 }}
                      >
                        Load This Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      <Grid container spacing={4}>
        {/* Form Column */}
        <Grid item xs={12} lg={7}>
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)})`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <CalculateIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Financial Information
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  {/* Slider Inputs */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Age
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight={600}>
                          {formData.age} years
                        </Typography>
                      </Box>
                      <Slider
                        value={formData.age}
                        onChange={handleSliderChange('age')}
                        min={18}
                        max={70}
                        sx={{
                          color: theme.palette.primary.main,
                          '& .MuiSlider-thumb': {
                            width: 20,
                            height: 20,
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Credit Utilization
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight={600}>
                          {(formData.credit_utilization * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                      <Slider
                        value={formData.credit_utilization}
                        onChange={handleSliderChange('credit_utilization')}
                        min={0}
                        max={1}
                        step={0.01}
                        sx={{
                          color: theme.palette.primary.main,
                          '& .MuiSlider-thumb': {
                            width: 20,
                            height: 20,
                          },
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">0%</Typography>
                        <Typography variant="caption" color="text.secondary">100%</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Missed Payments (12 months)
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight={600}>
                          {formData.missed_payments}
                        </Typography>
                      </Box>
                      <Slider
                        value={formData.missed_payments}
                        onChange={handleSliderChange('missed_payments')}
                        min={0}
                        max={10}
                        sx={{
                          color: theme.palette.primary.main,
                          '& .MuiSlider-thumb': {
                            width: 20,
                            height: 20,
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Text Inputs */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <InputField
                        label="Monthly Income (₹)"
                        name="monthly_income"
                        value={formData.monthly_income}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                        }}
                      />
                      <InputField
                        label="Loan Amount (₹)"
                        name="loan_amount"
                        value={formData.loan_amount}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                        }}
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
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Generate Credit Assessment'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Column */}
        <Grid item xs={12} lg={5}>
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              }}
            >
              {error}
            </Alert>
          )}

          {result && (
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                  Assessment Results
                </Typography>

                {/* Score Band */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      background: `conic-gradient(${getScoreColor(result.prediction.credit_score_band)} ${result.prediction.risk_score * 3.6}deg, ${alpha(theme.palette.divider, 0.3)} 0deg)`,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.background.paper,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        {result.prediction.risk_score}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        /100
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={result.prediction.credit_score_band}
                    sx={{
                      bgcolor: getScoreColor(result.prediction.credit_score_band),
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      borderRadius: 20,
                    }}
                  />
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Loan Decision */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Loan Decision
                  </Typography>
                  <Chip
                    label={result.prediction.loan_decision}
                    sx={{
                      bgcolor: getDecisionColor(result.prediction.loan_decision),
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600,
                      mb: 2,
                      px: 3,
                      py: 1,
                    }}
                  />
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Risk Level
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {result.prediction.risk_level}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Interest Rate
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {result.prediction.suggested_interest_rate}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Insights */}
                {result.prediction.insights && (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                      Insights & Recommendations
                    </Typography>
                    
                    {result.prediction.insights.warnings?.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              backgroundColor: alpha(theme.palette.error.main, 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                            }}
                          >
                            <Typography color="error" sx={{ fontSize: '0.875rem' }}>
                              ⚠️
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Areas for Improvement
                          </Typography>
                        </Box>
                        <Box sx={{ pl: 6 }}>
                          {result.prediction.insights.warnings.map((warning, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}
                            >
                              <span style={{ marginRight: 8 }}>•</span>
                              {warning}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )}

                    {result.prediction.insights.recommendations?.length > 0 && (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              backgroundColor: alpha(theme.palette.success.main, 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                            }}
                          >
                            <Typography color="success" sx={{ fontSize: '0.875rem' }}>
                              💡
                            </Typography>
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            Recommendations
                          </Typography>
                        </Box>
                        <Box sx={{ pl: 6 }}>
                          {result.prediction.insights.recommendations.map((rec, index) => (
                            <Typography
                              key={index}
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}
                            >
                              <span style={{ marginRight: 8 }}>•</span>
                              {rec}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Predict;