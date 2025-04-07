// src/hooks/useMemoryGame.js
import { useReducer, useEffect, useCallback, useRef, useMemo } from 'react';
import { fetchAnimals } from '../services/api';
import { calculateScore, getHighScores } from '../utils/scoreUtils';

const MOBILE_BREAKPOINT = 768; // Pixel width defining mobile view
const MATCH_CHECK_DELAY = 800; // Delay (ms) before checking if two flipped cards match
const MOBILE_MAX_CARDS = 12;
const DESKTOP_MAX_CARDS = 40;

const initialState = {
  animals: [], // Animals fetched from the API
  cards: [], // Cards on the board
  flippedCards: [], // IDs of the two cards currently flipped
  matches: 0, // Number of matched pairs
  mistakes: 0, // Number of mismatches
  cardCount: 12, // Starting number of cards (adjustable for difficulty)
  gameKey: 0, // Increment to reset the board
  isMobile: false, // True when in mobile view
  isLoading: true, // True while animal data is loading
  hasError: false, // True if there was an error fetching data
  elapsedTime: 0, // Time elapsed in seconds
  timerActive: false, // Whether the timer is currently running
};

const ACTIONS = {
  SET_ANIMALS: 'SET_ANIMALS',
  SET_MOBILE: 'SET_MOBILE',
  INIT_BOARD: 'INIT_BOARD',
  FLIP_CARD: 'FLIP_CARD',
  CHECK_MATCH: 'CHECK_MATCH',
  INCREASE_CARDS: 'INCREASE_CARDS',
  RESET_GAME: 'RESET_GAME',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  START_TIMER: 'START_TIMER',
  STOP_TIMER: 'STOP_TIMER',
  UPDATE_TIMER: 'UPDATE_TIMER',
  RESET_TIMER: 'RESET_TIMER',
};

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ANIMALS:
      return {
        ...state,
        animals: action.payload,
        isLoading: false,
        hasError: false,
      };

    case ACTIONS.SET_MOBILE:
      if (state.isMobile === action.payload) return state;
      return { ...state, isMobile: action.payload };

    case ACTIONS.INIT_BOARD: {
      if (state.animals.length === 0) {
        console.warn('No animals available to initialize the board.');
        return state;
      }

      const maxCards = state.isMobile ? MOBILE_MAX_CARDS : DESKTOP_MAX_CARDS;
      let numCards = Math.min(state.cardCount, maxCards);
      if (numCards % 2 !== 0) numCards--;
      numCards = Math.max(2, numCards);

      const pairsNeeded = numCards / 2;
      if (state.animals.length < pairsNeeded) {
        console.warn(
          `Not enough unique animals (${state.animals.length}) for ${pairsNeeded} pairs.`
        );
      }

      const shuffledAnimals = [...state.animals].sort(() => 0.5 - Math.random());
      const selectedAnimals = shuffledAnimals.slice(0, pairsNeeded);

      let newCards = [];
      selectedAnimals.forEach((animal) => {
        const baseCard = {
          animalId: animal.id,
          name: animal.name,
          image: animal.image,
          status: 'hidden',
        };
        newCards.push({ ...baseCard, id: `${animal.id}-1` });
        newCards.push({ ...baseCard, id: `${animal.id}-2` });
      });

      newCards = newCards.sort(() => 0.5 - Math.random());

      return {
        ...state,
        cards: newCards,
        matches: 0,
        mistakes: 0,
        flippedCards: [],
        elapsedTime: 0,
        timerActive: false,
      };
    }

    case ACTIONS.FLIP_CARD: {
      const cardId = action.payload;
      if (state.flippedCards.length === 2) return state;

      const cardIndex = state.cards.findIndex((c) => c.id === cardId);
      if (cardIndex === -1 || state.cards[cardIndex].status !== 'hidden') {
        return state;
      }

      // Start timer on first card flip if it's not already running
      const startTimer = !state.timerActive;

      const updatedCards = [
        ...state.cards.slice(0, cardIndex),
        { ...state.cards[cardIndex], status: 'flipped' },
        ...state.cards.slice(cardIndex + 1),
      ];

      return {
        ...state,
        cards: updatedCards,
        flippedCards: [...state.flippedCards, cardId],
        timerActive: startTimer ? true : state.timerActive,
      };
    }

    case ACTIONS.CHECK_MATCH: {
      if (state.flippedCards.length !== 2) {
        console.warn('CHECK_MATCH called without exactly two flipped cards.');
        return state;
      }
      const [firstId, secondId] = state.flippedCards;
      const firstCard = state.cards.find((c) => c.id === firstId);
      const secondCard = state.cards.find((c) => c.id === secondId);

      if (!firstCard || !secondCard) {
        console.error('Missing card data during match check.');
        return { ...state, flippedCards: [] };
      }

      const isMatch = firstCard.animalId === secondCard.animalId;
      const updatedCards = state.cards.map((c) =>
        c.id === firstId || c.id === secondId
          ? { ...c, status: isMatch ? 'matched' : 'hidden' }
          : c
      );

      const newMatches = isMatch ? state.matches + 1 : state.matches;
      const isGameComplete = newMatches === state.cards.length / 2;

      return {
        ...state,
        cards: updatedCards,
        matches: newMatches,
        mistakes: isMatch ? state.mistakes : state.mistakes + 1,
        flippedCards: [],
        timerActive: isGameComplete ? false : state.timerActive,
      };
    }

    case ACTIONS.INCREASE_CARDS: {
      const maxCards = state.isMobile ? MOBILE_MAX_CARDS : DESKTOP_MAX_CARDS;
      const newCardCount = Math.min(state.cardCount + 2, maxCards);
      if (newCardCount === state.cardCount) return state;
      return { ...state, cardCount: newCardCount };
    }

    case ACTIONS.RESET_GAME:
      return { 
        ...state, 
        gameKey: state.gameKey + 1,
        elapsedTime: 0,
        timerActive: false
      };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, hasError: action.payload, isLoading: false };

    case ACTIONS.START_TIMER:
      return { ...state, timerActive: true };

    case ACTIONS.STOP_TIMER:
      return { ...state, timerActive: false };

    case ACTIONS.UPDATE_TIMER:
      return { ...state, elapsedTime: state.elapsedTime + 1 };

    case ACTIONS.RESET_TIMER:
      return { ...state, elapsedTime: 0, timerActive: false };

    default:
      return state;
  }
}

/**
 * Custom hook for managing a Memory Match game.
 * It handles data fetching, board setup, card flipping, matching logic,
 * difficulty adjustment, and responsive layout.
 *
 * @returns {Object} Game state and actions.
 */
const useMemoryGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const checkTimeout = useRef(null);
  const strictModeCheck = useRef(false);
  const timerRef = useRef(null);

  // Fetch animal data on mount (avoid duplicate fetches in StrictMode)
  useEffect(() => {
    if (strictModeCheck.current) return;
    strictModeCheck.current = true;

    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    fetchAnimals()
      .then((data) => dispatch({ type: ACTIONS.SET_ANIMALS, payload: data }))
      .catch((error) => {
        console.error('Error fetching animals in hook:', error);
        dispatch({ type: ACTIONS.SET_ERROR, payload: true });
      });

    return () => {
      strictModeCheck.current = false;
    };
  }, []);

  // Update mobile view flag based on window size
  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: ACTIONS.SET_MOBILE, payload: window.innerWidth < MOBILE_BREAKPOINT });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize the game board when animals are loaded or when settings change
  useEffect(() => {
    if (state.animals.length > 0) {
      dispatch({ type: ACTIONS.INIT_BOARD });
    }
  }, [state.animals, state.cardCount, state.isMobile, state.gameKey]);

  // After two cards are flipped, check for a match after a short delay
  useEffect(() => {
    let timeoutId = null;
    if (state.flippedCards.length === 2) {
      timeoutId = setTimeout(() => dispatch({ type: ACTIONS.CHECK_MATCH }), MATCH_CHECK_DELAY);
      checkTimeout.current = timeoutId;
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        checkTimeout.current = null;
      }
    };
  }, [state.flippedCards]);

  // Timer effect - updates the timer every second when active
  useEffect(() => {
    if (state.timerActive) {
      timerRef.current = setInterval(() => {
        dispatch({ type: ACTIONS.UPDATE_TIMER });
      }, 1000);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state.timerActive]);

  const flipCard = useCallback(
    (cardId) => {
      if (state.flippedCards.length === 2) return;
      dispatch({ type: ACTIONS.FLIP_CARD, payload: cardId });
    },
    [state.flippedCards.length]
  );

  const increaseCards = useCallback(() => dispatch({ type: ACTIONS.INCREASE_CARDS }), []);

  const resetGame = useCallback(() => dispatch({ type: ACTIONS.RESET_GAME }), []);

  const isGameComplete = state.matches > 0 && state.matches === state.cards.length / 2;
  const maxCards = state.isMobile ? MOBILE_MAX_CARDS : DESKTOP_MAX_CARDS;

  // Format elapsed time as mm:ss
  const formattedTime = useCallback(() => {
    const minutes = Math.floor(state.elapsedTime / 60);
    const seconds = state.elapsedTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [state.elapsedTime]);

  // Calculate score when game is complete
  const score = useMemo(() => {
    if (isGameComplete) {
      return calculateScore(state.matches, state.mistakes, state.elapsedTime);
    }
    return 0;
  }, [isGameComplete, state.matches, state.mistakes, state.elapsedTime]);

  // Get high scores from localStorage
  const highScores = useMemo(() => {
    return getHighScores();
  }, [isGameComplete]);

  return {
    cards: state.cards,
    mistakes: state.mistakes,
    matches: state.matches,
    cardCount: state.cardCount,
    isMobile: state.isMobile,
    isLoading: state.isLoading,
    hasError: state.hasError,
    maxCards,
    isGameComplete,
    elapsedTime: state.elapsedTime,
    formattedTime: formattedTime(),
    score,
    highScores,
    flipCard,
    increaseCards,
    resetGame,
  };
};

export default useMemoryGame;