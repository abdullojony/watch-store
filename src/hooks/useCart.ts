import { useState } from 'react';
import { CartItem } from '../types/CartItem.ts';
import {Watch} from '../types/Watch.ts'; 

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    const addToCart = (watch: Watch) => {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === watch.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === watch.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...watch, quantity: 1 }];
      });
    };
  
    const removeFromCart = (id: number) => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    };
  
    const updateQuantity = (id: number, delta: number) => {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        ).filter(item => item.quantity > 0)
      );
    };
  
    return { cartItems, addToCart, removeFromCart, updateQuantity };
  };