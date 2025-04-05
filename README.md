# 🎮 Flipzy - Memory Card Game

<div align="center">
  <br>
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

</div>

## 📂 Project Structure

```
src/
├── assets/           # Static assets
├── components/       # React components
│   ├── Board.jsx     # Game board component
│   ├── Card.jsx      # Individual card component
│   ├── Scoreboard.jsx # Score tracking component
│   └── UserModal.jsx # User login component
├── hooks/
│   └── useMemoryGame.js # Custom hook for game logic
├── services/
│   └── api.js        # API interaction
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
      <td>Click "Increase Cards" to add more cards (increasing difficulty)</td>
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

Card flipping
Match checking
Score tracking
Game reset
Difficulty adjustment

### API Integration
The application fetches animal data from an external API to generate the memory cards. The API service includes:

### Data fetching with error handling
Response caching to minimize network requests
Optimized data mapping for the game's needs

### Responsive Design
The game adapts to different screen sizes:

Mobile view: 3 columns of cards with max 12 cards
Desktop view: 5 columns of cards with max 40 cards

### 🤔 Development Decisions
Why React with Reducer Pattern?
I chose to use the reducer pattern with React Hooks to centralize game logic and state management. This provides better separation of concerns and makes the game state transitions more predictable.
Why Tailwind CSS?
Tailwind allows for rapid UI development with consistent design. The utility-first approach made it easy to create responsive layouts and consistent card designs.
Performance Considerations

⚡ Card images are efficiently loaded from the API
⚡ Caching mechanism prevents redundant API calls
⚡ Game state is optimized to prevent unnecessary re-renders
⚡ Timeout cleanup on unmount prevents memory leaks

#### 🔮 Future Improvements

Add difficulty levels (easy, medium, hard)
Implement a timer and high score system
Add sound effects for card flips and matches
Create additional themes beyond animals
Add animations for matched pairs
Implement a multiplayer mode
