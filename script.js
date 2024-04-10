// import { displayController } from './displayController';
import { gameBoard } from './gameBoard.js';

let player1 = {
  name: "Player1",
  token:"X",
}

let player2 = {
  name: "Player2",
  token:"O",
}

console.log("Player1 token: X\nPlayer2 token: O");
console.log(gameBoard.printBoard());

const game = {
  result: "",
  moveCount: 0,
  play: (function(){
    while(true){
      if(takeMove(player1) === -1){
        continue;
      }
      if(takeMove(player2) === -1){
        continue;
      }
      if(takeMove(player1) === 1){
        break;
      }
      if(takeMove(player2) === 0){
        break;
      }
    }

    function takeMove(active){
      let move = prompt(`Enter ${active.name} move:`);
        if(checkMove(move) === -1){
          return -1;
        }
        game.moveCount++;
        gameBoard.moves[move] = active.token;
        gameBoard.printBoard();
        if(game.moveCount > 5){
          if(checkWin(active) === 1) return 1;
        }
        if(game.moveCount > 9){
          alert("Match Draw;")
          return 1;
        }
    }

    function checkMove(move){
      if(gameBoard.moves[move] !== move){
        alert("Enter valid move");
      }
    }

    function checkWin(active){
      let arr = gameBoard.moves;
      let board = [
        [arr[0], arr[1], arr[2]],
        [arr[3], arr[4], arr[5]],
        [arr[6], arr[7], arr[8]]
      ];

      // Check rows and columns
      for (let i = 0; i < 3; i++) {
          // Check rows
          if (board[i].every(move => move === active.token)) {
              this.result = active.name;
              return 1;
          }

          // Check columns
          if (board[0][i] === active.token &&
              board[1][i] === active.token &&
              board[2][i] === active.token) {
              this.result = active.name;
              return 1;
          }
      }

      // Check diagonals
      if ((board[0][0] === active.token && board[1][1] === active.token && board[2][2] === active.token) ||
          (board[0][2] === active.token && board[1][1] === active.token && board[2][0] === active.token)) {
          this.result = active.name;
          return 1;
      }
    }
  }),
}

game.play();