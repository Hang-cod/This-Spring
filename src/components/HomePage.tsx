import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: '카드 뒤집기', completed: false },
    { id: 2, text: '틀린 그림 찾기', completed: false },
    { id: 3, text: '그림 의미 서술', completed: false },
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
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {formatDate()}
      </h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">오늘의 활동</h3>
        <ul className="space-y-3">
          {items.map(item => (
            <li 
              key={item.id}
              className="flex items-center space-x-3"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
              />
              <Link 
                to={item.id === 1 ? '/card-game' : '#'} 
                className={`${
                  item.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage; 