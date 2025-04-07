import { describe, it, expect, beforeEach, vi } from 'vitest';
import { calculateScore, saveScore, getHighScores, isHighScore } from '../../utils/scoreUtils';

describe('scoreUtils', () => {
  // Clean the mocked localStorage before each test
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('calculateScore', () => {
    it('should calculate score correctly based on matches, mistakes and time', () => {
      // Base case: 3 matches, 2 mistakes, 60 seconds
      // Calculation: (3 * 100) - (2 * 10) - (60 * 0.5) = 300 - 20 - 30 = 250
      expect(calculateScore(3, 2, 60)).toBe(250);
      
      // No matches
      expect(calculateScore(0, 0, 0)).toBe(0);
      
      // Only mistakes (score should not be negative)
      expect(calculateScore(0, 5, 0)).toBe(0); 
      
      // Many matches, no errors, fast time
      // Calculation: (10 * 100) - (0 * 10) - (30 * 0.5) = 1000 - 0 - 15 = 985
      expect(calculateScore(10, 0, 30)).toBe(985); 
      
      // Rounding case: checks if fractional scores are rounded correctly
      // Calculation: (2 * 100) - (1 * 10) - (15 * 0.5) = 200 - 10 - 7.5 = 182.5 -> 183
      expect(calculateScore(2, 1, 15)).toBe(183);
    });

    it('should never return negative scores', () => {
      // Case where penalties exceed base points
      // Calculation: (1 * 100) - (20 * 10) - (100 * 0.5) = 100 - 200 - 50 = -150 -> should be 0
      expect(calculateScore(1, 20, 100)).toBe(0);
    });
  });

  describe('saveScore & getHighScores', () => {
    it('should save and retrieve scores from localStorage', () => {
      const testScore = {
        username: 'testUser',
        score: 250,
        matches: 3,
        mistakes: 2,
        elapsedTime: 60,
        formattedTime: '01:00'
      };

      saveScore(
        testScore.username,
        testScore.score, 
        testScore.matches, 
        testScore.mistakes, 
        testScore.elapsedTime, 
        testScore.formattedTime
      );

      // Verify that localStorage.setItem was called (implicitly checks saving)
      expect(localStorage.setItem).toHaveBeenCalled();
      
      const highScores = getHighScores();
      
      // Verify that localStorage.getItem was called with the correct key
      expect(localStorage.getItem).toHaveBeenCalledWith('flipzy_high_scores');
      
      // Verify that the saved score is present and correct in the retrieved list
      expect(highScores.length).toBe(1);
      expect(highScores[0].username).toBe('testUser');
      expect(highScores[0].score).toBe(250);
    });
  });

  describe('isHighScore', () => {
    // Assuming a maximum of 3 high scores are kept
    // (Adjust comments if the logic differs, e.g., keeps top 5 or 10)
    
    it('should determine if a score qualifies as high score', () => {
      // With empty localStorage, any score > 0 should be a high score
      expect(isHighScore(100)).toBe(true);
      
      // Simulate 3 existing high scores in localStorage (assuming max capacity is 3)
      const mockScores = [
        { score: 300, username: 'PlayerA' }, // Highest
        { score: 200, username: 'PlayerB' },
        { score: 100, username: 'PlayerC' }  // Lowest
      ];
      localStorage.setItem('flipzy_high_scores', JSON.stringify(mockScores));
      
      // Score higher than the lowest existing high score (should qualify)
      expect(isHighScore(150)).toBe(true);
      
      // Score equal to the lowest existing high score (should not qualify if list is full)
      expect(isHighScore(100)).toBe(false);
      
      // Score lower than the lowest existing high score (should not qualify)
      expect(isHighScore(50)).toBe(false);

      // Score higher than the highest existing high score (should qualify)
       expect(isHighScore(350)).toBe(true);
    });

     it('should return true if high scores list has less than max capacity', () => {
        // Simulate only 2 existing high scores (assuming max capacity is 3 or more)
        const mockScores = [
            { score: 300, username: 'PlayerA' },
            { score: 200, username: 'PlayerB' }
        ];
        localStorage.setItem('flipzy_high_scores', JSON.stringify(mockScores));

        // Any score should qualify if the list isn't full yet
        expect(isHighScore(50)).toBe(true); 
        expect(isHighScore(250)).toBe(true); 
    });
  });
});