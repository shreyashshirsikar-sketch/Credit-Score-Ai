// Dashboard.jsx - Updated with better visualizations
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
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TimelineIcon from '@mui/icons-material/Timeline';
import { getModelMetrics, getFeatureImportance } from '../api/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [metricsData, featureData] = await Promise.all([
        getModelMetrics(),
        getFeatureImportance(),
      ]);
      setMetrics(metricsData.metrics);
      setFeatureImportance(featureData.feature_importance || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // Prepare data for charts
  const classPerformanceData = metrics?.classification_report
    ? Object.entries(metrics.classification_report).map(([key, value]) => ({
        class: key,
        precision: value.precision * 100,
        recall: value.recall * 100,
        f1: value['f1-score'] * 100,
      }))
    : [];

  const overallMetrics = [
    { name: 'Accuracy', value: metrics?.accuracy * 100 || 0, icon: <TrendingUpIcon /> },
    { name: 'Precision', value: metrics?.precision * 100 || 0, icon: <AnalyticsIcon /> },
    { name: 'Recall', value: metrics?.recall * 100 || 0, icon: <TimelineIcon /> },
    { name: 'F1-Score', value: metrics?.f1_score * 100 || 0, icon: <TrendingUpIcon /> },
  ];

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" sx={{ fontWeight: 800, mb: 1 }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Real-time insights into model performance and feature importance
        </Typography>
      </Box>

      {/* Overall Metrics */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {overallMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(COLORS[index], 0.05)})`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 24px ${alpha(COLORS[index], 0.1)}`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 3,
                      mr: 2,
                      backgroundColor: alpha(COLORS[index], 0.1),
                      color: COLORS[index],
                    }}
                  >
                    {metric.icon}
                  </Box>
                  <Typography color="textSecondary" sx={{ fontWeight: 600 }}>
                    {metric.name}
                  </Typography>
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                  {metric.value.toFixed(1)}%
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.divider, 0.5),
                      mr: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${metric.value}%`,
                        height: '100%',
                        borderRadius: 3,
                        background: `linear-gradient(90deg, ${COLORS[index]}, ${alpha(COLORS[index], 0.7)})`,
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {metric.value > 85 ? 'Excellent' : metric.value > 75 ? 'Good' : 'Needs Improvement'}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={4}>
        {/* Per-Class Performance */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Per-Class Performance Metrics
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                  <XAxis 
                    dataKey="class" 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value.toFixed(1)}%`, 'Score']}
                    contentStyle={{
                      borderRadius: 8,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="precision" 
                    name="Precision" 
                    radius={[4, 4, 0, 0]}
                    fill={theme.palette.primary.main}
                  />
                  <Bar 
                    dataKey="recall" 
                    name="Recall" 
                    radius={[4, 4, 0, 0]}
                    fill={theme.palette.secondary.main}
                  />
                  <Bar 
                    dataKey="f1" 
                    name="F1-Score" 
                    radius={[4, 4, 0, 0]}
                    fill={theme.palette.success.main}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature Importance Pie */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Top Feature Importance
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={featureImportance.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="importance"
                    label={({ name, value }) => `${name}: ${(value * 100).toFixed(1)}%`}
                  >
                    {featureImportance.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${(value * 100).toFixed(2)}%`, 'Importance']}
                    contentStyle={{
                      borderRadius: 8,
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 3 }}>
                {featureImportance.slice(0, 3).map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: COLORS[index],
                        mr: 2,
                      }}
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {feature.feature}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {(feature.importance * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Feature Importance Table */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Feature Importance Analysis
              </Typography>
              <TableContainer 
                component={Paper}
                sx={{ 
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.04) }}>
                      <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Feature</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Importance</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Percentage</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Impact</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {featureImportance.slice(0, 10).map((feature, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.02),
                          },
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
                              fontWeight: 600,
                            }}
                          >
                            {index + 1}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{feature.feature}</TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="text.secondary">
                            {feature.importance.toFixed(4)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight={600}>
                            {(feature.importance * 100).toFixed(2)}%
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Box
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: alpha(theme.palette.divider, 0.5),
                              overflow: 'hidden',
                              display: 'inline-block',
                              width: 100,
                            }}
                          >
                            <Box
                              sx={{
                                width: `${feature.importance * 100}%`,
                                height: '100%',
                                background: `linear-gradient(90deg, ${COLORS[0]}, ${alpha(COLORS[0], 0.7)})`,
                              }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;