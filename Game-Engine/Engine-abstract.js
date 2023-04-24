export class GameEngine {
    constructor(boardSize, pieces) {
      this.boardSize = boardSize;
      this.pieces = pieces;
      this.board = Array.from({ length: boardSize[0] }, () => Array.from({ length: boardSize[1] }, () => null));
    }
    drawBoard(){}
    
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
      // must be implemented
      input = prompt("Enter a valid move:");
      return input;
    }
    play(input, game, turn){ // two players ==> overloading
      whichPlayer(turn);
      this.play(input,game);
      reverseTurns(turn);
    }
    play(input, game){ // one player ==> overloading
      while(!(this.isValid(input))){
        console.log("Invalid move.\nPlease enter a valid move.");
        input = takeInputFromUser();
      }
      newState = this.makeMove();
      this.drawBoard();
    }
    whichPlayer(turn){
      throw new Error("Method 'whichPlayer()' must be implemented in each class.");
    }
    reverseTurns(turn){
      throw new Error("Method 'reverseTurns()' must be implemented in each class.");
    } 
}