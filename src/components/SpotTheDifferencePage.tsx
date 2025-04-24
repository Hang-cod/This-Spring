// src/components/SpotTheDifferencePage.tsx

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImageForInpaint } from '../api/inpaintApi';
import type { DiffBox } from '../api/inpaintApi';

// 📍 API 서버 기본 주소 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const SpotTheDifferencePage: React.FC = () => {
  // 📦 상태 정의
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // 사용자가 업로드한 이미지 파일
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null); // 원본 이미지 URL
  const [modifiedImageUrl, setModifiedImageUrl] = useState<string | null>(null); // AI가 수정한 이미지 URL
  const [diffBox, setDiffBox] = useState<DiffBox | null>(null); // AI가 알려준 틀린 부분의 좌표
  const [found, setFound] = useState(false); // 정답을 맞췄는지 여부
  const [wrongAttempts, setWrongAttempts] = useState(0); // 오답 횟수 카운트
  const [gameStarted, setGameStarted] = useState(false); // 게임이 시작되었는지 여부
  const imgRef = useRef<HTMLImageElement | null>(null); // 수정된 이미지 참조 (클릭 좌표 계산용)
  const navigate = useNavigate(); // React Router로 페이지 이동

  // 📸 파일 업로드 처리 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file); // 파일 상태 저장
      setOriginalImageUrl(URL.createObjectURL(file)); // 업로드된 이미지 미리보기
      setGameStarted(false); // 새로 업로드되면 다시 시작
      setFound(false); // 정답 상태 초기화
      setWrongAttempts(0); // 오답 횟수 초기화
      setModifiedImageUrl(null); // 이전 수정본 제거
    }
  };

  // 🧠 AI에게 틀린 그림 생성을 요청하는 함수
  const handleStartGame = async () => {
    if (!uploadedFile) return; // 파일이 없으면 아무것도 하지 않음
    const result = await uploadImageForInpaint(uploadedFile); // 백엔드에 업로드 + AI로부터 수정본 수신
    setModifiedImageUrl(`${API_BASE_URL}${result.modified}`); // 수정 이미지 URL 설정
    setOriginalImageUrl(`${API_BASE_URL}${result.original}`); // 원본 이미지 URL 재설정 (AI가 재압축한 경우 포함)
    setDiffBox(result.diffBox); // 정답 박스 좌표 저장
    setGameStarted(true); // 게임 시작 상태 변경
    setFound(false);
    setWrongAttempts(0);
  };

  // 🎯 수정본 클릭 시 정답 여부 판단
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current || !diffBox || found) return; // 이미지 참조 또는 정답 박스가 없거나 이미 정답인 경우 무시

    const rect = imgRef.current.getBoundingClientRect(); // 이미지의 화면 내 위치 계산
    const x = e.clientX - rect.left; // 클릭 좌표 X (이미지 내부 기준)
    const y = e.clientY - rect.top; // 클릭 좌표 Y

    // 정답 박스 안인지 판별
    const withinBox =
      x >= diffBox.x &&
      x <= diffBox.x + diffBox.width &&
      y >= diffBox.y &&
      y <= diffBox.y + diffBox.height;

    if (withinBox) {
      setFound(true); // 정답일 경우
    } else {
      setWrongAttempts((prev) => prev + 1); // 오답일 경우 횟수 증가
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-sakura-brown">
        틀린 그림 찾기
      </h2>

      {/* 🔼 파일 업로드 입력 */}
      <div className="text-center mb-6">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* 📌 게임 시작 전: 원본만 보여주고 시작 버튼 표시 */}
      {originalImageUrl && !gameStarted && (
        <div className="text-center">
          <img src={originalImageUrl} alt="업로드 원본" className="rounded-xl mx-auto shadow" />
          <button
            onClick={handleStartGame}
            className="mt-6 px-6 py-3 bg-pink-500 text-white text-lg rounded-lg shadow hover:bg-pink-600 transition"
          >
            🧠 틀린 그림 만들기 시작
          </button>
        </div>
      )}

      {/* ▶️ 게임 시작 후: 원본 + 수정본 비교 */}
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
              {/* ✅ 정답을 맞췄을 경우 박스 표시 */}
              {found && diffBox && (
                <div
                  className="absolute border-4 border-green-400 z-10"
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

      {/* 🎉 정답 메시지 */}
      {found && (
        <div className="text-center mt-6 text-green-600 font-bold text-lg">
          🎉 정답이에요 봄이!
        </div>
      )}

      {/* 🔚 홈으로 돌아가기 버튼 */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-3 bg-sakura-button text-white rounded-lg hover:bg-sakura-button-dark transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default SpotTheDifferencePage;
