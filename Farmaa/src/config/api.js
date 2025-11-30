import axios from 'axios';

// API Base URL Configuration
// Physical device use kar rahe hain? Apna computer IP address use karein
// Windows: ipconfig command se IPv4 address check karein
// Mac/Linux: ifconfig command se IP check karein
// Example: 'http://192.168.1.100:5000/api'

const getBaseURL = () => {
  if (__DEV__) {
    // Development - Emulator ke liye localhost, Physical device ke liye IP address
    // Emulator: localhost kaam karega
    // Physical Device: Apna computer IP use karein (e.g., 'http://192.168.1.100:5000/api')
    return 'http://localhost:5000/api';
    
    // Physical device ke liye uncomment karein aur apna IP dal dein:
    // return 'http://192.168.1.100:5000/api';
  } else {
    // Production
    return 'https://your-production-api.com/api';
  }
};

const API_BASE_URL = getBaseURL();

// Axios instance create karein with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token automatically add hoga
// Note: Token AuthContext me set ho raha hai, yahan sirf header check karte hain
apiClient.interceptors.request.use(
  (config) => {
    // Token already set hai to use karein, nahi to empty
    // Token AuthContext me set hota hai via defaults.headers.common.Authorization
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server ne response diya but error status code
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request bheji but response nahi mila
      console.error('Network Error:', error.request);
    } else {
      // Kuch aur error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default {
  BASE_URL: API_BASE_URL,
  CLIENT: apiClient,
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      SEND_OTP: '/auth/send-otp',
      VERIFY_OTP: '/auth/verify-otp',
      ME: '/auth/me',
    },
    PRODUCTS: '/products',
    ORDERS: '/orders',
    BOOKINGS: '/bookings',
    ADOPTION: '/adoption',
    EMERGENCY: '/emergency',
    SOCIAL: '/social',
    HEALTHCARE: '/healthcare',
    TRAINING: '/training',
    USERS: '/users',
    SERVICE_PROVIDERS: '/service-providers',
    VETERINARIANS: '/veterinarians',
  },
};
