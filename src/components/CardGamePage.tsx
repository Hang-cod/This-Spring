import React, { useEffect, useState } from 'react';
import '../css/CardGamePage.css';
import { useNavigate } from 'react-router-dom';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const springEmojis = ['🌸', '🌷', '🌺', '🌻', '🦋', '🐝'];

const createShuffledCards = (): Card[] => {
  const doubled = [...springEmojis, ...springEmojis];
  const shuffled = doubled.sort(() => Math.random() - 0.5);
  return shuffled.map((emoji, idx) => ({
    id: idx,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

const CardGamePage: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>(createShuffledCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsProcessing(true);
      const [firstIdx, secondIdx] = flipped;
      const first = cards[firstIdx];
      const second = cards[secondIdx];
      const newCards = [...cards];

      if (first.emoji === second.emoji) {
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setMatchedCount((prev) => prev + 1);
      } else {
        setWrongAttempts((prev) => prev + 1);
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
        }, 800); // 틀린 그림 보여주고 잠깐 후 원상복귀
      }

      setTimeout(() => {
        setFlipped([]);
        setIsProcessing(false);
      }, 800); // 처리 중 잠금 해제
    }
  }, [flipped]);

  const handleClick = (index: number) => {
    if (
      !isProcessing &&
      flipped.length < 2 &&
      !cards[index].isFlipped &&
      !cards[index].isMatched
    ) {
      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);
      setFlipped((prev) => [...prev, index]);
    }
  };

  const handleReset = () => {
    setCards(createShuffledCards());
    setFlipped([]);
    setMatchedCount(0);
    setWrongAttempts(0);
    setIsProcessing(false);
  };
  useEffect(() => {
    if (matchedCount === springEmojis.length) {
      setTimeout(() => {
        alert("🎉 모든 카드를 맞췄어요! 최고예요 봄이!");
        localStorage.setItem('card-game-done', 'true');
        navigate('/home');
      }, 300); // 약간의 여유 시간 (카드 뒤집히는 애니메이션 후)
    }
  }, [matchedCount]);

  return (
    <div className="min-h-screen px-4 py-8 bg-sakura-base">
      <h2 className="text-2xl font-bold text-center mb-2 text-sakura-brown">카드 짝 맞추기 게임</h2>
      <p className="text-center text-red-500 font-medium mb-6">오답 횟수: {wrongAttempts}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-sm sm:max-w-md mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="relative aspect-square cursor-pointer perspective"
            onClick={() => handleClick(index)}
          >
            <div
              className={`w-full h-full transition-transform duration-500 transform-style preserve-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                }`}
            >
              {/* 앞면 */}
              <div className="absolute inset-0 bg-cherry text-3xl flex items-center justify-center rounded-xl text-white backface-hidden rotate-y-180">
                {card.emoji}
              </div>

              {/* 뒷면 */}
              <div className="absolute inset-0 bg-gray-300 rounded-xl shadow-md flex items-center justify-center backface-hidden">
                ❓
              </div>
            </div>
          </div>
        ))}
      </div>

      {matchedCount === springEmojis.length && (
        <div className="text-center mt-8 text-lg text-green-600 font-semibold">
          🎉 모든 카드를 맞췄어요! 최고예요 봄이!
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-cherry hover:bg-cherry-dark text-white rounded-lg transition-colors"
        >
          다시 시작하기
        </button>
      </div>
    </div>
  );
};

export default CardGamePage;
