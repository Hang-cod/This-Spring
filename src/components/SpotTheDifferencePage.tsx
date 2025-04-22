// src/components/SpotTheDifferencePage.tsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DiffBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const mockDiffBoxes: DiffBox[] = [
  { x: 80, y: 60, width: 50, height: 50 },
  { x: 200, y: 120, width: 40, height: 40 },
  { x: 320, y: 90, width: 60, height: 60 },
  { x: 150, y: 220, width: 40, height: 40 },
  { x: 270, y: 180, width: 50, height: 50 },
];

const SpotTheDifferencePage: React.FC = () => {
  const [foundIndices, setFoundIndices] = useState<number[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = false;

    mockDiffBoxes.forEach((box, idx) => {
      const withinBox =
        x >= box.x && x <= box.x + box.width &&
        y >= box.y && y <= box.y + box.height;

      if (withinBox && !foundIndices.includes(idx)) {
        setFoundIndices(prev => [...prev, idx]);
        found = true;
      }
    });

    if (!found) setWrongAttempts(prev => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">틀린 그림 찾기</h2>
      <p className="text-center text-red-500 mb-4">오답 횟수: {wrongAttempts}</p>

      <div className="grid grid-cols-2 gap-4">
        <img src="/images/original.png" alt="원본 이미지" className="rounded-lg shadow" />
        
        <div className="relative">
          <img
            src="/images/modified.png"
            alt="수정된 이미지"
            ref={imgRef}
            onClick={handleClick}
            className="rounded-lg shadow cursor-pointer"
          />
          {foundIndices.map((idx) => {
            const box = mockDiffBoxes[idx];
            return (
              <div
                key={idx}
                className="absolute border-4 border-green-500 z-10"
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.width,
                  height: box.height,
                  pointerEvents: 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      {foundIndices.length === mockDiffBoxes.length && (
        <div className="text-center mt-6 text-green-600 font-bold">
          🎉 모든 차이를 찾았어요!
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default SpotTheDifferencePage;
