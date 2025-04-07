/**
 * Calculate score based on matches, mistakes and elapsed time
 * 
 * Formula: 
 * Base points for each match (100) 
 * minus penalty for mistakes (10 points per mistake)
 * minus time penalty (0.5 points per second)
 * 
 * @param {number} matches - Number of matches found
 * @param {number} mistakes - Number of mistakes made
 * @param {number} elapsedTime - Time taken in seconds
 * @returns {number} - Final score (minimum 0)
 */
export const calculateScore = (matches, mistakes, elapsedTime) => {
  const basePoints = matches * 100;
  const mistakePenalty = mistakes * 10;
  const timePenalty = elapsedTime * 0.5;
  
  const score = Math.max(0, basePoints - mistakePenalty - timePenalty);
  return Math.round(score); // Round to nearest integer
};

/**
 * Save a new score to localStorage
 * 
 * @param {string} username - Player's username
 * @param {number} score - Calculated score
 * @param {number} matches - Number of matches found
 * @param {number} mistakes - Number of mistakes made
 * @param {number} elapsedTime - Time taken in seconds
 * @param {string} formattedTime - Time formatted as MM:SS
 */
export const saveScore = (username, score, matches, mistakes, elapsedTime, formattedTime) => {
  // Get existing scores or initialize empty array
  const existingScores = getHighScores();
  
  // Create new score entry
  const newScore = {
    username,
    score,
    matches,
    mistakes,
    elapsedTime,
    formattedTime,
    date: new Date().toISOString()
  };
  
  // Add new score to array
  existingScores.push(newScore);
  
  // Sort by score in descending order
  const sortedScores = existingScores.sort((a, b) => b.score - a.score);
  
  // Keep only top 3 scores
  const topScores = sortedScores.slice(0, 3);
  
  // Save to localStorage
  localStorage.setItem('flipzy_high_scores', JSON.stringify(topScores));
  
  return topScores;
};

/**
 * Get high scores from localStorage
 * 
 * @returns {Array} - Array of high score objects
 */
export const getHighScores = () => {
  const scores = localStorage.getItem('flipzy_high_scores');
  return scores ? JSON.parse(scores) : [];
};

/**
 * Check if a score qualifies as a high score
 * 
 * @param {number} score - Score to check
 * @returns {boolean} - True if score is a high score
 */
export const isHighScore = (score) => {
  const highScores = getHighScores();
  
  // If we have less than 3 scores, it's automatically a high score
  if (highScores.length < 3) {
    return true;
  }
  
  // Otherwise, check if score is higher than the lowest high score
  const lowestHighScore = Math.min(...highScores.map(s => s.score));
  return score > lowestHighScore;
};