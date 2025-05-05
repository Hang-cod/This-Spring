// 📁 src/components/spotdifference/SpotTheDifferenceGame.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImageForInpaint } from '../../api/inpaintApi';
import type { DiffBox } from '../../api/inpaintApi';

// 🌐 API 서버 주소
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const SpotTheDifferenceGame: React.FC = () => {
    // 📦 상태 정의
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [modifiedImageUrl, setModifiedImageUrl] = useState<string | null>(null);
    const [diffBox, setDiffBox] = useState<DiffBox | null>(null);
    const [found, setFound] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [wrongClicks, setWrongClicks] = useState<{ x: number; y: number }[]>([]);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const navigate = useNavigate();

    // 📸 파일 업로드
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setOriginalImageUrl(URL.createObjectURL(file));
            setGameStarted(false);
            setFound(false);
            setWrongAttempts(0);
            setModifiedImageUrl(null);
            setWrongClicks([]);
        }
    };

    // 🤖 AI 요청 후 게임 시작
    const handleStartGame = async () => {
        if (!uploadedFile) return;
        const result = await uploadImageForInpaint(uploadedFile);
        setModifiedImageUrl(`${API_BASE_URL}${result.modified}`);
        setOriginalImageUrl(`${API_BASE_URL}${result.original}`);
        setDiffBox(result.diffBox);
        setGameStarted(true);
        setFound(false);
        setWrongAttempts(0);
        setWrongClicks([]);
    };

    // ✅ 클릭 판정
    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!imgRef.current || !diffBox || found) return;

        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = imgRef.current.naturalWidth / rect.width;
        const scaleY = imgRef.current.naturalHeight / rect.height;

        const clickedX = x * scaleX;
        const clickedY = y * scaleY;

        const withinBox =
            clickedX >= diffBox.x &&
            clickedX <= diffBox.x + diffBox.width &&
            clickedY >= diffBox.y &&
            clickedY <= diffBox.y + diffBox.height;

        if (withinBox) {
            setFound(true);
        } else {
            setWrongAttempts((prev) => prev + 1);
            const wrongX = (x / rect.width) * imgRef.current.naturalWidth;
            const wrongY = (y / rect.height) * imgRef.current.naturalHeight;
            setWrongClicks(prev => [...prev, { x: wrongX, y: wrongY }]);
            navigator.vibrate?.(100);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-sakura-brown">
                틀린 그림 찾기
            </h2>

            {/* 🔽 파일 선택 */}
            <div className="text-center mb-6">
                <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* ▶ 시작 전: 원본만 보여줌 */}
            {originalImageUrl && !gameStarted && (
                <div className="text-center">
                    <img src={originalImageUrl} alt="업로드 원본" className="rounded-xl mx-auto shadow" />
                    <button
                        onClick={handleStartGame}
                        className="mt-6 px-6 py-3 bg-pink-500 text-white text-lg rounded-lg shadow hover:bg-pink-600 transition"
                    >
                        틀린 그림 만들기 시작
                    </button>
                </div>
            )}

            {/* 🎮 게임 진행 중 */}
            {gameStarted && originalImageUrl && modifiedImageUrl && (
                <>
                    <p className="text-center text-red-500 mt-6 mb-4 font-medium">
                        오답 횟수: {wrongAttempts}
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <img src={originalImageUrl} alt="원본" className="rounded-lg shadow" />
                        <div className="relative">
                            <img
                                ref={imgRef}
                                src={modifiedImageUrl}
                                alt="수정본"
                                onClick={handleClick}
                                className="rounded-lg shadow cursor-pointer"
                            />
                            {/* ❌ 오답 클릭 표시 */}
                            {wrongClicks.map((click, index) => (
                                <div
                                    key={index}
                                    className="absolute text-red-500 text-3xl font-bold opacity-70"
                                    style={{
                                        left: (click.x / imgRef.current!.naturalWidth) * imgRef.current!.width - 10,
                                        top: (click.y / imgRef.current!.naturalHeight) * imgRef.current!.height - 10,
                                        pointerEvents: 'none',
                                        transform: 'rotate(-20deg)',
                                    }}
                                >
                                    ✖
                                </div>
                            ))}
                            {/* 🟢 정답 박스 표시 */}
                            {found && diffBox && imgRef.current && (
                                <div
                                    className="absolute border-4 border-green-400 z-10 transition-all"
                                    style={{
                                        left: (diffBox.x / imgRef.current.naturalWidth) * imgRef.current.width,
                                        top: (diffBox.y / imgRef.current.naturalHeight) * imgRef.current.height,
                                        width: (diffBox.width / imgRef.current.naturalWidth) * imgRef.current.width,
                                        height: (diffBox.height / imgRef.current.naturalHeight) * imgRef.current.height,
                                        borderRadius: '50%',
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* 🎉 성공 메시지 */}
            {found && (
                <div className="flex flex-col justify-center items-center mt-8 gap-4">
                    <div className="text-green-600 font-extrabold text-xl">
                        🎉 정답이에요 봄이!
                    </div>
                    <button
                        onClick={() => navigate('/home')}
                        className="px-6 py-3 bg-sakura-button text-white rounded-full hover:bg-sakura-button-dark text-lg transition shadow-lg"
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpotTheDifferenceGame;
