import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">오늘도 봄이 왔어요 ✨</h1>
      <button 
        className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        onClick={() => navigate('/home')}
      >
        시작하기
      </button>
    </div>
  );
};

export default StartPage; 