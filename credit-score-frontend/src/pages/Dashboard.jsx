// Dashboard.jsx - Premium Glass UI with Advanced Visualizations
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  alpha,
  useTheme,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip as MuiTooltip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { getModelMetrics, getFeatureImportance } from '../api/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const theme = useTheme();

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [metricsData, featureData] = await Promise.all([
        getModelMetrics(),
        getFeatureImportance(),
      ]);
      setMetrics(metricsData.metrics);
      setFeatureImportance(featureData.feature_importance || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (value, threshold = 75) => {
    if (value > threshold) return <TrendingUpIcon sx={{ color: theme.palette.success.main }} />;
    if (value < threshold - 15) return <TrendingDownIcon sx={{ color: theme.palette.error.main }} />;
    return <TrendingFlatIcon sx={{ color: theme.palette.warning.main }} />;
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CircularProgress 
            size={80} 
            thickness={4} 
            sx={{ 
              color: theme.palette.primary.main,
              position: 'relative',
            }} 
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <AnalyticsIcon sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
          </Box>
        </Box>
        <Typography variant="h6" sx={{ mt: 3, fontWeight: 500, color: theme.palette.text.secondary }}>
          Loading dashboard analytics...
        </Typography>
      </Box>
    );
  }

  // Prepare data for charts
  const classPerformanceData = metrics?.classification_report
    ? Object.entries(metrics.classification_report).map(([key, value]) => ({
        class: key,
        precision: Number((value.precision * 100).toFixed(1)),
        recall: Number((value.recall * 100).toFixed(1)),
        f1: Number((value['f1-score'] * 100).toFixed(1)),
      }))
    : [];

  const overallMetrics = [
    { 
      name: 'Accuracy', 
      value: metrics?.accuracy * 100 || 0, 
      icon: <SpeedIcon />,
      description: 'Overall model accuracy across all predictions',
      color: theme.palette.primary.main,
    },
    { 
      name: 'Precision', 
      value: metrics?.precision * 100 || 0, 
      icon: <AnalyticsIcon />,
      description: 'Positive predictive value - how precise the positive predictions are',
      color: theme.palette.secondary.main,
    },
    { 
      name: 'Recall', 
      value: metrics?.recall * 100 || 0, 
      icon: <TimelineIcon />,
      description: 'True positive rate - how well the model captures positive cases',
      color: theme.palette.success.main,
    },
    { 
      name: 'F1-Score', 
      value: metrics?.f1_score * 100 || 0, 
      icon: <AssessmentIcon />,
      description: 'Harmonic mean of precision and recall',
      color: theme.palette.warning.main,
    },
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
  ];

  // Radar chart data for model performance
  const radarData = classPerformanceData.slice(0, 3).map(item => ({
    class: item.class,
    precision: item.precision,
    recall: item.recall,
    f1: item.f1,
  }));

  // Time series mock data (replace with real data)
  const performanceTrend = [
    { month: 'Jan', accuracy: 92, precision: 88, recall: 85, f1: 86 },
    { month: 'Feb', accuracy: 93, precision: 89, recall: 86, f1: 87 },
    { month: 'Mar', accuracy: 94, precision: 90, recall: 87, f1: 88 },
    { month: 'Apr', accuracy: 94, precision: 91, recall: 88, f1: 89 },
    { month: 'May', accuracy: 95, precision: 92, recall: 89, f1: 90 },
    { month: 'Jun', accuracy: 96, precision: 93, recall: 91, f1: 92 },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.97)} 0%, ${alpha(theme.palette.primary.light, 0.03)} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 70%)`,
        animation: 'pulse 15s ease-in-out infinite',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.03)} 0%, transparent 70%)`,
        animation: 'pulse 20s ease-in-out infinite reverse',
      }} />

      <Container maxWidth="xl" sx={{ py: 6, position: 'relative' }}>
        {/* Header with glass effect */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 4,
            background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 1,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Analytics Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                Real-time insights into model performance and feature importance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 2 }}>
                <Chip 
                  icon={<SecurityIcon />} 
                  label="Enterprise Grade" 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    fontWeight: 600,
                  }}
                />
                <Chip 
                  icon={<TimelineIcon />} 
                  label={`Last updated: ${lastUpdated.toLocaleTimeString()}`} 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <MuiTooltip title="Refresh data">
                <IconButton 
                  onClick={fetchDashboardData}
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </MuiTooltip>
              <MuiTooltip title="Export report">
                <IconButton
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiTooltip>
              <MuiTooltip title="More options">
                <IconButton
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </MuiTooltip>
            </Box>
          </Box>
        </Paper>

        {/* Overall Metrics with Glass Effect */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {overallMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: '100%',
                  background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 32px ${alpha(metric.color, 0.15)}`,
                    border: `1px solid ${alpha(metric.color, 0.3)}`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${metric.color}, ${alpha(metric.color, 0.3)})`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      backgroundColor: alpha(metric.color, 0.1),
                      color: metric.color,
                      display: 'inline-flex',
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <MuiTooltip title={metric.description}>
                    <InfoOutlinedIcon sx={{ color: theme.palette.text.secondary, fontSize: 18, opacity: 0.6 }} />
                  </MuiTooltip>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                  {metric.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, mr: 1 }}>
                    {metric.value.toFixed(1)}%
                  </Typography>
                  {getTrendIcon(metric.value)}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: alpha(metric.color, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: `linear-gradient(90deg, ${metric.color}, ${alpha(metric.color, 0.7)})`,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: metric.color }}>
                    {metric.value > 85 ? 'Excellent' : metric.value > 75 ? 'Good' : 'Needs Work'}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={4}>
          {/* Per-Class Performance Bar Chart */}
          <Grid item xs={12} lg={7}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                height: '100%',
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Per-Class Performance
                </Typography>
                <Chip 
                  label="Classification Report" 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={classPerformanceData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={alpha(theme.palette.divider, 0.3)}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="class" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value.toFixed(1)}%`, 'Score']}
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      backgroundColor: alpha(theme.palette.background.paper, 0.95),
                      backdropFilter: 'blur(8px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: 20,
                    }}
                  />
                  <Bar 
                    dataKey="precision" 
                    name="Precision" 
                    radius={[6, 6, 0, 0]}
                    fill={theme.palette.primary.main}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                  <Bar 
                    dataKey="recall" 
                    name="Recall" 
                    radius={[6, 6, 0, 0]}
                    fill={theme.palette.secondary.main}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                  <Bar 
                    dataKey="f1" 
                    name="F1-Score" 
                    radius={[6, 6, 0, 0]}
                    fill={theme.palette.success.main}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Feature Importance Donut Chart */}
          <Grid item xs={12} lg={5}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                height: '100%',
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Top Feature Importance
                </Typography>
                <Chip 
                  label="Top 5 Features" 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featureImportance.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="importance"
                    label={({ name, value }) => `${name || 'Feature'} (${(value * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: theme.palette.text.secondary, strokeWidth: 1 }}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  >
                    {featureImportance.slice(0, 5).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        style={{ filter: `drop-shadow(0 4px 8px ${alpha(COLORS[index], 0.2)})` }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${(value * 100).toFixed(2)}%`, 'Importance']}
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      backgroundColor: alpha(theme.palette.background.paper, 0.95),
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 4 }}>
                {featureImportance.slice(0, 5).map((feature, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: alpha(COLORS[index], 0.05),
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: alpha(COLORS[index], 0.1),
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: COLORS[index],
                        mr: 2,
                        boxShadow: `0 0 12px ${alpha(COLORS[index], 0.5)}`,
                      }}
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 500 }}>
                      {feature.feature || feature.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={700} color={COLORS[index]}>
                      {(feature.importance * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Performance Trend Line Chart */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Performance Trend
                </Typography>
                <Chip 
                  label="6 Month History" 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceTrend}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={alpha(theme.palette.divider, 0.3)}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary }}
                    domain={[80, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      backgroundColor: alpha(theme.palette.background.paper, 0.95),
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke={theme.palette.primary.main} 
                    strokeWidth={3}
                    dot={{ r: 6, fill: theme.palette.primary.main }}
                    activeDot={{ r: 8 }}
                    animationDuration={2000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="precision" 
                    stroke={theme.palette.secondary.main} 
                    strokeWidth={3}
                    dot={{ r: 6, fill: theme.palette.secondary.main }}
                    activeDot={{ r: 8 }}
                    animationDuration={2000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="recall" 
                    stroke={theme.palette.success.main} 
                    strokeWidth={3}
                    dot={{ r: 6, fill: theme.palette.success.main }}
                    activeDot={{ r: 8 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Radar Chart for Class Comparison */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Class Performance Radar
                </Typography>
                <Chip 
                  label="Top 3 Classes" 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid 
                    stroke={alpha(theme.palette.divider, 0.5)}
                    radialLines={false}
                  />
                  <PolarAngleAxis 
                    dataKey="class" 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]}
                    tick={{ fill: theme.palette.text.secondary }}
                    axisLine={false}
                  />
                  <Radar 
                    name="Precision" 
                    dataKey="precision" 
                    stroke={theme.palette.primary.main} 
                    fill={theme.palette.primary.main} 
                    fillOpacity={0.3}
                  />
                  <Radar 
                    name="Recall" 
                    dataKey="recall" 
                    stroke={theme.palette.secondary.main} 
                    fill={theme.palette.secondary.main} 
                    fillOpacity={0.3}
                  />
                  <Radar 
                    name="F1" 
                    dataKey="f1" 
                    stroke={theme.palette.success.main} 
                    fill={theme.palette.success.main} 
                    fillOpacity={0.3}
                  />
                  <Legend />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      backgroundColor: alpha(theme.palette.background.paper, 0.95),
                      backdropFilter: 'blur(8px)',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Feature Importance Table */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.7)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Feature Importance Analysis
                </Typography>
                <Chip 
                  label="Top 10 Features" 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <TableContainer 
                component={Paper}
                sx={{ 
                  borderRadius: 3,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  overflow: 'hidden',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      borderBottom: `2px solid ${alpha(theme.palette.divider, 0.2)}`,
                    }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Rank</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Feature</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Importance Score</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Contribution</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Impact Level</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {featureImportance.slice(0, 10).map((feature, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:hover': {
                            backgroundColor: alpha(COLORS[index % COLORS.length], 0.04),
                          },
                          transition: 'all 0.2s ease',
                          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: index < 3 ? alpha(COLORS[index], 0.1) : alpha(theme.palette.divider, 0.3),
                              color: index < 3 ? COLORS[index] : theme.palette.text.secondary,
                              fontWeight: 700,
                              fontSize: '0.875rem',
                            }}
                          >
                            {index + 1}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {feature.feature || feature.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                            {feature.importance.toFixed(4)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 700, color: COLORS[index % COLORS.length] }}>
                            {(feature.importance * 100).toFixed(2)}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ flexGrow: 1, maxWidth: 120 }}>
                              <LinearProgress
                                variant="determinate"
                                value={feature.importance * 100}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: alpha(COLORS[index % COLORS.length], 0.1),
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 3,
                                    background: `linear-gradient(90deg, ${COLORS[index % COLORS.length]}, ${alpha(COLORS[index % COLORS.length], 0.7)})`,
                                  },
                                }}
                              />
                            </Box>
                            <Chip
                              label={feature.importance > 0.15 ? 'High' : feature.importance > 0.08 ? 'Medium' : 'Low'}
                              size="small"
                              sx={{
                                height: 24,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                backgroundColor: alpha(
                                  feature.importance > 0.15 
                                    ? theme.palette.success.main 
                                    : feature.importance > 0.08 
                                    ? theme.palette.warning.main 
                                    : theme.palette.info.main,
                                  0.1
                                ),
                                color: feature.importance > 0.15 
                                  ? theme.palette.success.main 
                                  : feature.importance > 0.08 
                                  ? theme.palette.warning.main 
                                  : theme.palette.info.main,
                              }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Animation keyframes */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>
      </Container>
    </Box>
  );
};

export default Dashboard;