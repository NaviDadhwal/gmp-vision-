import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokenStore } from './tokenStore';
import { env } from '../lib/env';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    // Check local session state for standalone preview mode
    const cached = localStorage.getItem('gmp_admin_user');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        tokenStore.set('mock_demo_jwt_token');
        return parsed;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Silent session restore on app mount
  useEffect(() => {
    const restoreSession = async () => {
      const savedRefreshToken = localStorage.getItem('gmp_refresh_token');
      if (savedRefreshToken) {
        try {
          const res = await fetch(`${env.VITE_API_BASE_URL}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: savedRefreshToken }),
            credentials: 'include',
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data?.accessToken) {
              tokenStore.set(data.data.accessToken);
              if (data.data.refreshToken) {
                localStorage.setItem('gmp_refresh_token', data.data.refreshToken);
              }
              const meRes = await fetch(`${env.VITE_API_BASE_URL}/api/v1/auth/me`, {
                headers: { Authorization: `Bearer ${data.data.accessToken}` },
              });
              if (meRes.ok) {
                const meData = await meRes.json();
                setUser(meData.data);
                localStorage.setItem('gmp_admin_user', JSON.stringify(meData.data));
              }
            }
          }
        } catch {
          // Gracefully retain cached offline user if backend is unreachable
        }
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // 1. Attempt live backend authentication first
    try {
      const res = await fetch(`${env.VITE_API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: pass }),
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.accessToken) {
          tokenStore.set(data.data.accessToken);
          if (data.data.refreshToken) {
            localStorage.setItem('gmp_refresh_token', data.data.refreshToken);
          }
          const adminUser: AdminUser = {
            id: data.data.admin.id,
            name: data.data.admin.name,
            email: data.data.admin.email,
            role: data.data.admin.role,
          };
          setUser(adminUser);
          localStorage.setItem('gmp_admin_user', JSON.stringify(adminUser));
          return true;
        }
      }
    } catch {
      // Backend unreachable; proceed to verify standalone credentials
    }

    // 2. Fallback demo credentials for standalone testing / offline preview
    if (
      (email === 'admin@gmpvision.com' && pass === 'Admin@GMPVision2026!') ||
      (email === 'gmpvision3@gmail.com' && pass === 'admin123')
    ) {
      const adminUser: AdminUser = {
        id: 'adm_1',
        name: 'Parveen Kumar',
        email: email,
        role: 'superadmin',
      };
      tokenStore.set('mock_jwt_access_token_superadmin');
      setUser(adminUser);
      localStorage.setItem('gmp_admin_user', JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    const currentToken = tokenStore.get();
    if (currentToken && !currentToken.startsWith('mock_')) {
      fetch(`${env.VITE_API_BASE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).catch(() => {});
    }
    tokenStore.clear();
    setUser(null);
    localStorage.removeItem('gmp_admin_user');
    localStorage.removeItem('gmp_refresh_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
