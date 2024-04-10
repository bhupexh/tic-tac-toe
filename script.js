// Import statements
// import { displayController } from './displayController';
import { gameBoard } from './gameBoard.js';

// Player objects
const player1 = {
  name: "Player 1",
  token: "X",
};

const player2 = {
  name: "Player 2",
  token: "O",
};

// Game object
const game = {
  result: "",
  moveCount: 0,

  // Main game loop
  play: function() {
    console.log(`${player1.name} token: X\n${player2.name} token: O`);
    console.log(gameBoard.printBoard());

    while (!this.result) {
      this.takeTurn(player1);
      if (this.checkWin(player1)) break;

      this.takeTurn(player2);
      if (this.checkWin(player2)) break;
    }

    console.log(`Game over. ${this.result} wins!`);
  },

  // Function to handle a player's turn
  takeTurn: function(player) {
    let move;
      do {
        move = prompt(`Enter ${player.name} move (0-8):`);
      } while (!this.isValidMove(move));
    

    gameBoard.moves[move] = player.token;
    gameBoard.printBoard();
    this.moveCount++;
  },

  // Function to validate move
  isValidMove: function(move) {
    if (isNaN(move) || move < 0 || move > 8 || gameBoard.moves[move] !== move) {
      alert("Enter a valid move (0-8).");
      return false;
    }
    return true;
  },

  // Function to check for win
  checkWin: function(player) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const moves = gameBoard.moves;
    for (const line of lines) {
      if (line.every(move => moves[move] === player.token)) {
        this.result = player.name;
        return true;
      }
    }
    return false;
  },
};
// Start the game
game.play();
