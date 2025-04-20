import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CardGamePage: React.FC = () => {
  const springEmojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '🦋'];

  const createCards = (): Card[] => {
    const duplicated = [...springEmojis, ...springEmojis];
    const shuffled = duplicated
      .map((image) => ({ image, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({
        id: index,
        image: item.image,
        isFlipped: false,
        isMatched: false,
      }));
    return shuffled;
  };

  const [cards, setCards] = useState<Card[]>(createCards);
  const [flippedCardIds, setFlippedCardIds] = useState<number[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = (id: number) => {
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched || isChecking) return;

    const newFlipped = [...flippedCardIds, id];
    setFlippedCardIds(newFlipped);

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    );
  };

  useEffect(() => {
    if (flippedCardIds.length !== 2) return;

    setIsChecking(true);
    const [firstId, secondId] = flippedCardIds;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);

    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.image === secondCard.image;

    setTimeout(() => {
      if (isMatch) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setWrongAttempts((prev) => prev + 1);
      }
      setFlippedCardIds([]);
      setIsChecking(false);
    }, 1000);
  }, [flippedCardIds, cards]);

  const resetGame = () => {
    setCards(createCards());
    setFlippedCardIds([]);
    setWrongAttempts(0);
    setIsChecking(false);
  };

  const isGameComplete = cards.every((card) => card.isMatched);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">봄 카드 짝 맞추기</h2>
        <p className="text-lg text-red-500">틀린 시도: {wrongAttempts}회</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            disabled={card.isMatched || isChecking}
            className={`relative aspect-[3/4] rounded-xl shadow-lg flex items-center justify-center
              text-4xl transition-all duration-300
              ${
                card.isFlipped || card.isMatched
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }
            `}
          >
            {card.isFlipped || card.isMatched ? card.image : '?'}
          </button>
        ))}
      </div>

      {isGameComplete && (
        <div className="text-center mt-8">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            🎉 축하합니다! 모든 카드를 맞추셨어요!
          </h3>
        </div>
      )}

      <button
        onClick={resetGame}
        className="mt-8 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors mx-auto block"
      >
        다시 시작
      </button>
    </div>
  );
};

export default CardGamePage;
