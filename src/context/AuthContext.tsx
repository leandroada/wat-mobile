import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  isLoggedIn: boolean | null;
  username: string | null;
  userId: string | null;
  token: string | null;
  login: (username: string, userId: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  username: null,
  userId: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const savedToken = await AsyncStorage.getItem('authToken');
      const savedUsername = await AsyncStorage.getItem('username');
      const savedUserId = await AsyncStorage.getItem('userId');

      if (savedToken && savedUsername && savedUserId) {
        setIsLoggedIn(true);
        setToken(savedToken);
        setUsername(savedUsername);
        setUserId(savedUserId);
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  const login = async (username: string, userId: string, token: string) => {
    await AsyncStorage.multiSet([
      ['authToken', token],
      ['username', username],
      ['userId', userId],
    ]);
    setUsername(username);
    setUserId(userId);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['authToken', 'username', 'userId']);
    setUsername(null);
    setUserId(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, userId, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
