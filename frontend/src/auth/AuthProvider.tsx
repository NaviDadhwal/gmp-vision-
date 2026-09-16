import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokenStore } from './tokenStore';

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

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Support default credentials for demo/standalone preview
    if (email === 'gmpvision3@gmail.com' && pass === 'admin123') {
      const adminUser: AdminUser = {
        id: 'adm_1',
        name: 'Parveen Kumar',
        email: 'gmpvision3@gmail.com',
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
    tokenStore.clear();
    setUser(null);
    localStorage.removeItem('gmp_admin_user');
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
