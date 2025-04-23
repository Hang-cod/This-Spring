// src/components/SpotTheDifferencePage.tsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImageForInpaint } from '../api/inpaintApi';
import type { DiffBox } from '../api/inpaintApi'; // DiffBox 타입을 import



//틀린 그림 찾기에서 클릭한 좌표와 비교할 더미 데이터
// const mockDiffBoxes: DiffBox[] = [
//   { x: 80, y: 60, width: 50, height: 50 },
//   { x: 200, y: 120, width: 40, height: 40 },
//   { x: 320, y: 90, width: 60, height: 60 },
//   { x: 150, y: 220, width: 40, height: 40 },
//   { x: 270, y: 180, width: 50, height: 50 },
// ];

//CRA와는 다름. .env에 링크를 넣어줘야하고 env를 읽으려면 vite-env.d.ts에 타입을 정의해줘야함
// + .env 파일에 변수는 반드시 `VITE_` 접두사를 붙여야 인식됨.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

//틀린 그림 찾기 페이지 컴포넌트
const SpotTheDifferencePage: React.FC = () => {
  
  const [diffBox, setDiffBox] = useState<DiffBox | null>(null); // 정답 박스 하나를 저장하는 상태
  const [found, setFound] = useState(false); // 정답을 맞췄는지 여부
  const [wrongAttempts, setWrongAttempts] = useState(0); // 오답 횟수
  const [modifiedImageUrl, setModifiedImageUrl] = useState<string | null>(null); // 수정된 이미지 URL
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null); // 원본 이미지 URL
  const imgRef = useRef<HTMLImageElement | null>(null); // 이미지 요소 참조
  const navigate = useNavigate(); // 페이지 이동 함수

  //이미지 클릭시 정답 박스랑 비교  
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
  
    if (!imgRef.current || !diffBox || found) return; // 조건: 이미지 참조/정답 존재/이미 정답일 때 제외

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const withinBox =
      x >= diffBox.x &&
      x <= diffBox.x + diffBox.width &&
      y >= diffBox.y &&
      y <= diffBox.y + diffBox.height;

    if (withinBox) {
      setFound(true); // 정답
    } else {
      setWrongAttempts((prev) => prev + 1); // 오답
    }
  };
  // if (!found) setWrongAttempts(prev => prev + 1);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadImageForInpaint(file); // AI 서버 호출 결과 받기
    setDiffBox(result.diffBox); // 정답 박스 설정
    setModifiedImageUrl(`${API_BASE_URL}{result.modified}`); // 수정 이미지 표시
    setOriginalImageUrl(`${API_BASE_URL}{result.original}`); // 원본 이미지 표시
    setFound(false);
    setWrongAttempts(0);
  };


return (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4 text-center">틀린 그림 찾기</h2>

    <div className="text-center mb-6">
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>

    {originalImageUrl && modifiedImageUrl && (
      <>
        <p className="text-center text-red-500 mb-4">오답 횟수: {wrongAttempts}</p>

        <div className="grid grid-cols-2 gap-4">
          <img src={originalImageUrl} alt="원본" className="rounded-lg shadow" />
          <div className="relative">
            <img
              src={modifiedImageUrl}
              alt="수정본"
              ref={imgRef}
              onClick={handleClick}
              className="rounded-lg shadow cursor-pointer"
            />
            {found && diffBox && (
              <div
                className="absolute border-4 border-green-500 z-10"
                style={{
                  left: diffBox.x,
                  top: diffBox.y,
                  width: diffBox.width,
                  height: diffBox.height,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>
      </>
    )}

    {found && (
      <div className="text-center mt-6 text-green-600 font-bold">
        🎉 정답입니다!
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
}



export default SpotTheDifferencePage;
