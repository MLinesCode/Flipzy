import React, { useState, useEffect } from 'react';
import UserModal from './components/UserModal';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import useMemoryGame from './hooks/useMemoryGame';

const App = () => {
  const [user, setUser] = useState('');
  
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
    hasError
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
    setUser(username);
    localStorage.setItem('username', username);
  };

  return (
    <div className="app container mx-auto p-4">
      <header className="app__header mb-4 text-center">
        <h1 className="app__title text-3xl font-bold">Flipzy</h1>
        <p className="text-gray-500">Classic memory game</p>
        {user && <p className="text-sm mt-2">Player: {user}</p>}
      </header>

      {!user && <UserModal setUser={handleSetUser} />}

      {user && (
        <>
          <Scoreboard 
            mistakes={mistakes} 
            matches={matches} 
            total={cards.length / 2} 
          />
          
          {isGameComplete ? (
            <div className="victory-message bg-green-100 border border-green-500 text-green-800 p-4 rounded-lg text-center my-4">
              <h2 className="text-xl font-bold mb-2">¡Felicidades {user}!</h2>
              <p>Has completado el juego con {mistakes} errores.</p>
              <button 
                className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
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