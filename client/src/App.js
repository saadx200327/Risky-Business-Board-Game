import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import GameState, { GAME_PHASES } from './GameState';
import { getWeightedRandomCard } from './CardData';

function App() {
  const [gameState, setGameState] = useState(new GameState());
  const [currentState, setCurrentState] = useState(gameState.getState());
  const [currentCard, setCurrentCard] = useState(null);
  const [gameMessages, setGameMessages] = useState([]);
  const [playerSetup, setPlayerSetup] = useState({
    playerCount: 2,
    players: [
      { name: 'Player 1', color: '#FF6B6B' },
      { name: 'Player 2', color: '#4ECDC4' },
      { name: 'Player 3', color: '#45B7D1' },
      { name: 'Player 4', color: '#96CEB4' }
    ]
  });
  const [lastDiceRoll, setLastDiceRoll] = useState(null);

  // Update current state when game state changes
  const updateState = () => {
    const newState = gameState.getState();
    setCurrentState(newState);
  };

  // Add message to game log
  const addMessage = (message) => {
    setGameMessages(prev => [...prev.slice(-9), {
      id: Date.now(),
      text: message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  // Initialize new game
  const startNewGame = () => {
    gameState.reset();
    
    // Set up players
    const players = {};
    for (let i = 0; i < playerSetup.playerCount; i++) {
      const playerData = playerSetup.players[i];
      players[`player_${i + 1}`] = {
        id: `player_${i + 1}`,
        name: playerData.name,
        color: playerData.color,
        position: 0,
        cards: [],
        stats: {
          career: null,
          romance: null,
          money: 1000,
          reputation: 0
        }
      };
    }
    
    gameState.initializeGame(players);
    updateState();
    setCurrentCard(null);
    setLastDiceRoll(null);
    addMessage(`New game started with ${playerSetup.playerCount} players!`);
  };

  // Handle dice roll
  const rollDice = () => {
    if (currentState.phase !== GAME_PHASES.ROLLING) {
      addMessage('Cannot roll dice right now!');
      return;
    }

    const diceValue = gameState.rollDice();
    setLastDiceRoll(diceValue);
    
    const result = gameState.takeTurn(currentState.currentPlayer, diceValue);
    updateState();
    
    if (result.success) {
      const currentPlayer = currentState.players[currentState.currentPlayer];
      addMessage(`${currentPlayer.name} rolled ${diceValue} and moved to position ${result.newPosition}`);
    } else {
      addMessage(`Turn failed: ${result.message}`);
    }
  };

  // Draw a card
  const drawCard = () => {
    if (currentState.phase !== GAME_PHASES.CARD) {
      addMessage('Cannot draw card right now!');
      return;
    }

    const card = getWeightedRandomCard();
    setCurrentCard(card);
    addMessage(`${currentState.players[currentState.currentPlayer].name} drew a ${card.type} card: ${card.title}`);
  };

  // Apply card and continue game
  const applyCard = () => {
    if (!currentCard || currentState.phase !== GAME_PHASES.CARD) return;

    const result = gameState.completeCardPhase(currentState.currentPlayer, currentCard);
    updateState();
    
    if (result.success) {
      const currentPlayer = currentState.players[currentState.currentPlayer];
      addMessage(`Card applied! ${currentCard.description}`);
      
      if (currentCard.effect.money) {
        addMessage(`${currentPlayer.name} ${currentCard.effect.money > 0 ? 'gained' : 'lost'} $${Math.abs(currentCard.effect.money)}`);
      }
      if (currentCard.effect.reputation) {
        addMessage(`${currentPlayer.name} ${currentCard.effect.reputation > 0 ? 'gained' : 'lost'} ${Math.abs(currentCard.effect.reputation)} reputation`);
      }
    }
    
    setCurrentCard(null);
  };

  // Skip card (for testing)
  const skipCard = () => {
    if (currentState.phase !== GAME_PHASES.CARD) return;
    
    const dummyCard = { id: 'skip', type: 'event', title: 'Skip', description: 'Skipped turn', effect: {} };
    gameState.completeCardPhase(currentState.currentPlayer, dummyCard);
    updateState();
    setCurrentCard(null);
    addMessage('Turn skipped!');
  };

  // Update player setup
  const updatePlayerName = (index, name) => {
    setPlayerSetup(prev => ({
      ...prev,
      players: prev.players.map((player, i) => 
        i === index ? { ...player, name } : player
      )
    }));
  };

  // Render game setup
  const renderGameSetup = () => (
    <div className="game-setup">
      <h2>Game Setup</h2>
      
      <div className="player-count-selector">
        <label>Number of Players:</label>
        <select 
          value={playerSetup.playerCount} 
          onChange={(e) => setPlayerSetup(prev => ({ ...prev, playerCount: parseInt(e.target.value) }))}
        >
          <option value={2}>2 Players</option>
          <option value={3}>3 Players</option>
          <option value={4}>4 Players</option>
        </select>
      </div>

      <div className="player-setup">
        <h3>Player Names:</h3>
        {playerSetup.players.slice(0, playerSetup.playerCount).map((player, index) => (
          <div key={index} className="player-input">
            <label>Player {index + 1}:</label>
            <input
              type="text"
              value={player.name}
              onChange={(e) => updatePlayerName(index, e.target.value)}
              placeholder={`Player ${index + 1}`}
            />
            <div 
              className="color-indicator" 
              style={{ backgroundColor: player.color }}
            ></div>
          </div>
        ))}
      </div>

      <button className="start-game-btn" onClick={startNewGame}>
        Start New Game
      </button>
    </div>
  );

  // Render current card
  const renderCurrentCard = () => {
    if (!currentCard) return null;
    
    return (
      <div className="current-card">
        <div className="card">
          <div className={`card-header card-${currentCard.type}`}>
            <h3>{currentCard.title}</h3>
            <span className="card-type">{currentCard.type}</span>
          </div>
          <div className="card-body">
            <p>{currentCard.description}</p>
            {currentCard.effect && (
              <div className="card-effects">
                {currentCard.effect.money && (
                  <div className={`effect ${currentCard.effect.money > 0 ? 'positive' : 'negative'}`}>
                    Money: {currentCard.effect.money > 0 ? '+' : ''}${currentCard.effect.money}
                  </div>
                )}
                {currentCard.effect.reputation && (
                  <div className={`effect ${currentCard.effect.reputation > 0 ? 'positive' : 'negative'}`}>
                    Reputation: {currentCard.effect.reputation > 0 ? '+' : ''}{currentCard.effect.reputation}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="card-actions">
            <button onClick={applyCard} className="apply-btn">Apply Card</button>
            <button onClick={skipCard} className="skip-btn">Skip Turn</button>
          </div>
        </div>
      </div>
    );
  };

  // Render game controls
  const renderGameControls = () => (
    <div className="game-controls">
      <div className="current-player">
        <h3>Current Turn:</h3>
        <div className="player-turn-info">
          <div 
            className="player-color" 
            style={{ backgroundColor: currentState.players[currentState.currentPlayer]?.color }}
          ></div>
          <span>{currentState.players[currentState.currentPlayer]?.name}</span>
          <span className="phase">Phase: {currentState.phase}</span>
        </div>
      </div>
      
      <div className="dice-section">
        {lastDiceRoll && <div className="last-roll">Last Roll: {lastDiceRoll}</div>}
        <button 
          onClick={rollDice} 
          disabled={currentState.phase !== GAME_PHASES.ROLLING}
          className="dice-btn"
        >
          Roll Dice 🎲
        </button>
      </div>
      
      <div className="card-section">
        <button 
          onClick={drawCard} 
          disabled={currentState.phase !== GAME_PHASES.CARD || currentCard !== null}
          className="draw-card-btn"
        >
          Draw Card 🃏
        </button>
      </div>

      <button onClick={startNewGame} className="new-game-btn">
        New Game
      </button>
    </div>
  );

  // Render game messages
  const renderGameMessages = () => (
    <div className="game-messages">
      <h3>Game Log</h3>
      <div className="messages-container">
        {gameMessages.map(message => (
          <div key={message.id} className="message">
            <span className="timestamp">{message.timestamp}</span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎲 Risky Business Board Game 🎲</h1>
        <p>An interactive board game of life, risk, and reward!</p>
      </header>

      <main className="game-container">
        {!currentState.gameStarted ? (
          renderGameSetup()
        ) : (
          <>
            <div className="game-board-section">
              <Board 
                gameState={currentState} 
                players={currentState.players}
              />
            </div>
            
            <div className="game-sidebar">
              {renderGameControls()}
              {currentCard && renderCurrentCard()}
              {renderGameMessages()}
            </div>
          </>
        )}
      </main>
      
      {currentState.gameStarted && currentState.phase === GAME_PHASES.FINISHED && (
        <div className="game-finished">
          <h2>🎉 Game Finished! 🎉</h2>
          <div className="winner">
            {gameState.getWinner() && (
              <p>Winner: {gameState.getWinner().name}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
