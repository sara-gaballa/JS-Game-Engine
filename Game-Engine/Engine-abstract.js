class GameEngine {
  constructor(boardSize, pieces) {
    this.boardSize = boardSize;
    this.pieces = pieces;
    // this.board = Array.from({ length: boardSize[0] }, () => Array.from({ length: boardSize[1] }, () => null));
    const readline = require('readline');
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
    drawBoard(grid){}
    
    isValid(input){
      throw new Error("Method 'isValid()' must be implemented in each class.");
    }
    makeMove(input){ // change state according to given input
      throw new Error("Method 'makeMove()' must be implemented in each class.");
    }
    // controller(input, game,oneOrTwoPlayers) {
    //   console.log("controller");
    //   if(oneOrTwoPlayers == true){ //one player mode
    //     this.play(input, game);
    //   }else{ //2 player mode
    //     // turn will be given from the game
    //     this.play(input, game,turn);
    //   }
    // }
    
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

    takeInputFromUser() {//4a 5c, a, 3a 4, 3a,
      return new Promise(() => {
        this.rl.question('Enter a move: ', (input) => {

          console.log(`You entered, ${input}`);
          console.log('In take input:in the game engine');
        });
      });
    }

    controller(){}

    

  //   play(input, grid, turn){ // two players ==> overloading
  //     if(arguments.length === 3){
  //       console.log("In play: 2 players of the game engine")
  //       this.whichPlayer();
  //       this.play(input,grid);
  //       this.reverseTurns();
  //     }else{ // 1 player ==> overloading
  //       console.log("In play: 1 player of the game engine")
  //     //   while(!(this.isValid(input))){
  //     //     console.log("Invalid move.\nPlease enter a valid move.");
  //     //     input = this.takeInputFromUser();
  //     //   }
  //     //   console.log("After input in play")
  //     //   let newState = this.makeMove(input);
  //     //   this.drawBoard(newState);
  //     // }
  //     while(true){
  //       let input = this.takeInputFromUser();
  //       controller();
  //       this.drawBoard()
  //     }
  //   }
  // }

  // play(grid, turn) { // two players ==> overloading
  //     if (arguments.length === 2) {
  //       console.log('In play: 2 players of the game engine');
  //       this.whichPlayer(turn);
  //       this.play(grid);
  //       this.reverseTurns(turn);
  //     } else { // 1 player ==> overloading
  //       console.log('In play: 1 player of the game engine');
  //       // while (!(this.isValid(input))) {
  //       //   console.log('Invalid move.\nPlease enter a valid move.');
  //       //   input = this.takeInputFromUser();
  //       // }
  //       // console.log('After input in play');
  //       // let newState = this.makeMove(input);
  //       // this.drawBoard(newState);
  //       while(true){
  //         this.takeInputFromUser().then((input) => {
  //           let valid = this.controller(input,grid);
  //           if(valid){
  //             this.drawBoard(grid);
  //           }
  //         });
  //       }
  //     }
  // }

  async play(state,turn){
    // onee player
    if (arguments.length === 1) {
    while(true){
      let valid;
      await this.takeInputFromUser().then((input) => {
        valid = this.controller(state,input);
      });
      if(valid)
        this.drawBoard(state);
      
    }
  }else if(arguments.length === 2) {
    // two players
    while(true){
      let valid;
      await this.takeInputFromUser().then((input) => {
        valid = this.controller(state,input);
      });
      if(valid){
        this.drawBoard(state);
        turn = this.reverseTurns(turn);
      }
    }
  }
  }
    whichPlayer(){
      throw new Error("Method 'whichPlayer()' must be implemented in each class.");
    }
    reverseTurns(){
      throw new Error("Method 'reverseTurns()' must be implemented in each class.");
    } 
}

const game = new GameEngine([8, 8], ["♔", "♚"]);
var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
];
// call the play method
game.play(grid);