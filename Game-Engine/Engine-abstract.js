
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


  init(){

  } 


  async play(){
    let {grid, noOfPlayers}= this.init();
    
    console.log("play");
    this.drawBoard(grid);
    let exitLoop = false;
    while(!exitLoop){
      await new Promise(resolve => setTimeout(resolve, 100));
      const input = await this.takeInputFromUser();
      console.log("input: ",input);
      //const input = [5,0,4,1];
      if(this.isValid(input,grid)){
        console.log("valid");
        this.makeMove(input,grid);
        this.drawBoard(grid);
        this.reverseTurns();

      }else {
        console.log("Invalid");
      }
      
      
      // If some condition is met, exit the loop
      if (input == "4") {
        exitLoop = true;
      }
    }
    
    // if(this.valid){
    //   this.makeMove();
    //   this.drawBoard(grid);
    // }else{
    //   console.log("invalid");
    // }
    
    // let turn = 0;
    // let {grid, noOfPlayers} = this.init();
    // if(noOfPlayers === 2){
    //   turn = 1;
    // }
    // while(true){
    //   let valid;
    //   await this.takeInputFromUser().then((input) => {
    //     valid = this.controller(grid,input);
    //   });
    //   if(valid){
    //     this.drawBoard(state);
    //     if(noOfPlayers === 2)
    //       turn = this.reverseTurns(turn);
    //   }
    // }
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

// game.play();
// module.exports = Checkers;