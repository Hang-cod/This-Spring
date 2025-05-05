// 📁 src/components/describe/MeaningDescribeComponent.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 👉 실제 서버 연동 전, 임시 이미지 URL
const dummyImage = {
    id: 'img001',
    url: '/images/test_image.jpg',
};

const MeaningDescribeComponent: React.FC = () => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-start px-4 py-6 min-h-screen bg-pink-50">
            {/* 🖼️ 타이틀 */}
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                그림을 보고 감정과 의미를 떠올려 보아요 🎨
            </h1>

            {/* 🖼️ 이미지 */}
            <div className="w-full max-w-md mb-6 shadow-md rounded-xl overflow-hidden">
                <img
                    src={dummyImage.url}
                    alt="미술치료 그림"
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>

            {/* ✍️ 의미 서술 */}
            <textarea
                className="w-full max-w-md h-40 p-4 rounded-xl border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white mb-4"
                placeholder="이 그림을 보고 어떤 감정이 들었나요? 어떤 기억이 떠오르나요?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* ✅ 기록 완료 버튼 */}
            <button
                disabled={!description}
                className="w-full max-w-md py-3 bg-pink-500 text-white text-lg font-semibold rounded-xl shadow hover:bg-pink-600 disabled:bg-pink-200 transition-all duration-200"
                onClick={() => {
                    console.log('기록 완료:', {
                        imageId: dummyImage.id,
                        description,
                    });
                    localStorage.setItem('meaning-describe-done', 'true');
                    alert('기록이 저장되었어요!');
                    navigate('/home');
                }}
            >
                기록 완료
            </button>
        </div>
    );
};

export default MeaningDescribeComponent;
