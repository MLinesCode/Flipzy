import Card from './Card';

const Board = ({ 
  cards, 
  flipCard, 
  increaseCards, 
  resetGame, 
  cardCount, 
  maxCards, 
  isLoading,
  hasError,
  isMobile
}) => {

  const hideIncreaseButton = isMobile && cardCount >= maxCards;

  return (
    <section className="board-container flex flex-col items-center">
      {/* Controls */}
      <div className="board-controls flex justify-between w-full max-w-sm mb-4">
        {!hideIncreaseButton && (
          <button
            onClick={increaseCards}
            className="board-controls__button--increase bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            disabled={cardCount >= maxCards || isLoading}
          >
            Increase Cards
          </button>
        )}
        <button
          onClick={resetGame}
          className={`board-controls__button--reset bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:bg-gray-400 ${hideIncreaseButton ? 'w-full' : ''}`}
          disabled={isLoading}
        >
          Reset Game
        </button>
      </div>

      {/* Game board */}
      <div
        className="
          board
          grid
          grid-cols-3
          md:grid-cols-5
          gap-4
          place-items-center
          mx-auto
          min-h-[300px]
        "
      >
        {isLoading ? (
          <div className="col-span-full text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
            <p className="text-gray-500">Loading cards...</p>
          </div>
        ) : hasError ? (
          <div className="col-span-full text-center py-10">
            <p className="text-red-500 mb-2">Error loading cards</p>
            <button 
              onClick={resetGame}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-2"
            >
              Reintentar
            </button>
          </div>
        ) : cards && cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.id} card={card} flipCard={flipCard} />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-gray-500">No cards available</p>
        )}
      </div>
    </section>
  );
};

export default Board;