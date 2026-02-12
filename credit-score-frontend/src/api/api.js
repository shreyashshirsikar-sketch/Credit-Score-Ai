import axios from 'axios';

// Set base URL for your FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictCreditScore = async (data) => {
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

export const getHealthStatus = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export const getModelMetrics = async () => {
  try {
    const response = await api.get('/metrics');
    return response.data;
  } catch (error) {
    console.error('Metrics error:', error);
    throw error;
  }
};

export const getFeatureImportance = async () => {
  try {
    const response = await api.get('/feature-importance');
    return response.data;
  } catch (error) {
    console.error('Feature importance error:', error);
    throw error;
  }
};

export const getSampleData = async () => {
  try {
    const response = await api.get('/sample-data');
    return response.data;
  } catch (error) {
    console.error('Sample data error:', error);
    throw error;
  }
};

export default api;