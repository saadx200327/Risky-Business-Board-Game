import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import GameState from './GameState';
import { getWeightedRandomCard } from './CardData';

function App() {
  const [gameState, setGameState] = useState(new GameState());
  const [currentState, setCurrentState] = useState(gameState.getState());
  const [currentCard, setCurrentCard] = useState(null);
  const [lastDiceRoll, setLastDiceRoll] = useState(null);

  // Update current state
  const updateState = () => {
    const newState = gameState.getState();
    setCurrentState(newState);
  };

  // Start new game
  const startGame = () => {
    gameState.startGame();
    updateState();
    setCurrentCard(null);
    setLastDiceRoll(null);
  };

  // Restart game
  const restartGame = () => {
    gameState.reset();
    updateState();
    setCurrentCard(null);
    setLastDiceRoll(null);
  };

  // Roll dice and move player
  const rollDice = () => {
    const diceValue = gameState.rollDice();
    setLastDiceRoll(diceValue);
    
    const newPosition = gameState.movePlayer(diceValue);
    updateState();
    
    // Auto-draw card after moving
    setTimeout(() => {
      drawCard();
    }, 500);
  };

  // Draw a random card
  const drawCard = () => {
    const card = getWeightedRandomCard();
    setCurrentCard(card);
  };

  // Apply card effects
  const applyCard = () => {
    if (currentCard) {
      gameState.applyCard(currentCard);
      updateState();
      setCurrentCard(null);
    }
  };

  if (!currentState.gameStarted) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>🎲 Risky Business Board Game 🎲</h1>
          <p>A minimum viable playable board game!</p>
          <button onClick={startGame} className="start-btn">
            Start Game
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎲 Risky Business Board Game 🎲</h1>
      </header>
      
      <main className="game-container">
        <div className="game-board-section">
          <Board gameState={currentState} />
        </div>
        
        <div className="game-controls">
          <div className="dice-section">
            {lastDiceRoll && (
              <div className="last-roll">
                Last Roll: <strong>{lastDiceRoll}</strong>
              </div>
            )}
            <button 
              onClick={rollDice} 
              disabled={!!currentCard}
              className="roll-btn"
            >
              🎲 Roll Dice
            </button>
          </div>
          
          {currentCard && (
            <div className="current-card">
              <div className="card">
                <h3>{currentCard.title}</h3>
                <p className="card-type">{currentCard.type.toUpperCase()}</p>
                <p className="card-description">{currentCard.description}</p>
                {currentCard.effect && currentCard.effect.money && (
                  <p className={`money-effect ${currentCard.effect.money > 0 ? 'positive' : 'negative'}`}>
                    Money: {currentCard.effect.money > 0 ? '+' : ''}${currentCard.effect.money}
                  </p>
                )}
                <button onClick={applyCard} className="apply-btn">
                  Apply Card
                </button>
              </div>
            </div>
          )}
          
          <div className="game-actions">
            <button onClick={restartGame} className="restart-btn">
              🔄 Restart Game
            </button>
          </div>
        </div>
      </main>
      
      {gameState.isGameWon() && (
        <div className="win-message">
          <h2>🎉 Congratulations! You reached the finish! 🎉</h2>
          <p>Final Cash: ${currentState.playerCash}</p>
          <button onClick={restartGame} className="play-again-btn">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
