import React from "react";

const Workshop = () => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Мастерская</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <img src="/images/masters/m4.jpeg" alt="Команда" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-bold mb-2">Команда</h3>
              <p className="text-gray-600">Наши мастера создают каждое изделие с особым вниманием к деталям</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <img src="/images/masters/master.jpg" alt="Материалы" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-bold mb-2">Уникальные материалы</h3>
              <p className="text-gray-600">Используем только лучшие сорта дерева и качественные механизмы</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <img src="/images/masters/m5.jpg" alt="Процесс" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xl font-bold mb-2">Ручная работа</h3>
              <p className="text-gray-600">Каждые часы создаются вручную с использованием традиционных техник</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default Workshop;