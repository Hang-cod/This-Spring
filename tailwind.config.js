/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js

  //테마 단위로 컬러셋 그룹화
  theme: {
    extend: {
      colors: {
        cherry: {
          light: '#fcdde4',     // 부드러운 체리꽃잎 배경
          DEFAULT: '#f9c8d9',   // 기본 체리핑크
          dark: '#e87a90',      // 강조/호버용 체리핑크
        },
        sakura: {
          base: '#ffe8e8',      // 벚꽃잎 전체 배경색
          brown: '#8b2c37',     // 텍스트용 따뜻한 갈색
          dark: '#6e1f2b',      // 더 깊은 강조 텍스트/포인트
        },
        mint: {
          light: '#c6f1e7',     // 봄 느낌의 밝은 민트
          DEFAULT: '#a3e9d0',
        },
        lavender: {
          light: '#e6e6fa',     // 보라빛 기분전환용 배경
          DEFAULT: '#d8b2f1',
        },
        sky: {
          light: '#e0f7fa',     // 하늘색 계열
          DEFAULT: '#b2ebf2',
        },
        emotion: {
          calm: '#cce0ff',      // 차분한 느낌
          happy: '#ffe082',     // 밝고 따뜻한 느낌
          focused: '#80cbc4',   // 몰입감을 주는 민트빛
          sad: '#b0bec5',       // 감정을 담는 회색 계열
        }
      }
    }
  },
  plugins: [],
}
