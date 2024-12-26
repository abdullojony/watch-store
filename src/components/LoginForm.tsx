import React, { useState } from 'react';

interface LoginFormProps {
  onClose: () => void;
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(email, password);
      onClose();
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  );
};

export default LoginForm;