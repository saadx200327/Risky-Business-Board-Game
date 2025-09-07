import React from 'react';
import './Board.css';

const Board = ({ gameState }) => {
  const boardSpaces = gameState.boardSpaces || 10; // MVP with 10 spaces

  const renderBoardSpace = (spaceIndex) => {
    const isPlayerHere = gameState.playerPosition === spaceIndex;
    
    return (
      <div key={spaceIndex} className={`board-space space-${spaceIndex} ${isPlayerHere ? 'player-here' : ''}`}>
        <div className="space-number">{spaceIndex}</div>
        {isPlayerHere && (
          <div className="player-piece">🎮</div>
        )}
        {spaceIndex === 0 && <div className="space-label">START</div>}
        {spaceIndex === boardSpaces - 1 && <div className="space-label">FINISH</div>}
      </div>
    );
  };

  return (
    <div className="board-container">
      <div className="board">
        {Array.from({ length: boardSpaces }, (_, index) => renderBoardSpace(index))}
      </div>
      
      <div className="game-info">
        <h3>Game Status</h3>
        <p><strong>Position:</strong> {gameState.playerPosition}/{boardSpaces - 1}</p>
        <p><strong>Cash:</strong> ${gameState.playerCash}</p>
        {gameState.isGameWon && gameState.isGameWon() && (
          <p className="win-message">🎉 YOU WON! 🎉</p>
        )}
      </div>
    </div>
  );
};

export default Board;
