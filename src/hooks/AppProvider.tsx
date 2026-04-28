'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useWallet } from './useWallet';
import { useCurrency } from './useCurrency';
import { useCart, CartItem } from './useCart';
import { useAuth, User } from './useAuth';
import { usePurchaseHistory, PurchaseRecord } from './usePurchaseHistory';
import { Currency } from '@/types';

interface AppContextType {
  balance: number;
  walletLoaded: boolean;
  topUp: (amount: number) => void;
  spend: (amount: number) => boolean;
  canAfford: (amount: number) => boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cartItems: CartItem[];
  cartLoaded: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (planId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isAuthenticated: boolean;
  user: User | null;
  authLoaded: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  purchases: PurchaseRecord[];
  addPurchase: (item: Omit<PurchaseRecord, 'id' | 'purchasedAt' | 'status'>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const wallet = useWallet();
  const curr = useCurrency();
  const cart = useCart();
  const auth = useAuth();
  const history = usePurchaseHistory();

  return (
    <AppContext.Provider
      value={{
        balance: wallet.balance,
        walletLoaded: wallet.loaded,
        topUp: wallet.topUp,
        spend: wallet.spend,
        canAfford: wallet.canAfford,
        currency: curr.currency,
        setCurrency: curr.setCurrency,
        cartItems: cart.items,
        cartLoaded: cart.loaded,
        addToCart: cart.addItem,
        removeFromCart: cart.removeItem,
        clearCart: cart.clearCart,
        cartTotal: cart.total,
        cartCount: cart.count,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        authLoaded: auth.loaded,
        login: auth.login,
        logout: auth.logout,
        purchases: history.purchases,
        addPurchase: history.addPurchase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
