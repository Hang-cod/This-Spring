import React, { useState } from 'react';

interface Card {
  id: number;
  isFlipped: boolean;
  isCorrect: boolean;
}

const CardGamePage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(() => 
    Array.from({ length: 6 }, (_, index) => ({
      id: index,
      isFlipped: false,
      isCorrect: Math.random() < 0.5 // 50% 확률로 정답 카드 생성
    }))
  );
  
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const handleCardClick = (id: number) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard && !clickedCard.isCorrect && !clickedCard.isFlipped) {
      setWrongAttempts(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">카드 뒤집기 게임</h2>
        <p className="text-lg text-red-500">
          틀린 시도: {wrongAttempts}회
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => !card.isFlipped && handleCardClick(card.id)}
            className={`
              relative aspect-[3/4] rounded-xl shadow-lg 
              transition-all duration-500 transform perspective-1000
              ${card.isFlipped ? '[transform:rotateY(180deg)]' : ''}
              group
            `}
          >
            {/* 카드 앞면 */}
            <div className={`
              absolute w-full h-full flex items-center justify-center
              bg-blue-500 hover:bg-blue-600 rounded-xl
              backface-hidden transition-all duration-500
              ${card.isFlipped ? 'opacity-0' : 'opacity-100'}
            `}>
              <span className="text-white text-2xl">?</span>
            </div>

            {/* 카드 뒷면 */}
            <div className={`
              absolute w-full h-full flex items-center justify-center
              rounded-xl backface-hidden transition-all duration-500
              [transform:rotateY(180deg)]
              ${card.isCorrect ? 'bg-green-500' : 'bg-red-500'}
              ${card.isFlipped ? 'opacity-100' : 'opacity-0'}
            `}>
              <span className="text-white text-2xl">
                {card.isCorrect ? '⭕' : '❌'}
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          setCards(prevCards =>
            prevCards.map(card => ({
              ...card,
              isFlipped: false,
              isCorrect: Math.random() < 0.5
            }))
          );
          setWrongAttempts(0);
        }}
        className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors mx-auto block"
      >
        다시 시작
      </button>
    </div>
  );
};

export default CardGamePage; 