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
| **LocalStorage** | For user persistence and high scores |
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
│   ├── Board.jsx     # Game board with card grid and controls
│   ├── Card.jsx      # Individual flippable card component
│   ├── HighScores.jsx # Top 3 high scores display
│   ├── Notification.jsx # Transient notification banner
│   ├── Scoreboard.jsx # Live game stats (time, matches, errors)
│   ├── UserModal.jsx # Username entry / update modal
│   └── VictoryMessage.jsx # End-game celebration screen
├── hooks/
│   └── useMemoryGame.js # Custom hook: game state via useReducer
├── services/
│   └── api.js        # Animal data fetching with in-session cache
├── styles/           # Additional CSS styles
│   └── card.css      # Card flip animation styles
├── utils/
│   └── scoreUtils.js # Score calculation and localStorage helpers
├── __tests__/        # Test files
│   └── utils/        # Unit tests for utility functions
├── test/             # Test setup and configuration
├── App.jsx           # Root component – wires all pieces together
└── main.jsx          # Application entry point
```

## 🚀 Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MLinesCode/Flipzy.git
   cd Flipzy
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

5. Preview the production build:
   ```bash
   npm run preview
   ```

6. Run tests:
   ```bash
   npm test
   ```

7. Run tests with coverage report:
   ```bash
   npm run test:coverage
   ```

8. Lint the codebase:
   ```bash
   npm run lint
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

## 🧩 Component Reference

| Component | Props | Description |
|-----------|-------|-------------|
| `Board` | `cards`, `flipCard`, `increaseCards`, `resetGame`, `cardCount`, `maxCards`, `isLoading`, `hasError`, `isMobile` | Renders the card grid, loading/error states and the Add Cards / Reset Game controls |
| `Card` | `card`, `flipCard` | Renders a single card with a 3-D flip animation; card status can be `hidden`, `flipped`, or `matched` |
| `Scoreboard` | `mistakes`, `matches`, `total`, `formattedTime` | Displays live game stats and a progress bar |
| `UserModal` | `setUser`, `currentUser`, `isUpdating`, `onClose` | Modal dialog for entering or updating the player username |
| `VictoryMessage` | `username`, `formattedTime`, `mistakes`, `matches`, `score`, `resetGame` | End-game celebration screen with final stats |
| `HighScores` | `scores`, `currentScore` | Displays the top-3 persisted high scores, highlighting the current session's entry |
| `Notification` | `message`, `type`, `onClose`, `duration` | Auto-dismissing toast notification (`success` / `error` / `info`) |

## 🏗️ Application Architecture

### State Management

Flipzy uses a custom hook (`useMemoryGame`) that implements the reducer pattern for state management. This provides a centralized way to handle all game-related state and logic, including:

- Card flipping
- Match checking
- Score tracking
- Game reset
- Difficulty adjustment
- Timer management

### Score Formula

```
Score = (matches × 100) − (mistakes × 10) − (elapsedTime × 0.5)
```

The result is rounded to the nearest integer and floored at 0. The top 3 scores are persisted in `localStorage` under the key `flipzy_high_scores`.

### API Integration

The application fetches animal data from an external API to generate the memory cards. The API service (`src/services/api.js`) includes:

- Data fetching with error handling
- In-session response caching to avoid duplicate network requests
- Optimized data mapping for the game's needs (`id`, `name`, `image`)

### Responsive Design

The game adapts to different screen sizes:

- **Mobile** (< 768 px): 3-column grid, maximum 12 cards
- **Desktop** (≥ 768 px): 5-column grid, maximum 40 cards

### Testing Strategy

The project implements a comprehensive testing approach:

- Unit tests for utility functions (`scoreUtils.js`)
- Component tests for UI elements
- Mock implementations for `localStorage` and API calls

## 🤔 Development Decisions

### Why React with Reducer Pattern?

The reducer pattern with React Hooks centralizes game logic and state management. This provides better separation of concerns and makes game state transitions more predictable and testable.

### Why Tailwind CSS?

Tailwind allows for rapid UI development with consistent design. The utility-first approach made it easy to create responsive layouts and consistent card designs while maintaining a cohesive visual language throughout the application.

### Performance Considerations

- ⚡ API response caching to minimize network requests
- ⚡ Efficient state updates using the reducer pattern
- ⚡ Memoization of derived state values (`useMemo`, `useCallback`)
- ⚡ Proper cleanup of timers and event listeners
- ⚡ PWA configuration for offline capability

## 🔮 Future Improvements

### Short-term Enhancements

- **Multiple Themes**: Add themes beyond animals (vehicles, places, foods)
- **Sound Effects**: Add audio feedback for card flips and matches
- **Timer Modes**: Add timed challenges with countdown timers
- **Difficulty Levels**: Implement predefined difficulty settings (easy, medium, hard)
- **Game Statistics**: Track and display more detailed player statistics

### Medium-term Features

- **Backend Integration**: Replace localStorage with a server-backed persistence system
- **User Accounts**: Add proper authentication and user profiles
- **Global Leaderboards**: Implement global high scores across all players
- **Custom Card Sets**: Allow users to create and share custom card sets
- **Enhanced Animations**: Improve victory celebrations and card-match transitions
- **Multiplayer Mode**: Allow two players to compete on the same device

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.
