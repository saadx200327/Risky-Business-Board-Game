import React from 'react';
import './Board.css';

const Board = ({ gameState, players }) => {
  const boardSpaces = 40; // Total spaces on the board

  const renderPlayerPiece = (playerId, position) => {
    return (
      <div
        key={playerId}
        className={`player-piece player-${playerId}`}
        style={{
          backgroundColor: players[playerId]?.color || '#333',
        }}
      >
        {players[playerId]?.name?.charAt(0) || 'P'}
      </div>
    );
  };

  const renderBoardSpace = (spaceIndex) => {
    const playersOnSpace = Object.keys(players).filter(
      playerId => players[playerId].position === spaceIndex
    );

    return (
      <div key={spaceIndex} className={`board-space space-${spaceIndex}`}>
        <div className="space-number">{spaceIndex}</div>
        <div className="players-container">
          {playersOnSpace.map(playerId => renderPlayerPiece(playerId, spaceIndex))}
        </div>
        {spaceIndex === 0 && <div className="space-label">START</div>}
        {spaceIndex === 39 && <div className="space-label">END</div>}
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
        <p>Current Turn: {gameState.currentPlayer}</p>
        <p>Turn Number: {gameState.turnNumber}</p>
        <p>Phase: {gameState.phase}</p>
      </div>

      <div className="players-info">
        <h3>Players</h3>
        {Object.keys(players).map(playerId => (
          <div key={playerId} className={`player-info player-${playerId}`}>
            <div
              className="player-color"
              style={{ backgroundColor: players[playerId].color }}
            ></div>
            <span>{players[playerId].name}</span>
            <span>Position: {players[playerId].position}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
