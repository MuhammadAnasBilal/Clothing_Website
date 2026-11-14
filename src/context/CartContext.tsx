import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItem, Product, ProductColor } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color: ProductColor, quantity?: number) => void;
  removeItem: (productId: string, colorName: string) => void;
  updateQuantity: (productId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 250;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('heritage-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [couponCode, setCouponCode] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('heritage-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, color: ProductColor, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedColor.name === color.name
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedColor.name === color.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, selectedColor: color, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, colorName: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedColor.name === colorName)
    ));
  }, []);

  const updateQuantity = useCallback((productId: string, colorName: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(item =>
      item.product.id === productId && item.selectedColor.name === colorName
        ? { ...item, quantity }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode('');
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = couponCode === 'HERITAGE10' ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const applyCoupon = useCallback((code: string) => {
    const upper = code.toUpperCase().trim();
    if (upper === 'HERITAGE10') {
      setCouponCode(upper);
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => setCouponCode(''), []);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      itemCount, subtotal, shipping, discount, total,
      couponCode, applyCoupon, removeCoupon,
      isCartOpen, setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
