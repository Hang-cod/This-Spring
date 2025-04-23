// src/components/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ChecklistItem {
  id: number;
  text: string;
  path: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: '카드 뒤집기', path: '/card-game', completed: false },
    { id: 2, text: '틀린 그림 찾기', path: '/spot-diff', completed: false },
    { id: 3, text: '그림 의미 서술', path: '#', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-md mx-auto bg-sakura-base">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-sakura-brown">
        {formatDate()}
      </h2>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-sakura-brown">오늘의 활동</h3>

        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItem(item.id)}
                  className="w-5 h-5 text-cherry-dark rounded focus:ring-cherry-dark"
                />
                <span
                  className={`text-base sm:text-lg ${item.completed ? 'line-through text-gray-400' : 'text-sakura-brown'
                    }`}
                >
                  {item.text}
                </span>
              </label>

              {item.path !== '#' && (
                <Link
                  to={item.path}
                  className="text-sm px-3 py-1 bg-cherry DEFAULT text-white rounded-md hover:bg-cherry-dark transition-colors"
                >
                  이동
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
