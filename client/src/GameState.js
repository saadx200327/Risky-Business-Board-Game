// GameState.js - Utility for handling basic game logic

class GameState {
  constructor() {
    this.players = {};
    this.currentPlayer = null;
    this.turnNumber = 1;
    this.phase = 'waiting'; // waiting, rolling, moving, card, finished
    this.boardSpaces = 40;
    this.gameStarted = false;
  }

  // Initialize game with players
  initializeGame(playerData) {
    this.players = { ...playerData };
    const playerIds = Object.keys(this.players);
    if (playerIds.length > 0) {
      this.currentPlayer = playerIds[0];
      this.gameStarted = true;
      this.phase = 'rolling';
    }
    return this.getState();
  }

  // Add a new player to the game
  addPlayer(playerId, playerData) {
    this.players[playerId] = {
      id: playerId,
      name: playerData.name,
      color: playerData.color,
      position: 0,
      cards: [],
      stats: {
        career: null,
        romance: null,
        money: 0,
        reputation: 0
      },
      ...playerData
    };
    return this.getState();
  }

  // Remove a player from the game
  removePlayer(playerId) {
    if (this.players[playerId]) {
      delete this.players[playerId];
      const remainingPlayers = Object.keys(this.players);
      if (this.currentPlayer === playerId && remainingPlayers.length > 0) {
        this.currentPlayer = remainingPlayers[0];
      }
    }
    return this.getState();
  }

  // Roll dice (returns 1-6)
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Move player by specified number of spaces
  movePlayer(playerId, steps) {
    if (!this.players[playerId]) return null;
    
    const currentPosition = this.players[playerId].position;
    let newPosition = currentPosition + steps;
    
    // Handle board wrap-around or end game
    if (newPosition >= this.boardSpaces) {
      newPosition = this.boardSpaces - 1;
      this.phase = 'finished';
    }
    
    this.players[playerId].position = newPosition;
    return newPosition;
  }

  // Handle player turn logic
  takeTurn(playerId, diceRoll) {
    if (this.currentPlayer !== playerId || this.phase !== 'rolling') {
      return { success: false, message: 'Not your turn or invalid phase' };
    }

    // Move player
    const newPosition = this.movePlayer(playerId, diceRoll);
    
    if (newPosition !== null) {
      this.phase = 'card'; // Player needs to draw a card after moving
      return { 
        success: true, 
        newPosition, 
        message: `Moved to position ${newPosition}` 
      };
    }
    
    return { success: false, message: 'Move failed' };
  }

  // Draw a random card (placeholder logic)
  drawCard(cardType = null) {
    const cardTypes = ['event', 'career', 'romance', 'social'];
    const selectedType = cardType || cardTypes[Math.floor(Math.random() * cardTypes.length)];
    
    return {
      type: selectedType,
      id: `${selectedType}_${Date.now()}`,
      title: `Sample ${selectedType} Card`,
      description: `This is a sample ${selectedType} card description.`,
      effect: {
        money: Math.floor(Math.random() * 1000) - 500,
        reputation: Math.floor(Math.random() * 10) - 5
      }
    };
  }

  // Apply card effects to player
  applyCardEffect(playerId, card) {
    if (!this.players[playerId] || !card) return false;
    
    const player = this.players[playerId];
    
    // Apply card effects
    if (card.effect) {
      if (card.effect.money) {
        player.stats.money += card.effect.money;
      }
      if (card.effect.reputation) {
        player.stats.reputation += card.effect.reputation;
      }
    }
    
    // Add card to player's collection
    player.cards.push(card);
    
    return true;
  }

  // Complete card phase and move to next player
  completeCardPhase(playerId, card) {
    if (this.currentPlayer !== playerId || this.phase !== 'card') {
      return { success: false, message: 'Invalid card phase completion' };
    }
    
    // Apply card effect
    this.applyCardEffect(playerId, card);
    
    // Move to next player
    this.nextPlayer();
    
    return { success: true, card };
  }

  // Move to next player's turn
  nextPlayer() {
    const playerIds = Object.keys(this.players);
    if (playerIds.length === 0) return;
    
    const currentIndex = playerIds.indexOf(this.currentPlayer);
    const nextIndex = (currentIndex + 1) % playerIds.length;
    
    // If we've completed a full round, increment turn number
    if (nextIndex === 0) {
      this.turnNumber++;
    }
    
    this.currentPlayer = playerIds[nextIndex];
    this.phase = 'rolling';
  }

  // Get current game state
  getState() {
    return {
      players: this.players,
      currentPlayer: this.currentPlayer,
      turnNumber: this.turnNumber,
      phase: this.phase,
      gameStarted: this.gameStarted,
      boardSpaces: this.boardSpaces
    };
  }

  // Check if game is finished
  isGameFinished() {
    return this.phase === 'finished';
  }

  // Get winner (player who reached the end)
  getWinner() {
    if (!this.isGameFinished()) return null;
    
    const finishedPlayers = Object.values(this.players)
      .filter(player => player.position >= this.boardSpaces - 1)
      .sort((a, b) => b.stats.money + b.stats.reputation - (a.stats.money + a.stats.reputation));
    
    return finishedPlayers.length > 0 ? finishedPlayers[0] : null;
  }

  // Reset game state
  reset() {
    this.players = {};
    this.currentPlayer = null;
    this.turnNumber = 1;
    this.phase = 'waiting';
    this.gameStarted = false;
  }
}

// Export the GameState class
export default GameState;

// Export utility functions
export const createGameState = () => new GameState();

export const GAME_PHASES = {
  WAITING: 'waiting',
  ROLLING: 'rolling',
  MOVING: 'moving',
  CARD: 'card',
  FINISHED: 'finished'
};

export const CARD_TYPES = {
  EVENT: 'event',
  CAREER: 'career',
  ROMANCE: 'romance',
  SOCIAL: 'social'
};
