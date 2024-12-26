import React, { useState, useMemo } from 'react';
import { ShoppingCart, User, ChevronRight, X, Menu } from 'lucide-react';

// types.ts
export interface Watch {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Watch {
  quantity: number;
}

// components/LoginForm.tsx
interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add authentication logic here
      onClose();
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md"></div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">ВХОД</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="E-mail или номер телефона"
            className="w-full p-3 border rounded bg-gray-100"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 border rounded bg-gray-100"
          />
          <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
            Войти
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
  );
};

// hooks/useCart.ts
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

// components/Cart.tsx
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

// WatchStore.tsx
const WatchStore = () => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const watches: Watch[] = [
    { id: 1, name: 'SPLASH', price: 45000, image: '/images/watches/watch.jpg' },
    { id: 2, name: 'ZEUS', price: 65000, image: '/images/watches/watch.jpg' },
    { id: 3, name: 'CYBER', price: 55000, image: '/images/watches/watch.jpg' },
    { id: 4, name: 'MASTER', price: 47000, image: '/images/watches/watch.jpg' }
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
      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} />}
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

// Workshop Section Component
const Workshop = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Мастерская</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="/images/masters/master.jpg" alt="Команда" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2">Команда</h3>
            <p className="text-gray-600">Наши мастера создают каждое изделие с особым вниманием к деталям</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="/images/masters/master.jpg" alt="Материалы" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2">Уникальные материалы</h3>
            <p className="text-gray-600">Используем только лучшие сорта дерева и качественные механизмы</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="/images/masters/master.jpg" alt="Процесс" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2">Ручная работа</h3>
            <p className="text-gray-600">Каждые часы создаются вручную с использованием традиционных техник</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchStore;

