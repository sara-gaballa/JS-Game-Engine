export class GameEngine {
    constructor(boardSize, pieces) {
      this.boardSize = boardSize;
      this.pieces = pieces;
      // this.board = Array.from({ length: boardSize[0] }, () => Array.from({ length: boardSize[1] }, () => null));
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
    
    takeInputFromUser(){
      console.log("In take input:in the game engine")
      // must be implemented
      // return [fromRow,fromCol,toRow,toCol];
    }

    play(input, grid, turn){ // two players ==> overloading
      if(arguments.length === 3){
        console.log("In play: 2 players of the game engine")
        this.whichPlayer();
        this.play(input,grid);
        this.reverseTurns();
      }else{ // 1 player ==> overloading
        console.log("In play: 1 player of the game engine")
        while(!(this.isValid(input))){
          console.log("Invalid move.\nPlease enter a valid move.");
          input = this.takeInputFromUser();
        }
        console.log("After input in play")
        let newState = this.makeMove(input);
        this.drawBoard(newState);
      }
    }

    whichPlayer(){
      throw new Error("Method 'whichPlayer()' must be implemented in each class.");
    }
    reverseTurns(){
      throw new Error("Method 'reverseTurns()' must be implemented in each class.");
    } 
}