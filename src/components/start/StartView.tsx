// 📁 src/components/start/StartView.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const StartView: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-100 to-white px-4">
            <h1 className="text-4xl font-bold text-sakura-brown mb-8 text-center drop-shadow-sm">
                This Spring 🌸
            </h1>
            <p className="text-lg text-sakura-brown mb-10 text-center">
                기억력과 감정을 회복하는 오늘의 루틴을 시작해요.
            </p>
            <Link
                to="/home"
                className="px-8 py-3 bg-cherry text-white rounded-full text-lg shadow hover:bg-cherry-dark transition-colors"
            >
                시작하기
            </Link>
        </div>
    );
};

export default StartView;
