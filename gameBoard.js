export const gameBoard = {
  moves: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  printBoard: function() {
    let flag = 0;
    let str = "";
    for (let move of this.moves) {
      flag++;
      if(flag % 3 !== 0){
        str = str + ` ${move} |`;
      }
      else{
        str = str + ` ${move}`;
        console.log(`${str} \n`);
        str = "";
      }
    }
    console.log("\n");
  },
};