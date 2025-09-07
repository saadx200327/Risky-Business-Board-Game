// GameState.js - Simplified game logic for MVP
class GameState {
  constructor() {
    this.playerPosition = 0;
    this.playerCash = 1000;
    this.gameStarted = false;
    this.boardSpaces = 10; // MVP with 10 spaces
    this.currentCard = null;
  }

  // Initialize new game
  startGame() {
    this.playerPosition = 0;
    this.playerCash = 1000;
    this.gameStarted = true;
    this.currentCard = null;
  }

  // Reset game
  reset() {
    this.playerPosition = 0;
    this.playerCash = 1000;
    this.gameStarted = false;
    this.currentCard = null;
  }

  // Roll dice (returns 1-6)
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // Move player forward
  movePlayer(steps) {
    this.playerPosition = Math.min(this.playerPosition + steps, this.boardSpaces - 1);
    return this.playerPosition;
  }

  // Apply card effects
  applyCard(card) {
    if (card.effect && card.effect.money) {
      this.playerCash += card.effect.money;
    }
  }

  // Get current game state
  getState() {
    return {
      playerPosition: this.playerPosition,
      playerCash: this.playerCash,
      gameStarted: this.gameStarted,
      boardSpaces: this.boardSpaces,
      currentCard: this.currentCard
    };
  }

  // Check if game is won
  isGameWon() {
    return this.playerPosition >= this.boardSpaces - 1;
  }
}

export default GameState;

// Export utility constants
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
