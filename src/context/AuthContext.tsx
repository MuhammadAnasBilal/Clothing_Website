import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, Order, Address } from '../types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateUser: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'u1',
  name: 'Ayesha Ahmed',
  email: 'ayesha@example.com',
  phone: '+92 300 1234567',
  addresses: [
    {
      id: 'a1',
      fullName: 'Ayesha Ahmed',
      phone: '+92 300 1234567',
      city: 'Lahore',
      address: 'House 42, Street 7, DHA Phase 5',
      postalCode: '54000',
      isDefault: true,
    },
  ],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('heritage-user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('heritage-orders');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    if (user) localStorage.setItem('heritage-user', JSON.stringify(user));
    else localStorage.removeItem('heritage-user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('heritage-orders', JSON.stringify(orders));
  }, [orders]);

  const login = useCallback((_email: string, _password: string) => {
    setUser(DEMO_USER);
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    setUser({ ...DEMO_USER, name, email, id: 'u-' + Date.now() });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  }, []);

  const addAddress = useCallback((address: Address) => {
    setUser(prev => prev ? { ...prev, addresses: [...prev.addresses, address] } : null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn: !!user, login, register, logout,
      orders, addOrder, updateUser, addAddress,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
