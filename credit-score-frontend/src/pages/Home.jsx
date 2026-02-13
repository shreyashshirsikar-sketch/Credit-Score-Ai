// ============================================
// Home.jsx — Premium Glass UI with Perfect Center Alignment & 4 Features in 1 Row
// ============================================

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  Container,
  LinearProgress,
  Alert,
  alpha,
  useTheme,
  Chip,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { getHealthStatus } from '../api/api';

// ----------------------------------------------------------------------------
// Custom Hook: Scroll Reveal Animation
// ----------------------------------------------------------------------------
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

// ============================================================================
// MAIN COMPONENT: Home Page
// ============================================================================
const Home = () => {
  // --------------------------------------------------------------------------
  // STATE & HOOKS
  // --------------------------------------------------------------------------
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useScrollReveal();

  useEffect(() => {
    checkHealth();
  }, []);

  // --------------------------------------------------------------------------
  // API FUNCTIONS
  // ----------------------------------------------------------------------------
  const checkHealth = async () => {
    try {
      const status = await getHealthStatus();
      setHealthStatus(status);
    } catch {
      setHealthStatus({ status: 'error', message: 'Backend not reachable' });
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // CONSTANTS & DATA
  // --------------------------------------------------------------------------
  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Predictions',
      description: 'Leverage ensemble machine learning models for 95%+ accurate credit assessments',
      color: theme.palette.primary.main,
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Comprehensive Analytics',
      description: 'Detailed insights and visualizations for data-driven decision making',
      color: theme.palette.secondary.main,
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and privacy-first architecture',
      color: theme.palette.success.main,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Processing',
      description: 'Get instant results with our optimized inference pipeline',
      color: theme.palette.warning.main,
    },
  ];

  const stats = [
    { value: '95%', label: 'Accuracy Rate', color: theme.palette.primary.main, icon: TrendingUpIcon },
    { value: '100ms', label: 'Response Time', color: theme.palette.secondary.main, icon: SpeedIcon },
    { value: '1M+', label: 'Predictions', color: theme.palette.success.main, icon: AnalyticsIcon },
    { value: '24/7', label: 'Uptime', color: theme.palette.warning.main, icon: SecurityIcon },
  ];

  // --------------------------------------------------------------------------
  // STYLES
  // --------------------------------------------------------------------------
  const glassCardStyles = {
    background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.97)} 0%, ${alpha(theme.palette.primary.light, 0.03)} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      
      {/* -------------------------------------------------------------------- */}
      {/* BACKGROUND ANIMATIONS */}
      {/* -------------------------------------------------------------------- */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: '-40px', 
          right: '-40px', 
          width: '320px', 
          height: '320px', 
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', 
          borderRadius: '50%', 
          filter: 'blur(60px)', 
          animation: 'pulse-slow 6s ease-in-out infinite' 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '-40px', 
          left: '-40px', 
          width: '400px', 
          height: '400px', 
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', 
          borderRadius: '50%', 
          filter: 'blur(60px)', 
          animation: 'pulse-slower 8s ease-in-out infinite' 
        }} />
      </Box>

      {/* -------------------------------------------------------------------- */}
      {/* HERO SECTION - Perfectly Centered */}
      {/* -------------------------------------------------------------------- */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          py: { xs: 6, md: 10 },
          display: 'flex',
          alignItems: 'center',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Grid 
          container 
          spacing={6} 
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          {/* ---------- LEFT COLUMN: Hero Content ---------- */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: '100%',
            }}>
              <div className="reveal">
                <Chip
                  icon={<WorkspacePremiumIcon />}
                  label="⚡ Next-Gen Credit Scoring"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    mb: 3,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    fontSize: '0.9rem',
                  }}
                />
              </div>
              
              <div className="reveal">
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.2rem', lg: '3.8rem' },
                    mb: 2,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <Box component="span" sx={{
                    background: `linear-gradient(135deg, #1e293b, #475569)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}>
                    Intelligent Credit
                  </Box>
                  <br />
                  <Box component="span" sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}>
                    Scoring with AI
                  </Box>
                </Typography>
              </div>

              <div className="reveal" style={{ width: '100%' }}>
                <Typography
                  variant="body1"
                  sx={{ 
                    color: theme.palette.text.secondary, 
                    mb: 4, 
                    maxWidth: 550,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7,
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  Transform your credit assessment process with our cutting-edge machine learning platform. 
                  Get accurate predictions, actionable insights, and comprehensive analytics in real-time.
                </Typography>
              </div>

              <div className="reveal" style={{ width: '100%' }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2.5, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/predict')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      fontSize: '1rem',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.35)}`,
                      },
                      transition: 'all 0.2s ease',
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
                      borderRadius: 2.5,
                      fontWeight: 700,
                      fontSize: '1rem',
                      borderWidth: 1.5,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderWidth: 1.5,
                        transform: 'translateY(-2px)',
                        bgcolor: alpha(theme.palette.primary.main, 0.04),
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    View Analytics
                  </Button>
                </Box>
              </div>
            </Box>
          </Grid>

          {/* ---------- RIGHT COLUMN: System Status Card ---------- */}
          <Grid item xs={12} md={6}>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  maxWidth: 460,
                  p: 4,
                  borderRadius: 4,
                  ...glassCardStyles,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.12)}`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '10%',
                    right: '10%',
                    height: '4px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    borderRadius: '0 0 4px 4px',
                  },
                }}
              >
                {/* Status Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      background: alpha(theme.palette.primary.main, 0.08),
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
                    System Status
                  </Typography>
                  
                  {/* Status Indicator */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {loading ? (
                      <Box sx={{ width: '80%' }}>
                        <LinearProgress 
                          sx={{ 
                            borderRadius: 2,
                            height: 8,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '& .MuiLinearProgress-bar': {
                              bgcolor: theme.palette.primary.main,
                              borderRadius: 2,
                            }
                          }} 
                        />
                      </Box>
                    ) : healthStatus?.status === 'healthy' ? (
                      <Alert 
                        icon={<CheckCircleIcon fontSize="small" />}
                        severity="success"
                        sx={{
                          borderRadius: 2,
                          py: 0,
                          px: 2,
                          bgcolor: alpha(theme.palette.success.main, 0.08),
                          border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                          color: theme.palette.success.main,
                          '& .MuiAlert-icon': {
                            color: theme.palette.success.main,
                          },
                        }}
                      >
                        All systems operational
                      </Alert>
                    ) : (
                      <Alert 
                        severity="warning"
                        sx={{
                          borderRadius: 2,
                          py: 0,
                          px: 2,
                          bgcolor: alpha(theme.palette.warning.main, 0.08),
                          border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
                          color: theme.palette.warning.main,
                        }}
                      >
                        Backend connection issue
                      </Alert>
                    )}
                  </Box>
                </Box>

                {/* Performance Stats */}
                <Typography variant="overline" sx={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  color: theme.palette.text.secondary, 
                  letterSpacing: '1.5px',
                  fontSize: '0.75rem',
                  mb: 2,
                  fontWeight: 600,
                }}>
                  Platform Performance
                </Typography>
                
                <Grid container spacing={2}>
                  {stats.slice(0, 2).map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <Grid item xs={6} key={index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2.5,
                            textAlign: 'center',
                            background: alpha(stat.color, 0.04),
                            border: `1px solid ${alpha(stat.color, 0.1)}`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: alpha(stat.color, 0.08),
                              borderColor: alpha(stat.color, 0.2),
                            },
                          }}
                        >
                          <IconComponent sx={{ fontSize: 24, color: stat.color, mb: 0.5 }} />
                          <Typography variant="h5" sx={{ fontWeight: 800, color: stat.color, lineHeight: 1, fontSize: '1.75rem' }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                            {stat.label}
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Container>

      {/* -------------------------------------------------------------------- */}
      {/* STATS SECTION - Perfect Alignment */}
      {/* -------------------------------------------------------------------- */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <Grid item xs={6} sm={3} key={idx}>
                <div className="reveal" style={{ height: '100%' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      height: '100%',
                      p: 3,
                      borderRadius: 3,
                      ...glassCardStyles,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 16px 32px ${alpha(stat.color, 0.15)}`,
                        borderColor: alpha(stat.color, 0.2),
                      },
                    }}
                  >
                    <IconComponent sx={{ fontSize: 32, color: stat.color, mb: 1.5 }} />
                    <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '2rem', mb: 0.5, color: stat.color, lineHeight: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* -------------------------------------------------------------------- */}
      {/* FEATURES SECTION - 4 Cards Perfectly Aligned in 1 Row */}
      {/* -------------------------------------------------------------------- */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6, maxWidth: 700 }}>
          <div className="reveal">
            <Chip
              label="WHY CHOOSE US"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                color: theme.palette.primary.main,
                fontWeight: 700,
                mb: 2,
                px: 2,
                borderRadius: 2,
                fontSize: '0.8rem',
              }}
            />
          </div>
          
          <div className="reveal">
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.2rem' },
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              <Box component="span" sx={{
                background: `linear-gradient(135deg, #1e293b, #475569)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Built for
              </Box>
              <Box component="span" sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                ml: 1,
              }}>
                Modern Finance
              </Box>
            </Typography>
          </div>

          <div className="reveal">
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, px: 2 }}>
              Our platform combines cutting-edge AI with enterprise-grade security to deliver unprecedented accuracy
            </Typography>
          </div>
        </Box>

        {/* Features Grid - EXACTLY 4 Cards in 1 Row */}
        <Grid 
          container 
          spacing={3} 
          justifyContent="center"
          alignItems="stretch"
          sx={{ width: '100%' }}
        >
          {features.map((feature, idx) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={idx}
              sx={{ 
                display: 'flex',
              }}
            >
              <div className="reveal" style={{ width: '100%', height: '100%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3.5,
                    ...glassCardStyles,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 20px 32px ${alpha(feature.color, 0.15)}`,
                      borderColor: alpha(feature.color, 0.2),
                    },
                  }}
                >
                  {/* Icon Container */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      background: `linear-gradient(145deg, ${alpha(feature.color, 0.12)} 0%, ${alpha(feature.color, 0.06)} 100%)`,
                      color: feature.color,
                      border: `1px solid ${alpha(feature.color, 0.15)}`,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  
                  {/* Title */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      fontSize: '1.1rem',
                      color: theme.palette.text.primary,
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary, 
                      lineHeight: 1.6,
                      fontSize: '0.875rem',
                    }}
                  >
                    {feature.description}
                  </Typography>

                  {/* Hover Accent Line */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: '20%',
                    right: '20%',
                    height: '3px',
                    background: `linear-gradient(90deg, ${feature.color}, ${alpha(feature.color, 0.4)})`,
                    transform: 'scaleX(0)',
                    transition: 'transform 0.25s ease',
                    borderRadius: '3px 3px 0 0',
                    '.MuiPaper-root:hover &': {
                      transform: 'scaleX(1)',
                    },
                  }} />
                </Paper>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* -------------------------------------------------------------------- */}
      {/* CTA SECTION - Perfect Centering */}
      {/* -------------------------------------------------------------------- */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 8,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="reveal" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 900,
              p: { xs: 5, md: 7 },
              borderRadius: 4,
              ...glassCardStyles,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            {/* Decorative Circles */}
            <Box sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: -60,
              left: -60,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.04)} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Icon */}
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                background: alpha(theme.palette.primary.main, 0.08),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              }}
            >
              <WorkspacePremiumIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </Box>

            {/* Headline */}
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              <Box component="span" sx={{
                background: `linear-gradient(135deg, #1e293b, #475569)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
              }}>
                Ready to Transform Your
              </Box>
              <Box component="span" sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
              }}>
                Credit Assessment?
              </Box>
            </Typography>
            
            {/* Subheadline */}
            <Typography variant="body1" sx={{ 
              color: theme.palette.text.secondary, 
              mb: 4,
              maxWidth: 550,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}>
              Join thousands of financial institutions using our AI platform to make smarter, faster credit decisions
            </Typography>

            {/* CTA Button */}
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/predict')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: '1rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.35)}`,
                },
                transition: 'all 0.2s ease',
              }}
            >
              Start Predicting Now
            </Button>
          </Paper>
        </div>
      </Container>

      {/* -------------------------------------------------------------------- */}
      {/* GLOBAL STYLES */}
      {/* -------------------------------------------------------------------- */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        
        .reveal {
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
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

export default Home;