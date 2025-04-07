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
      <div className="board-controls flex justify-between gap-4 w-full max-w-sm mb-6">
        {!hideIncreaseButton && (
          <button
            onClick={increaseCards}
            className="board-controls__button--increase flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:scale-100"
            style={{ 
              background: "linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%)",
              boxShadow: "0 4px 10px rgba(79, 209, 197, 0.3)",
              cursor: "pointer"
            }}
            disabled={cardCount >= maxCards || isLoading}
          >
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Cards</span>
            </div>
          </button>
        )}
        <button
          onClick={resetGame}
          className={`board-controls__button--reset flex-1 py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:scale-100 ${hideIncreaseButton ? 'w-full' : ''}`}
          style={{ 
            background: "linear-gradient(135deg, #8F67FF 0%, #7C4DFF 100%)",
            boxShadow: "0 4px 10px rgba(143, 103, 255, 0.3)",
            cursor: "pointer"
          }}
          disabled={isLoading}
        >
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span>Reset Game</span>
          </div>
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
          w-full
          max-w-4xl
          p-4
          bg-gradient-to-b from-slate-50 to-white
          rounded-lg
          shadow-sm
        "
      >
        {isLoading ? (
          <div className="col-span-full text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-teal-500 border-teal-300 mb-4"></div>
            <p className="text-slate-600">Loading your cards...</p>
          </div>
        ) : hasError ? (
          <div className="col-span-full text-center py-10 px-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">Error loading cards</span>
            </div>
            <button 
              onClick={resetGame}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-md flex items-center mx-auto"
              style={{ cursor: "pointer" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Try Again
            </button>
          </div>
        ) : cards && cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.id} card={card} flipCard={flipCard} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-700">No cards available</p>
            </div>
          </div>
        )}
      </div>

      {/* Card count indicator */}
      {cards && cards.length > 0 && !isLoading && !hasError && (
        <div className="mt-4 text-sm text-slate-500 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <span>Playing with {cards.length} cards ({cardCount}/{maxCards})</span>
        </div>
      )}
    </section>
  );
};

export default Board;