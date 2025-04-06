import React, { useState, useEffect } from 'react';
import UserModal from './components/UserModal';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Notification from './components/Notification'; 
import useMemoryGame from './hooks/useMemoryGame';

const App = () => {
  const [user, setUser] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
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
    formattedTime
  } = useMemoryGame();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      <header className="app__header mb-4 text-center">
        <h1 className="app__title text-3xl font-bold">Flipzy</h1>
        <p className="text-gray-500">Classic memory game</p>
        
        {user && (
          <div className="flex flex-col items-center mt-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">Player: {user}</p>
              <button 
                onClick={() => setShowUpdateModal(true)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Change name"
              >
                <span className="sr-only">Change your name</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
        )}
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
            <div className="victory-message bg-green-100 border border-green-500 text-green-800 p-4 rounded-lg text-center my-4">
              <h2 className="victory-message__title text-xl font-bold mb-2">¡Felicidades {user}!</h2>
              <p className="victory-message__stats mb-2">Has completado el juego con:</p>
              <div className="victory-message__details flex flex-col items-center justify-center gap-2 mb-4">
                <p className="victory-message__time p-2 bg-blue-100 rounded-md inline-block">
                  <span className="font-bold">Tiempo total:</span> {formattedTime}
                </p>
                <p className="victory-message__errors p-2 bg-red-100 rounded-md inline-block">
                  <span className="font-bold">Errores cometidos:</span> {mistakes}
                </p>
              </div>
              <button 
                className="victory-message__button mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={resetGame}
              >
                Jugar de nuevo
              </button>
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
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;