import { displayController, populateGrid, displayResult } from './displayController.js';

export const gameBoard = {
  moves: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
};

// Player objects
const player1 = {
  name: "Player 1",
  token: "X",
  button: document.getElementById('player1'),
};

const player2 = {
  name: "Player 2",
  token: "O",
  button: document.getElementById('player2'),
};

// Game object
export const game = {
  currentPlayer: player1,
  changeTurn: function() {
    this.currentPlayer = (this.currentPlayer === player1) ? player2 : player1;
    player1.button.classList.toggle("bg-blue-300");
    player2.button.classList.toggle("bg-blue-300");
  },

  result: "",
  moveCount: 0,

  // Main game loop
  play: function() {
    this.moveCount++;
    if(this.checkWin(this.currentPlayer)){
      displayResult(this.result);
      return;
    }
    if(this.moveCount > 8){
      displayResult("draw");
      return;
    }
    this.changeTurn();
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

  reset: function() {
    this.currentPlayer = player1;
    player1.button.classList.add("bg-blue-300");
    player2.button.classList.remove("bg-blue-300");
    gameBoard.moves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.result="";
    this.moveCount=0;
    populateGrid();
  },
};