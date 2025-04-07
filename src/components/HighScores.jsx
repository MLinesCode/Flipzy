const HighScores = ({ scores, currentScore }) => {
  return (
    <div className="high-scores bg-white rounded-lg shadow-md overflow-hidden">
      <div className="high-scores__header py-4 px-5 text-center relative" 
        style={{ 
          background: "linear-gradient(135deg, #8F67FF 0%, #7C4DFF 100%)",
        }}
      >
        <h3 className="high-scores__title font-bold text-white text-lg relative z-10">
          Top Scores
        </h3>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 flex items-center justify-between z-0 overflow-hidden opacity-20">
          <div className="w-16 h-16 rounded-full bg-white transform -translate-x-8"></div>
          <div className="w-20 h-20 rounded-full bg-white transform translate-x-10"></div>
        </div>
        
        {/* Trophy icon */}
        <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/4 bg-yellow-400 rounded-full p-2 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-800" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
          </svg>
        </div>
      </div>
      
      {/* Scores content */}
      <div className="high-scores__content p-5">
        {scores.length === 0 ? (
          <div className="high-scores__empty text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500">
              No high scores yet. Play more games to set records!
            </p>
          </div>
        ) : (
          <div className="high-scores__table">
            <div className="high-scores__header grid grid-cols-3 gap-2 font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-2">
              <div className="high-scores__header-cell">Rank</div>
              <div className="high-scores__header-cell">Player</div>
              <div className="high-scores__header-cell text-right">Score</div>
            </div>
            
            {scores.map((score, index) => {
              // Check if this is the current user's score
              const isCurrentScore = currentScore && score.date === currentScore.date;
              
              // Styles for different ranks
              const rankStyles = [
                { background: "linear-gradient(135deg, #FFD700 0%, #FFC107 100%)", textColor: "#B7791F" },  // Gold
                { background: "linear-gradient(135deg, #E2E8F0 0%, #CBD5E0 100%)", textColor: "#718096" },  // Silver
                { background: "linear-gradient(135deg, #DD6B20 0%, #C05621 100%)", textColor: "#9C4221" }   // Bronze
              ];
              
              // Get rank style based on index
              const rankStyle = index < 3 ? rankStyles[index] : null;
              
              return (
                <div 
                  key={`${score.username}-${score.date}`}
                  className={`
                    high-scores__row grid grid-cols-3 gap-2 py-3
                    transition-all duration-200
                    ${isCurrentScore ? 
                      'bg-yellow-50 rounded-lg shadow-sm border-l-4 border-yellow-400 pl-2 -ml-2' : 
                      index % 2 === 0 ? 'bg-slate-50' : ''
                    }
                    ${index !== scores.length - 1 ? 'border-b border-gray-100' : ''}
                    ${isCurrentScore ? 'transform scale-105' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="high-scores__cell font-medium flex items-center">
                    {index < 3 ? (
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm mr-2 text-xs" 
                        style={{ 
                          background: rankStyle.background,
                          color: rankStyle.textColor
                        }}
                      >
                        {index + 1}
                      </div>
                    ) : (
                      <span className="text-gray-500 font-normal w-6 text-center mr-2">{index + 1}</span>
                    )}
                    
                    {isCurrentScore && 
                      <span className="text-yellow-600 ml-1">★</span>
                    }
                  </div>
                  <div className="high-scores__cell truncate">
                    {score.username}
                    {isCurrentScore && 
                      <span className="text-xs ml-1 text-yellow-600">(You)</span>
                    }
                  </div>
                  <div className="high-scores__cell text-right">
                    <span 
                      className={`font-semibold ${index === 0 ? 'text-yellow-600' : ''}`}
                      style={{ color: index === 0 ? '#B7791F' : (isCurrentScore ? '#8F67FF' : '#2D3748') }}
                    >
                      {score.score}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Score formula explanation */}
        <div className="high-scores__info mt-4 p-3 bg-slate-50 rounded-md text-xs text-slate-600 border border-slate-100">
          <div className="font-medium mb-1">Score Formula:</div>
          <div className="flex items-center">
            <div className="flex-1 grid grid-cols-3 gap-1">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                <span>Matches × 100</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                <span>Mistakes × 10</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                <span>Seconds × 0.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighScores;