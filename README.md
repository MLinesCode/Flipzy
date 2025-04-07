# 🎮 Flipzy - Memory Card Game

<div align="center">
  <br>
  <img src="https://res.cloudinary.com/mlinescode/image/upload/v1744012251/flipzy-logo_qezmbm.png" />
  <h3>A classic memory game built with React and Vite</h3>
</div>

## 📌 Demo

You can try the live demo deployed on Vercel: [Flipzy Demo](https://flipzy-game.vercel.app/)

## 📝 Description

Flipzy is a classic memory card game built with React where players need to find matching pairs of animal cards. The game includes features like user persistence, increasing difficulty levels, and a responsive design for both mobile and desktop devices.

## ✨ Features

- **User Authentication**: Simple username entry with localStorage persistence
- **Responsive Design**: Optimized layouts for both mobile and desktop
- **Dynamic Difficulty**: Ability to increase the number of cards as you progress
- **Score Tracking**: Tracks matches and mistakes
- **Visual Feedback**: Card flip animations and match highlighting
- **Progress Indicator**: Visual progress bar showing completion status
- **Error Handling**: Graceful handling of API errors with retry options
- **Victory Screen**: Celebration screen upon game completion
- **High Scores**: Top 3 scores saved locally and displayed after completing the game
- **PWA Support**: Installable as a Progressive Web App for offline play
- **Accessibility**: Keyboard navigation and screen reader support

## 🛠️ Technologies Used

<div align="center">

| Technology | Description |
|------------|-------------|
| **React 19** | For building the user interface |
| **Vite** | For fast development and optimized builds |
| **Tailwind CSS** | For styling |
| **React Hooks & Reducers** | For state management |
| **ES6+** | Modern JavaScript features |
| **Fetch API** | For data retrieval |
| **LocalStorage** | For user persistence |
| **Vitest** | For unit testing |
| **Testing Library** | For component testing |
| **ESLint** | For code linting |
| **PWA** | For offline capabilities |

</div>

## 📂 Project Structure

```
src/
├── assets/           # Static assets and images
├── components/       # React UI components
│   ├── Board.jsx     # Game board component
│   ├── Card.jsx      # Individual card component
│   ├── HighScores.jsx # High scores display component
│   ├── Notification.jsx # Notification display component
│   ├── Scoreboard.jsx # Score tracking component
│   ├── UserModal.jsx # User login component
│   └── VictoryMessage.jsx # End game celebration component
├── hooks/
│   └── useMemoryGame.js # Custom hook with game reducer and logic
├── services/
│   └── api.js        # API interaction and data fetching
├── styles/           # Additional CSS styles
│   └── card.css      # Card-specific styles
├── utils/
│   └── scoreUtils.js # Score calculation and persistence utilities
├── __tests__/        # Test files
│   └── utils/        # Utility tests
├── test/             # Test setup and configuration
├── App.jsx           # Main application component
└── main.jsx         # Application entry point
```

## 🚀 Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flipzy.git
   cd flipzy
   ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Start the development server:
  ```bash
  npm run dev
  ```

4. Build for production:
  ```bash
  npm run build
  ```

5. Run test
  ```bash
  npm test
  ```

6. Test coverage
  ```bash
  npm run test:coverage
  ```

## 📖 How to Play
<div align="center">
  <table>
    <tr>
      <td align="center">1️⃣</td>
      <td>Enter your username to start the game</td>
    </tr>
    <tr>
      <td align="center">2️⃣</td>
      <td>Click on cards to flip them</td>
    </tr>
    <tr>
      <td align="center">3️⃣</td>
      <td>Try to find matching pairs of animals</td>
    </tr>
    <tr>
      <td align="center">4️⃣</td>
      <td>Click "Add Cards" to add more cards (increasing difficulty)</td>
    </tr>
    <tr>
      <td align="center">5️⃣</td>
      <td>Click "Reset Game" to restart at any time</td>
    </tr>
    <tr>
      <td align="center">6️⃣</td>
      <td>Complete the game by matching all pairs</td>
    </tr>
  </table>
</div>


## 🏗️ Application Architecture
State Management
Flipzy uses a custom hook (useMemoryGame) that implements the reducer pattern for state management. This provides a centralized way to handle all game-related state and logic, including:

* Card flipping
* Match checking
* Score tracking
* Game reset
* Difficulty adjustment
* Timer management

### API Integration
The application fetches animal data from an external API to generate the memory cards. The API service includes:

* Data fetching with error handling
* Response caching to minimize network requests
* Optimized data mapping for the game's needs

### Responsive Desing
The game adapts to different screen sizes:

* Mobile view: 3 columns of cards with maximum 12 cards
* Desktop view: 5 columns of cards with maximum 40 cards

### Testing Strategy
The project implements a comprehensive testing approach:

* Unit tests for utility functions
* Component tests for UI elements
* Mock implementations for localStorage and API calls

### 🤔 Development Decisions
### Why React with Reducer Pattern?
I chose to use the reducer pattern with React Hooks to centralize game logic and state management. This provides better separation of concerns and makes the game state transitions more predictable and testable.

### Why Tailwind CSS?
Tailwind allows for rapid UI development with consistent design. The utility-first approach made it easy to create responsive layouts and consistent card designs while maintaining a cohesive visual language throughout the application.

### Performance Considerations

⚡ API response caching to minimize network requests
⚡ Efficient state updates using the reducer pattern
⚡ Memoization of derived state values
⚡ Proper cleanup of timers and event listeners
⚡ PWA configuration for offline capability

#### 🔮 Future Improvements
### Short-term Enhancements

* Multiple Themes: Add themes beyond animals (vehicles, places, foods)
* Sound Effects: Add audio feedback for card flips and matches
* Timer Modes: Add timed challenges with countdown timers
* Difficulty Levels: Implement predefined difficulty settings (easy, medium, hard)
* Game Statistics: Track and display more detailed player statistics

### Medium-term Features

* Backend Integration: Replace localStorage with a server-backed persistence system
* User Accounts: Add proper authentication and user profiles
* Global Leaderboards: Implement global high scores across all players
* Custom Card Sets: Allow users to create and share custom card sets
* Animations: Enhance victory celebrations and transitions
* Add animations for matched pairs
* Implement a multiplayer mode
