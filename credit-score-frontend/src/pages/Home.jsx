// Home.jsx - Fixed version
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  LinearProgress,
  Alert,
  alpha,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { getHealthStatus } from '../api/api';

const Home = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const status = await getHealthStatus();
      setHealthStatus(status);
    } catch (error) {
      setHealthStatus({ status: 'error', message: 'Backend not reachable' });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: 'AI-Powered Predictions',
      description: 'Leverage ensemble machine learning models for 95%+ accurate credit assessments',
      color: theme.palette.primary.main,
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 48 }} />,
      title: 'Comprehensive Analytics',
      description: 'Detailed insights and visualizations for data-driven decision making',
      color: theme.palette.secondary.main,
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48 }} />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and privacy-first architecture',
      color: theme.palette.success.main,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 48 }} />,
      title: 'Real-time Processing',
      description: 'Get instant results with our optimized inference pipeline',
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          py: { xs: 8, md: 12 },
          mb: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Intelligent Credit
                <span style={{ color: theme.palette.primary.main }}> Scoring</span>
                {' '}with AI
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 600 }}
              >
                Transform your credit assessment process with our cutting-edge 
                machine learning platform. Get accurate predictions, actionable insights, 
                and comprehensive analytics in real-time.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/predict')}
                  sx={{
                    px: 4,
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
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Analytics
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  borderRadius: 6,
                  p: 4,
                  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                  boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.1)}`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Health Status Card */}
                <Card
                  sx={{
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    mb: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      System Status
                    </Typography>
                    {loading ? (
                      <LinearProgress sx={{ borderRadius: 2 }} />
                    ) : healthStatus?.status === 'healthy' ? (
                      <Alert 
                        severity="success"
                        sx={{
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.success.main, 0.1),
                          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                        }}
                      >
                        ✅ All systems operational. Model ready for predictions.
                      </Alert>
                    ) : (
                      <Alert 
                        severity="warning"
                        sx={{
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.warning.main, 0.1),
                          border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                        }}
                      >
                        ⚠️ Backend connection issue. Please check server status.
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
                      <CardContent>
                        <Typography variant="h3" fontWeight={800} color="primary">
                          95%
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Accuracy Rate
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ borderRadius: 3, textAlign: 'center' }}>
                      <CardContent>
                        <Typography variant="h3" fontWeight={800} color="secondary">
                          100ms
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Response Time
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            mb: 8,
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          Why Choose Our Platform
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: `1px solid ${theme.palette.divider}`,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.9)})`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 4, height: '100%' }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      background: `linear-gradient(135deg, ${alpha(feature.color, 0.1)}, ${alpha(feature.color, 0.05)})`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Card
          sx={{
            borderRadius: 6,
            border: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Transform Your Credit Assessment?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of financial institutions using our AI platform
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/predict')}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: '1.1rem',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Predicting Now
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Home;