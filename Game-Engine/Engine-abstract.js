
export class GameEngine {// 
  constructor() {//boardSize, pieces
    // this.boardSize = boardSize;
    // this.pieces = pieces;
    // this.board = Array.from({ length: boardSize[0] }, () => Array.from({ length: boardSize[1] }, () => null));


    // const readline = require('readline');
    // this.rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout
    // });
  }
    drawBoard(grid){}

    controller(grid,input){} // return grid, boolean that is valid
    
    isValid(input,grid){ // return boolean
      throw new Error("Method 'isValid()' must be implemented in each class.");
    }

    makeMove(input,grid){ // return grid 
      throw new Error("Method 'makeMove()' must be implemented in each class.");
    }
    
    
    // takeInputFromUser(){ // 4a 5, 4a ['4a', '5']
    //   let input = prompt("Enter input");
    //   // throw new Error("Method 'takeInputFromUser()' must be implemented in each class.");
    //   if(arguments.length === 2){
    //     // chess or checkers or sudoko

    //   }if(arguments.length === 1){
    //     // 8 queens or connect or XO
    //   }
    //   return input;
    // }

    takeInputFromUser() { // called by play
      //4a 5c, a, 3a 4, 3a,
      return new Promise(() => {
        this.rl.question('Enter a move: ', (input) => {
          console.log(`You entered, ${input}`);
          console.log('In take input:in the game engine');
        });
      });
    }


  init(){} 


  async play(){
    let turn = 0;
    let {grid, noOfPlayers} = this.init();
    if(noOfPlayers === 2){
      turn = 1;
    }
    while(true){
      let valid;
      await this.takeInputFromUser().then((input) => {
        valid = this.controller(grid,input);
      });
      if(valid){
        this.drawBoard(state);
        if(noOfPlayers === 2)
          turn = this.reverseTurns(turn);
      }
    }
  }
  

  whichPlayer(){
    throw new Error("Method 'whichPlayer()' must be implemented in each class.");
  }
  reverseTurns(turn){
    return -1 * turn;
  } 
}

// const game = new GameEngine();

// const game = new Checkers(grid);
// var grid = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 1, 1, 1]
// ];
// game.play();
// module.exports = Checkers;