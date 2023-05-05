
export class GameEngine {// 
  drawBoard(grid){}

  controller(grid,input,turn){
    console.log("In Controller");
    // const input= this.takeInputFromUser();
    // console.log("I am here ")
    // console.log("input:",input,"grid:",grid,"parent:", turn)
    // this.play(input,grid,turn);
    console.log("in controller trun = ",turn);
    let valid=this.isValid(input,grid,turn);
    if(valid){
      grid=this.makeMove(input,grid,turn);
    }
    console.log("in controller valid =",valid);
    return {
      grid:grid,
      valid:valid,
    }
  } // return grid, boolean that is valid
  
  isValid(input,grid,turn){ // return boolean
    throw new Error("Method 'isValid()' must be implemented in each class.");
  }

  makeMove(input,grid,turn){ // return grid 
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
    // else {
    //   alert("Invalid");
    // }
    // If some condition is met, exit the loop
    // if (input == "4") {
    //   exitLoop = true;
    // }
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
    //   if(noOfPlayers === 2)
    //     turn = this.reverseTurns(turn);
    // }
  // }
}
whichPlayer(turn){}

reverseTurns(turn){
  return -1 * turn;
} 
}

// const game = new GameEngine();

// const game = new Checkers(grid);

// game.play();
// module.exports = Checkers;