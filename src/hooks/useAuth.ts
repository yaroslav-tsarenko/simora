'use client';

import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'simora_auth';
const WALLET_KEY = 'simora_wallet_balance';

const TEST_USER = {
  email: 'test@gmail.com',
  password: 'test123!',
  name: 'Test User',
};

export interface User {
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    if (email === TEST_USER.email && password === TEST_USER.password) {
      const u: User = { email: TEST_USER.email, name: TEST_USER.name };
      setUser(u);
      localStorage.setItem(AUTH_KEY, JSON.stringify(u));
      if (!localStorage.getItem(WALLET_KEY) || parseFloat(localStorage.getItem(WALLET_KEY)!) === 0) {
        localStorage.setItem(WALLET_KEY, '10000.00');
      }
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  return { user, isAuthenticated: !!user, loaded, login, logout };
}
