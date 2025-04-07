const VictoryMessage = ({ username, formattedTime, mistakes, matches, score, resetGame }) => {
  return (
    <div className="victory-message relative overflow-hidden bg-gradient-to-br from-teal-50 to-purple-50 border-2 border-teal-200 p-6 rounded-2xl text-center shadow-lg lg:max-w-4xl lg:mx-auto"
         role="alert"
         aria-live="polite">
      {/* Trophy icon */}
      <div className="victory-trophy inline-block p-3 rounded-full mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-md transform -rotate-12">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-700" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Victory title with glow effect */}
      <h2 className="victory-message__title text-2xl font-bold mb-3" style={{
        background: "linear-gradient(135deg, #8F67FF, #4FD1C5)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 0 15px rgba(143, 103, 255, 0.3)"
      }}>
        ¡Congratulations {username}!
      </h2>
      
      <p className="victory-message__stats mb-4 text-slate-600">You completed the game with these results:</p>
      
      {/* Game stats cards */}
      <div className="victory-message__details grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 max-w-lg mx-auto">
        <div className="victory-stat bg-white p-4 rounded-xl shadow-sm border border-teal-100 flex flex-col items-center">
          <div className="stat-icon mb-1 p-2 rounded-full bg-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-500">Time</span>
          <span className="text-lg font-bold text-slate-800">{formattedTime}</span>
        </div>
        
        <div className="victory-stat bg-white p-4 rounded-xl shadow-sm border border-teal-100 flex flex-col items-center">
          <div className="stat-icon mb-1 p-2 rounded-full bg-purple-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-500">Matches</span>
          <span className="text-lg font-bold text-slate-800">{matches}</span>
        </div>
        
        <div className="victory-stat bg-white p-4 rounded-xl shadow-sm border border-teal-100 flex flex-col items-center">
          <div className="stat-icon mb-1 p-2 rounded-full bg-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-500">Mistakes</span>
          <span className="text-lg font-bold text-slate-800">{mistakes}</span>
        </div>
      </div>
      
      {/* Score display */}
      <div className="victory-message__score inline-block mb-6">
        <div className="text-sm font-medium text-slate-500 mb-1">FINAL SCORE:</div>
        <div className="text-4xl font-bold" style={{
          background: "linear-gradient(135deg, #8F67FF, #4FD1C5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          {score}
        </div>
      </div>
      
      {/* Play again button */}
      <button 
        className="victory-message__button block w-full sm:w-auto sm:inline-block mx-auto py-3 px-8 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        style={{ 
          background: "linear-gradient(135deg, #8F67FF 0%, #4FD1C5 100%)",
          boxShadow: "0 4px 10px rgba(143, 103, 255, 0.3)",
          cursor: "pointer"
        }}
        onClick={resetGame}
        aria-label="Restart the game and play again"
      >
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <span>Play again</span>
        </div>
      </button>
    </div>
  );
};

export default VictoryMessage;