import { gameBoard } from './gameBoard.js';
import { game } from './game.js';

let FIRST_TURN = true;
const fragment = document.createDocumentFragment('div');
const gameContainer = document.getElementById('game-container');
// fragment.classList.add('game-co');

export function displayController(){

  for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.id = i;
    square.addEventListener('click', handleClick);
    fragment.appendChild(square);
  }
  gameContainer.appendChild(fragment);
  populateGrid();
}

export function handleClick(event){
  if(FIRST_TURN){
    clearGrid();
    FIRST_TURN = false;
  }
  let move = event.target.id;
  let currentToken = game.currentPlayer.token;
  gameBoard.moves[move] = currentToken;
  event.target.textContent = currentToken;
  game.play();
}

export function clearGrid(){
  for (const child of gameContainer.children) {
    child.textContent = "";
  }
}

export function populateGrid() {
  for(let i = 0; i < gameContainer.children.length; i++){
    gameContainer.children[i].textContent = gameBoard.moves[i];
  }
}

export function displayResult(result){
  const nameContainer = document.getElementById('name-container');
  nameContainer.classList = [];
  if(result === "draw"){
    nameContainer.textContent = 'Match Draw';
  }
  else{
    nameContainer.textContent = `${result} Won`;
  }
  nameContainer.id = "text-div";
  game.reset();
}

document.addEventListener("DOMContentLoaded", function() {
  var player1Input = document.getElementById("player1-input");
  var player2Input = document.getElementById("player2-input");

  player1Input.oninput = function() {
    handleInputChange("player1");
  };

  player2Input.oninput = function() {
    handleInputChange("player2");
  };
});

function handleInputChange(player) {
  var playerElement = document.getElementById(player);
  var inputValue = document.getElementById(player + "-input").value;
  playerElement.textContent = inputValue ? `${inputValue} - X` : `Player${player.slice(-1)} - X`;
}


document.getElementById("player1-input").oninput = handleInputChange;

displayController();



