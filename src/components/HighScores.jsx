const HighScores = ({ scores, currentScore }) => {
  return (
    <div className="high-scores bg-white rounded-lg shadow-md p-4 mt-4">
      <h3 className="high-scores__title text-lg font-bold text-center mb-3">
        Top Scores
      </h3>
      
      {scores.length === 0 ? (
        <p className="high-scores__empty text-center text-gray-500">
          No high scores yet. Play more games to set records!
        </p>
      ) : (
        <div className="high-scores__table">
          <div className="high-scores__header grid grid-cols-3 gap-2 font-semibold text-gray-700 border-b pb-2 mb-2">
            <div className="high-scores__header-cell">Rank</div>
            <div className="high-scores__header-cell">Player</div>
            <div className="high-scores__header-cell text-right">Score</div>
          </div>
          
          {scores.map((score, index) => (
            <div 
              key={`${score.username}-${score.date}`}
              className={`
                high-scores__row grid grid-cols-3 gap-2 py-2 
                ${currentScore && score.date === currentScore.date ? 
                  'bg-yellow-50 border-l-4 border-yellow-400 pl-2 -ml-2 rounded' : ''}
                ${index !== scores.length - 1 ? 'border-b border-gray-100' : ''}
              `}
            >
              <div className="high-scores__cell font-medium">
                {index + 1}
                {currentScore && score.date === currentScore.date && 
                  <span className="ml-1 text-yellow-600">★</span>}
              </div>
              <div className="high-scores__cell truncate">{score.username}</div>
              <div className="high-scores__cell text-right font-semibold">{score.score}</div>
            </div>
          ))}
        </div>
      )}
      
      <div className="high-scores__info text-xs text-gray-500 mt-3 text-center">
        <p>Score formula: (Matches × 100) - (Mistakes × 10) - (Seconds × 0.5)</p>
      </div>
    </div>
  );
};

export default HighScores;