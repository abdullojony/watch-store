import React, { useState, useMemo } from 'react';
import { ShoppingCart, User, ChevronRight, X, Menu } from 'lucide-react';

import LoginForm from './components/LoginForm.tsx';
import { Watch } from './types/Watch.ts';
import {Cart} from './components/Cart.tsx';
import {useCart} from './hooks/useCart.ts';
import Workshop from './components/WorkShop.tsx';

const WatchStoreApp = () => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const watches: Watch[] = [
    { id: 1, name: 'SPLASH', price: 45000, image: '/images/watches/w2.jpg' },
    { id: 2, name: 'ZEUS', price: 65000, image: '/images/watches/w3.jpg' },
    { id: 3, name: 'CYBER', price: 55000, image: '/images/watches/w4.jpg' },
    { id: 4, name: 'MASTER', price: 47000, image: '/images/watches/w5.jpg' }
  ];

  const handleAddToCart = (watch: Watch) => {
    addToCart(watch);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Часы Ручной Работы</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300">Каталог</a>
            <a href="#" className="hover:text-gray-300">Мастерская</a>
            <a href="#" className="hover:text-gray-300">О нас</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="w-6 h-6" />
            </button>
            <button className="p-2" onClick={() => setIsLoginOpen(true)}>
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/banners/banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="container mx-auto px-4 h-full">
          <div className="relative h-full flex items-center">
        <div className="max-w-2xl space-y-8 text-white">
          <h1 className="text-5xl font-bold leading-tight animate-fade-in">
            СОЗДАЕМ УНИКАЛЬНЫЕ ЧАСЫ РУЧНОЙ РАБОТЫ ИЗ ДЕРЕВА
          </h1>
          <p className="text-xl text-gray-200">
            Каждое изделие - это произведение искусства, созданное с любовью к деталям
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-4 rounded hover:bg-gray-200 transition-all duration-300 flex items-center group">
          СМОТРЕТЬ КАТАЛОГ
          <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded hover:bg-white hover:text-black transition-all duration-300">
          НАША МАСТЕРСКАЯ
            </button>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Watch Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Наши Модели</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {watches.map((watch) => (
              <div key={watch.id} className="bg-white p-6 rounded-lg shadow">
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className="text-xl font-bold">{watch.name}</h3>
                <p className="text-gray-600">{watch.price} ₽</p>
                <button 
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  onClick={() => handleAddToCart(watch)}
                >
                  В КОРЗИНУ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Workshop Section */}
      <Workshop />

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">О Нас</h4>
              <p className="text-gray-400">Создаем уникальные часы ручной работы из дерева</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Контакты</h4>
              <p className="text-gray-400">Email: info@watches.ru</p>
              <p className="text-gray-400">Телефон: +7 (999) 999-99-99</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">VKontakte</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} onSubmit={function (email: string, password: string): Promise<void> {
        throw new Error('Function not implemented.');
      } } />}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default WatchStoreApp;

