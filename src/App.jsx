import React, { useState, useEffect } from 'react';
import UserModal from './components/UserModal';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Notification from './components/Notification';
import HighScores from './components/HighScores';
import useMemoryGame from './hooks/useMemoryGame';
import { saveScore } from './utils/scoreUtils';

const App = () => {
  const [user, setUser] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [currentScoreEntry, setCurrentScoreEntry] = useState(null);
  
  // Using the hook which now utilizes an internal reducer
  const {
    cards,
    flipCard,
    increaseCards,
    resetGame,
    mistakes,
    matches,
    cardCount,
    maxCards,
    isGameComplete,
    isLoading,
    hasError,
    formattedTime,
    elapsedTime,
    score,
    highScores
  } = useMemoryGame();

  // Detect if the user is on a mobile device
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Save score when game completes
  useEffect(() => {
    if (isGameComplete && user && score > 0) {
      const savedScores = saveScore(user, score, matches, mistakes, elapsedTime, formattedTime);
      // Find the current score entry in the saved scores
      const latestEntry = savedScores.find(s => 
        s.username === user && 
        s.score === score && 
        s.matches === matches && 
        s.mistakes === mistakes
      );
      setCurrentScoreEntry(latestEntry);
    }
  }, [isGameComplete, user, score, matches, mistakes, elapsedTime, formattedTime]);

  // Save user to localStorage
  const handleSetUser = (username) => {
    const isUpdating = user !== '' && user !== username;
    setUser(username);
    localStorage.setItem('username', username);
    
    // Show notification if updating username
    if (isUpdating) {
      setNotification({
        show: true,
        message: 'Your name has been updated successfully!'
      });
    }
  };

  const closeNotification = () => {
    setNotification({ show: false, message: '' });
  };

  return (
    <div className="app container mx-auto p-4">
      <header className="app__header mb-6 pt-4">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-50 to-teal-50 shadow-sm mx-auto max-w-2xl p-4">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 -mr-10 -mt-10 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #8F67FF, #4FD1C5)' }}
            aria-hidden="true">
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 -ml-6 -mb-6 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #4FD1C5, #8F67FF)' }}
            aria-hidden="true">
          </div>
          
          {/* Logo and title section */}
          <div className="text-center relative">
            <h1 className="app__title text-4xl font-bold mb-1 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500"
                    style={{ 
                      backgroundImage: 'linear-gradient(to right, #8F67FF, #4FD1C5)',
                      textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
                    }}>
                Flipzy
              </span>
              <span className="absolute -top-2 -right-4 text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full font-normal"
                    style={{ backgroundColor: 'rgba(143, 103, 255, 0.15)', color: '#8F67FF' }}
                    aria-hidden="true">
                ✨
              </span>
            </h1>
            <p className="text-slate-600 text-sm mb-4">
              Classic memory game with a modern twist
            </p>
          </div>
          
          {/* Player info section */}
          {user && (
            <div className="flex flex-col items-center mt-3">
              <div 
                className="player-card w-full max-w-xs bg-white rounded-lg shadow-sm p-3 flex items-center justify-between gap-3"
                style={{ borderLeft: '3px solid #4FD1C5' }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="player-avatar w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: '#8F67FF' }}
                    aria-hidden="true"
                  >
                    {user.charAt(0).toUpperCase()}
                  </div>
                  <div className="player-info">
                    <div className="text-xs text-slate-500 font-medium">PLAYER</div>
                    <div className="text-slate-800 font-medium truncate max-w-[140px]">{user}</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowUpdateModal(true)}
                  className="player-edit-btn bg-gray-100 hover:bg-gray-200 text-slate-600 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500 cursor-pointer"
                  aria-label="Edit your player name"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Show UserModal if no user OR if updating username */}
      {(!user || showUpdateModal) && (
        <UserModal 
          setUser={handleSetUser} 
          currentUser={user} 
          isUpdating={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {/* Notification component */}
      {notification.show && (
        <Notification 
          message={notification.message} 
          onClose={closeNotification} 
        />
      )}

      {user && (
        <>
          <Scoreboard 
            mistakes={mistakes} 
            matches={matches} 
            total={cards.length / 2} 
            formattedTime={formattedTime}
          />
          
          {isGameComplete ? (
            <div className="victory-container flex flex-col gap-4">
              <div className="victory-message bg-green-100 border border-green-500 text-green-800 p-4 rounded-lg text-center">
                <h2 className="victory-message__title text-xl font-bold mb-2">¡Felicidades {user}!</h2>
                <p className="victory-message__stats mb-2">Has completado el juego con:</p>
                <div className="victory-message__details flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                  <p className="victory-message__time p-2 bg-blue-100 rounded-md">
                    <span className="font-bold">Tiempo total:</span> {formattedTime}
                  </p>
                  <p className="victory-message__errors p-2 bg-red-100 rounded-md">
                    <span className="font-bold">Errores cometidos:</span> {mistakes}
                  </p>
                </div>
                
                <div className="victory-message__score bg-purple-100 p-3 rounded-lg inline-block">
                  <span className="victory-message__score-label font-bold text-purple-800">Tu puntaje:</span>{' '}
                  <span className="victory-message__score-value text-xl text-purple-900">{score}</span>
                </div>
                
                <button 
                  className="victory-message__button block mx-auto mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  onClick={resetGame}
                >
                  Jugar de nuevo
                </button>
              </div>
              
              {/* Highscores Component */}
              <HighScores 
                scores={highScores} 
                currentScore={currentScoreEntry}
              />
            </div>
          ) : (
            <Board 
              cards={cards}
              flipCard={flipCard}
              increaseCards={increaseCards}
              resetGame={resetGame}
              cardCount={cardCount}
              maxCards={maxCards}
              isLoading={isLoading}
              hasError={hasError}
              isMobile={isMobile}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;