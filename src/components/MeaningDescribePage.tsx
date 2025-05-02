import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// 👉 실제 서버 연동 전, 임시 이미지 URL (public 폴더에 넣어도 OK)
const dummyImage = {
    id: 'img001',
    url: '/images/test_image.jpg', // public/images/test_image.jpg 에 넣으면 됨
};

const MeaningDescribePage: React.FC = () => {
    const [description, setDescription] = useState('');
    // const [emotion, setEmotion] = useState('');
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-start px-4 py-6 min-h-screen bg-pink-50">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                그림을 보고 감정과 의미를 떠올려 보아요 🎨
            </h1>

            {/* 그림 */}
            <div className="w-full max-w-md mb-6 shadow-md rounded-xl overflow-hidden">
                <img
                    src={dummyImage.url}
                    alt="미술치료 그림"
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>

            {/* 의미 서술 */}
            <textarea
                className="w-full max-w-md h-40 p-4 rounded-xl border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white mb-4"
                placeholder="이 그림을 보고 어떤 감정이 들었나요? 어떤 기억이 떠오르나요?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* 감정 입력 */}
            {/* <input
                type="text"
                className="w-full max-w-md p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white mb-6"
                placeholder="감정 단어를 적어주세요 (예: 행복, 슬픔, 편안함)"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
            /> */}

            {/* 기록 완료 버튼 */}
            <button
                disabled={!description.trim()}
                className="w-full max-w-md py-3 bg-pink-500 text-white text-lg font-semibold rounded-xl shadow hover:bg-pink-600 disabled:bg-pink-200 transition-all duration-200"
                onClick={() => {
                    // 👉 백엔드 연동 전, 콘솔 출력만
                    console.log('기록 완료:', {
                        imageId: dummyImage.id,
                        description,
                        // emotion,
                    });
                    navigate('/home');
                }}
            >
                기록 완료
            </button>
        </div>
    );
};

export default MeaningDescribePage;
