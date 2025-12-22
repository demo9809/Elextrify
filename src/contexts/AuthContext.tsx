import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'tenant-user' | 'saas-admin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dooh_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('dooh_user');
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: role === 'tenant-user' ? 'tenant-001' : 'admin-001',
      email,
      name: role === 'tenant-user' ? 'Sarah Khan' : 'Admin User',
      role,
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('dooh_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dooh_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
