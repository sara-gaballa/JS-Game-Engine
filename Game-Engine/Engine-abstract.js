
export class GameEngine {// 
  drawBoard(grid){}

  controller(grid,input,turn){
    console.log("In Controller");
    console.log("in controller turn = ",turn);
    let valid=this.isValid(input,grid,turn);
    if(valid){
      grid=this.makeMove(input,grid,turn);
    }
    console.log("in controller valid =",valid);
    return {
      grid:grid,
      valid:valid,
    }
  } // return grid, and boolean that is valid
  
  isValid(input,grid,turn){ // return boolean
    throw new Error("Method 'isValid()' must be implemented in each class.");
  }

  makeMove(input,grid,turn){ // return grid 
    throw new Error("Method 'makeMove()' must be implemented in each class.");
  }

  takeInputFromUser() { // called by play
    //4a 5c, a, 3a 4, 3a,
    // return new Promise(() => {
    //   this.rl.question('Enter a move: ', (input) => {
    //     console.log(`You entered, ${input}`);
    //     console.log('In take input:in the game engine');
    //   });
    // });
    return new Promise(resolve => {
      const input = prompt("Enter input");
      resolve(input);
    });
  }

  parseInput(input){}

  init(){} 


  async play(){
    console.log("In Play");
    let {grid, noOfPlayers}= this.init();
    let turn = 0;
    console.log("before noOfPlayers");
    if(noOfPlayers === 2){
      console.log("in noOfPlayers");
        turn = 1;
        this.whichPlayer(turn);
    }
    this.drawBoard(grid);
    let exitLoop = false;
    var valid=true;
    while(!exitLoop){
      await new Promise(resolve => setTimeout(resolve, 500));
      const input = await this.takeInputFromUser();
      console.log("In engine Input: ",input);
      let parsedInput=this.parseInput(input);
      console.log("In engine parsedInput: ",parsedInput);
      //const input = [5,0,4,1];
      ({grid, valid}= this.controller(grid,parsedInput,turn));
      console.log("in play valid =",valid);
      if(valid){
        console.log("valid");
        // this.makeMove(input,grid);
        this.drawBoard(grid);
        if(noOfPlayers === 2){
          console.log("in nP=2 reverse");
          turn = this.reverseTurns(turn);
          this.whichPlayer(turn);
        }    
      }
    }
  }

  whichPlayer(turn){}

  reverseTurns(turn){
    return -1 * turn;
  } 
}