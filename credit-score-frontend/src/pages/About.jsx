// About.jsx - Updated with better layout and styling
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  alpha,
  useTheme,
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ApiIcon from '@mui/icons-material/Api';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SpeedIcon from '@mui/icons-material/Speed';

const About = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: 'Advanced ML Models',
      description: 'Ensemble learning with Random Forest and Gradient Boosting for 95%+ accuracy',
      color: theme.palette.primary.main,
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Analytics',
      description: 'Interactive dashboards with comprehensive performance metrics',
      color: theme.palette.secondary.main,
    },
    {
      icon: <ApiIcon sx={{ fontSize: 40 }} />,
      title: 'Scalable API',
      description: 'High-performance REST API built with FastAPI and async Python',
      color: theme.palette.info.main,
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption and privacy-preserving analysis',
      color: theme.palette.success.main,
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }} />,
      title: 'Modern Stack',
      description: 'React 18 with Material-UI v5 and TypeScript support',
      color: theme.palette.warning.main,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'High Performance',
      description: 'Optimized pipelines delivering results in under 100ms',
      color: theme.palette.error.main,
    },
  ];

  const techStack = [
    { category: 'Frontend', items: 'React 18, Material-UI, Recharts, Axios, Vite' },
    { category: 'Backend', items: 'FastAPI, Python 3.11, Uvicorn, Pydantic' },
    { category: 'Machine Learning', items: 'Scikit-learn, XGBoost, Pandas, NumPy' },
    { category: 'Infrastructure', items: 'Docker, Git, ESLint, Prettier' },
  ];

  const apiEndpoints = [
    { method: 'POST', endpoint: '/predict', description: 'Get credit score prediction with detailed analysis' },
    { method: 'GET', endpoint: '/metrics', description: 'Retrieve model performance metrics and statistics' },
    { method: 'GET', endpoint: '/health', description: 'System health check and status monitoring' },
    { method: 'GET', endpoint: '/features', description: 'Feature importance and model insights' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Intelligent Credit Assessment
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
        >
          Harnessing the power of machine learning to deliver accurate, 
          transparent, and explainable credit scoring solutions.
        </Typography>
      </Box>

      {/* Features Grid */}
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
        Core Features
      </Typography>
      <Grid container spacing={4} sx={{ mb: 10 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${alpha(feature.color, 0.15)}`,
                },
              }}
            >
              <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Technology Stack */}
      <Box sx={{ mb: 10 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
          Technology Stack
        </Typography>
        <Grid container spacing={3}>
          {techStack.map((tech, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.primary.light, 0.05)})`,
                  border: `1px solid ${theme.palette.divider}`,
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.primary.main }}>
                    {tech.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tech.items}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* API Documentation */}
      <Card
        sx={{
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.secondary.light, 0.05)})`,
        }}
      >
        <CardContent sx={{ p: 6 }}>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            API Documentation
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 6, textAlign: 'center' }}>
            Explore our comprehensive REST API for seamless integration
          </Typography>
          
          <Grid container spacing={3}>
            {apiEndpoints.map((endpoint, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    borderColor: theme.palette.divider,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          mr: 3,
                          backgroundColor: 
                            endpoint.method === 'POST' ? alpha(theme.palette.success.main, 0.1) :
                            alpha(theme.palette.info.main, 0.1),
                          color: 
                            endpoint.method === 'POST' ? theme.palette.success.main :
                            theme.palette.info.main,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {endpoint.method}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: 'monospace', color: theme.palette.text.primary }}
                      >
                        {endpoint.endpoint}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {endpoint.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Typography variant="body1" color="text.secondary">
              Full API documentation available at{' '}
              <Typography
                component="a"
                href="http://localhost:8000/docs"
                target="_blank"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                http://localhost:8000/docs
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;