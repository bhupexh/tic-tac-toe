import { game, gameBoard } from './game.js';

let FIRST_TURN = true;
const fragment = document.createDocumentFragment('div');
const gameContainer = document.getElementById('game-container');
const nameContainer = document.getElementById('name-container');
document.getElementById('restart').addEventListener('click', game.reset);

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
    if(nameContainer.id === "text-div"){
      nameContainer.id = "name-container";
    }
    clearGrid();
    FIRST_TURN = false;
  }
  let move = event.target.id;
  let currentToken = game.currentPlayer.token;
  if(invalidMove(move)){
    alert("already taken.");
    return;
  }
  gameBoard.moves[move] = currentToken;
  event.target.textContent = currentToken;
  game.play();
}

function invalidMove(move) {
  if(gameBoard.moves[move] != Number(move) + 1){
    return true;
  }
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



