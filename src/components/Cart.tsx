import { useMemo } from 'react';
import {CartItem} from '../types/CartItem.ts';
import { X } from 'lucide-react';
import React from 'react';

interface CartProps {
    onClose: () => void;
    items: CartItem[];
    updateQuantity: (id: number, delta: number) => void;
  }
  
  export const Cart: React.FC<CartProps> = ({ onClose, items, updateQuantity }) => {
    const total = useMemo(() => 
      items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      [items]
    );
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Корзина</h2>
            <button onClick={onClose} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">{item.price} ₽</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-2 py-1 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button className="px-2 py-1 border rounded">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Итого:</span>
              <span className="font-bold">{total} ₽</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    );
  };