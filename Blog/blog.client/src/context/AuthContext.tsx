import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  token: string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = 'https://localhost:7144';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storageToken = localStorage.getItem('token');
    if (storageToken && storageToken !== '') {
      setToken(storageToken);
      setIsLoggedIn(true);
    }
  }, [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${BASE_URL}/api/Account/login`, {
        username: username,
        password: password
      }, );
      if(response.status === 200) {
        console.log(response.data.token);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        return true;
      } else {
        throw new Error('Invalid email or password');
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn, login, token, logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
