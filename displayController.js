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
  for (const child of fragment.children) {
    child.textContent = "";
  }
}

export function populateGrid() {
  for(let i = 0; i < gameContainer.children.length; i++){
    gameContainer.children[i].textContent = gameBoard.moves[i];
  }
}

displayController();



