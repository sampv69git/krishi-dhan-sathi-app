
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phoneNumber: string, verificationCode: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would call Firebase Auth
      console.log('Logging in with:', email, password);
      
      // Mock successful login
      setUser({
        id: '1',
        email: email,
        displayName: email.split('@')[0],
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhone = async (phoneNumber: string, verificationCode: string) => {
    setLoading(true);
    try {
      // In a real app, this would verify OTP with Firebase Auth
      console.log('Logging in with phone:', phoneNumber, verificationCode);
      
      // Mock successful login
      setUser({
        id: '2',
        phoneNumber: phoneNumber,
        displayName: 'Phone User',
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Phone login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      // In a real app, this would create a new user with Firebase Auth
      console.log('Registering with:', email, password, displayName);
      
      // Mock successful registration
      setUser({
        id: '3',
        email: email,
        displayName: displayName,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // In a real app, this would sign out from Firebase Auth
      console.log('Logging out');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    // In a real app, this would check Firebase Auth state
    const checkAuth = () => {
      // For demo purposes, we'll just set loading to false
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    loginWithPhone,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
