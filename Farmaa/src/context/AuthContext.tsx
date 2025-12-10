import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  sendOTP: (phone: string) => Promise<string>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        // Set token in axios instance
        api.CLIENT.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting login for:', email);
      console.log('🌐 API URL:', api.BASE_URL + api.ENDPOINTS.AUTH.LOGIN);
      
      const response = await api.CLIENT.post(api.ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log('✅ Login response:', response.data);

      const { token: newToken, user: userData } = response.data;
      
      if (!newToken || !userData) {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
      
      setToken(newToken);
      setUser(userData);
      
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      // Set token in axios instance for future requests
      api.CLIENT.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      
      console.log('✅ Login successful, token stored');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      console.error('❌ Login error:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
        networkError: !error.response && error.message,
      });
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      console.log('📝 Attempting registration for:', email);
      console.log('🌐 API URL:', api.BASE_URL + api.ENDPOINTS.AUTH.REGISTER);
      
      const response = await api.CLIENT.post(api.ENDPOINTS.AUTH.REGISTER, {
        name,
        email,
        password,
        phone,
      });

      console.log('✅ Registration response:', response.data);

      const { token: newToken, user: userData } = response.data;
      
      if (!newToken || !userData) {
        console.error('❌ Invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
      
      setToken(newToken);
      setUser(userData);
      
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      // Set token in axios instance for future requests
      api.CLIENT.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      
      console.log('✅ Registration successful, token stored');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      console.error('❌ Registration error:', {
        message: errorMessage,
        status: error.response?.status,
        data: error.response?.data,
        networkError: !error.response && error.message,
      });
      throw new Error(errorMessage);
    }
  };

  const sendOTP = async (phone: string) => {
    try {
      console.log('📱 Sending OTP to:', phone);
      
      // Development bypass - any 10-digit number works
      if (__DEV__ && phone.length === 10) {
        console.log('✅ Development mode: OTP bypassed');
        // Return a mock OTP (any 6 digits will work in verifyOTP)
        return '123456';
      }
      
      const response = await api.CLIENT.post(api.ENDPOINTS.AUTH.SEND_OTP, {
        phone,
      });

      console.log('✅ OTP sent:', response.data);
      
      // Return OTP for development (remove in production)
      return response.data.otp || '';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send OTP';
      console.error('❌ Send OTP error:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      console.log('🔐 Verifying OTP for:', phone);
      
      // Development bypass - any 6-digit OTP works
      if (__DEV__ && otp.length === 6) {
        console.log('✅ Development mode: OTP bypassed');
        const mockToken = 'dev_token_' + Date.now();
        const mockUser = {
          id: 'dev_user_1',
          name: 'Dev User',
          email: phone + '@dev.com',
          role: 'user',
        };
        
        setToken(mockToken);
        setUser(mockUser);
        
        await AsyncStorage.setItem('token', mockToken);
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        
        api.CLIENT.defaults.headers.common.Authorization = `Bearer ${mockToken}`;
        
        console.log('✅ Development OTP verification successful');
        return;
      }
      
      const response = await api.CLIENT.post(api.ENDPOINTS.AUTH.VERIFY_OTP, {
        phone,
        otp,
      });

      console.log('✅ OTP verified:', response.data);

      const { token: newToken, user: userData } = response.data;
      
      if (!newToken || !userData) {
        throw new Error('Invalid response from server');
      }
      
      setToken(newToken);
      setUser(userData);
      
      await AsyncStorage.setItem('token', newToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      
      api.CLIENT.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      
      console.log('✅ OTP verification successful, token stored');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'OTP verification failed';
      console.error('❌ Verify OTP error:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      delete api.CLIENT.defaults.headers.common.Authorization;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        sendOTP,
        verifyOTP,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

