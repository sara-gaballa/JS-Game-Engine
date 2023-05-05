import {GameEngine} from "../../Game-Engine/Engine-abstract.js";

export class Checkers extends GameEngine {// export default
  // constructor() {
  //   // super([8, 8], ["white", "black"]);
  //   // turn = -1;
  // }

  drawBoard(grid) {
    const board = document.getElementById("board");
    let letters = "ABCDEFGH";
    board.innerHTML = ""; // clear the board before drawing the new board
    // draw board
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("tr");
      for (let j = -1; j < 9; j++) {
        const cell = document.createElement("td");
        if (j === -1 || j === 8) {
          if (i === 9 || i === 0) {
            cell.textContent = '';
          }else
            cell.textContent = i;
          row.appendChild(cell);
          continue;
        }
        if (i === 0 || i === 9) {
          cell.textContent = letters.charAt(j);
          cell.classList.add('letter');
          row.appendChild(cell);
          continue;
        }
        if ((i + j) % 2 === 0) {
          cell.className = "black";
        }
        const pieceValue = grid[i-1][j];
        if (pieceValue === 1) {
          const piece = document.createElement("div");
          piece.className = "piece black";
          cell.appendChild(piece);
        } else if (pieceValue === -1) {
          const piece = document.createElement("div");
          piece.className = "piece white";
          cell.appendChild(piece);
        }
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  }

  check_grand_right(fromRow,fromCol,toRow,toCol,grid,turn){// method to check if you can eat your opponent if right grand parent is empty
    let sign = 1;
    if(turn === -1){
      sign = -1;
    }
    if((fromCol+2) < 0 || (fromCol+2) > 8) {
      console.log("In third1")
      return 0;
    }
    console.log("grid[fromRow+1*sign][fromCol+1] = ",grid[fromRow+1*sign][fromCol+1]);
    
    if(grid[fromRow+1*sign][fromCol+1] === -1*sign && (grid[fromRow+2*sign][fromCol+2] === 0)){ // same as before //|| grid[fromRow+2][fromCol] === 0
      if(toRow === fromRow+2*sign && toCol === fromCol+2){
        console.log("Eating my oponent");
        grid[fromRow+1*sign][fromCol+1] = 0;
        return 1;
      } else{
        console.log("User didn't input this path in grand_right");
        return 2;
      }
    }return 0; //means that  there is nothing to eat
  }
  check_grand_left(fromRow,fromCol,toRow,toCol,grid,turn){
    let sign = 1;
    if(turn === -1){
      sign = -1;
    }
    if((fromCol-2) < 0 || (fromCol-2) > 8) {
      console.log("In third2")
      return 0;
    }
    if(grid[fromRow+1*sign][fromCol-1] === -1*sign && grid[fromRow+2*sign][fromCol-2] === 0){ // same as before //|| grid[fromRow+2][fromCol] === 0
      if(toRow === fromRow+2*sign && toCol === fromCol-2){
        console.log("Eating my oponent")
        grid[fromRow+1*sign][fromCol-1] = 0;
        return 1;
      } else{
        console.log("User didn't input this path in grand_left");
        return 2;
      }
    }return 0; //means that  there is nothing to eat
  }

  check_move(fromRow,fromCol,toRow,toCol,grid,turn){
    let sign = 1;
    if(turn === -1){
      sign = -1;
    }
    if((toRow ===fromRow+1*sign && toCol === fromCol-1*sign) || (fromRow+1*sign === toRow && fromCol+1*sign== toCol)){
      if(grid[toRow][toCol] === 0){// do the move if nothing is there
        return true;
      }else if(grid[toRow][toCol] !== 0){// error
        return false;
      }
    }return false;
  }
  
  // TODO isValid
  isValid(input,grid,turn){
    // console.log("inputvalid: "+input);
    console.log("In isValid:in checkers")
    // if(input == NaN) return false;
    let [fromRow,fromCol,toRow,toCol] = input;
    console.log(`${fromRow},${fromCol} : ${toRow},${toCol}`)
    if(fromRow == undefined ||fromCol == undefined || toRow == undefined || toCol == undefined) {
      console.log("In first")
      return false;
    }
    if(fromRow == NaN ||fromCol == NaN || toRow == NaN || toCol == NaN) {
      console.log("In first2")
      return false;
    }
    if(fromRow < 0 || fromRow > 8 || fromCol < 0 || fromCol > 8 || toRow < 0 || toRow > 8 || toCol < 0 || toCol > 8) {
      console.log("In second")
      return false;
    }
    if(grid[fromRow][fromCol] === turn){
      let rightSide = this.check_grand_right(fromRow,fromCol,toRow,toCol,grid,turn);
      console.log("rightSide = ", rightSide);
      if(rightSide === 1){
        console.log("rightSide === 1")
        return true;
      }
      else if(rightSide === 2 || rightSide === 0){ //this is a valid path but user didn't choose it
        let leftSide = this.check_grand_left(fromRow,fromCol,toRow,toCol,grid,turn);
        console.log("LeftSide = ", leftSide);
        if(leftSide === 1){
          return true;
        }else if(leftSide === 2){
          alert("You can attack!");
          return false;
        }else if(leftSide ===  0){
          if(this.check_move(fromRow,fromCol,toRow,toCol,grid,turn)){
            console.log("I am here in check_move");
            return true;
          }else{
            alert("Invalid move!!");
            return false;
          }
        }
      }
    }else{
      console.log("Current player:", turn);
      alert("Not current player's piece");
      
      return false;
    }
  }

  // takeInputFromUser
  // play
  // whichPlayer
  // reverseTurns

  makeMove(input,grid) {
    let [fromRow,fromCol,toRow,toCol] = input ||[0,0,0,0];
    if(fromRow == undefined ||fromCol == undefined || toRow == undefined || toCol == undefined) return grid;
    if(fromRow !== 0 || fromCol !== 0 || toRow !== 0 || toCol !== 0){
      grid[toRow][toCol] = grid[fromRow][fromCol];
      console.log(`Moving from row ${fromRow}, column ${fromCol} , to row ${toRow}, column ${toCol}`);
      grid[fromRow][fromCol] = 0;
    }
  

    // console.log(grid);
    // this.drawBoard();
    return grid;
  }

  // takeInputFromUser1(from,to) {
  //   let fromRow = parseInt(from?.charAt(0));
  //   let fromCol = from?.charAt(1);
    // while(fromRow === undefined || fromCol === undefined);
    // let toRow = parseInt(to?.charAt(0));
    // let toCol = to?.charAt(1);
    // console.log(`fromRow = ${fromRow} ,fromCol = ${fromCol} ,toRow = ${toRow} ,toCol = ${toCol}`);
    // console.log("returning from the takeInput");
    // fromRow = fromRow-1;
    // toRow = toRow-1;
    // toCol = (toCol?.charCodeAt(0) - 96) -1;
    // fromCol = (fromCol?.charCodeAt(0) - 96) -1;
    // const fromInput = document.getElementById("from-input");
    // const toInput = document.getElementById("to-input");
    
    // fromInput.value = "";
    // toInput.value = "";
    //this.controller([fromRow,fromCol,toRow,toCol]);
  // }

  controller(grid,input,turn){
    // console.log("In Controller");
    // const input= this.takeInputFromUser();
    // console.log("I am here ")
    // console.log("input:",input,"grid:",grid,"parent:", turn)
    // this.play(input,grid,turn);
    console.log("in controller trun = ",turn);
    let valid=this.isValid(input,grid,turn);
    if(valid){
      grid=this.makeMove(input,grid);
    }
    console.log("in controller valid =",valid);
    return {
      grid:grid,
      valid:valid,
    }
  }
  whichPlayer(turn){
    const curPlayer = document.getElementById("currPlayer");
    curPlayer.value = turn === -1? "White" : "Black";
  }

  // reverseTurns(turn){
  //   if(turn === 1){
  //     turn = -1;
  //   }else{
  //     turn = 1;
  //   }
  //   const curPlayer = document.getElementById("currPlayer");
  //   curPlayer.value = turn === -1?"White":"Black"
  //   console.log("Current player:", turn === -1?"white":"black");
  //   return turn;
  // }
  
  takeInputFromUser() {
    return new Promise(resolve => {
      const fromRow = parseInt(prompt("Enter the row number of the piece to move (1-8)")) - 1;
      const fromCol = prompt("Enter the column letter of the piece to move (a-h)").charCodeAt(0) - 97;
      const toRow = parseInt(prompt("Enter the row number of the destination square (1-8)")) - 1;
      const toCol = prompt("Enter the column letter of the destination square (a-h)").charCodeAt(0) - 97;
      const input = [fromRow, fromCol, toRow, toCol];
      console.log("input: ", input);
      resolve(input);
    });
    // console.log("input");
    // let onClickHandler = null;
    // return new Promise(resolve => {
    //     const connectButton = document.getElementById("but");
    //     onClickHandler = () => {
    //         console.log("Button is clicked");
    //         const fromInput = document.getElementById("from-input");
    //         const toInput = document.getElementById("to-input");
    //         if(fromInput !== null && toInput !== null){
    //             const from = fromInput.value;
    //             const to = toInput.value;
    //             let fromRow = parseInt(from?.charAt(0));
    //             let fromCol = from?.charAt(1);
    //             while(fromRow === undefined || fromCol === undefined);
    //             let toRow = parseInt(to?.charAt(0));
    //             let toCol = to?.charAt(1);
    //             fromRow = fromRow-1;
    //             toRow = toRow-1;
    //             toCol = (toCol?.charCodeAt(0) - 96) -1;
    //             fromCol = (fromCol?.charCodeAt(0) - 96) -1;
    //             const newFromInput = document.getElementById("from-input");
    //             const newToInput = document.getElementById("to-input");
    //             newFromInput.value = "";
    //             newToInput.value = "";
    //             const input = [fromRow, fromCol, toRow, toCol];
    //             console.log("input11111: "+input);
    //             resolve(input);
    //             connectButton.removeEventListener("click", onClickHandler);
    //         }
    //     };
    //     connectButton.addEventListener("click", onClickHandler);
    // });
   
}

    //   grid = [
    //   [0, 1, 0, 1, 0, 1, 0, 1],
    //   [1, 0, 1, 0, 1, 0, 1, 0],
    //   [0, 1, 0, 1, 0, 1, 0, 1],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0],
    //   [-1, 0, -1, 0, -1, 0, -1, 0],
    //   [0, -1, 0, -1, 0, -1, 0, -1],
    //   [-1, 0, -1, 0, -1, 0, -1, 0]
    // ];
  init() {

    var grid = [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [-1, 0, -1, 0, -1, 0, -1, 0],
      [0, -1, 0, -1, 0, -1, 0, -1],
      [-1, 0, -1, 0, -1, 0, -1, 0]
    ];
    // this.drawBoard(grid);
    var noOfPlayers = 2;
    // console.log("Current player: ",currentPlayer === -1?"white":"black");
    // this.drawBoard(grid);
    // const connectButton = document.getElementById("but");
    // connectButton.addEventListener("click", () => {
    //   console.log("Button is clicked");
    //   const fromInput = document.getElementById("from-input");
    //   const toInput = document.getElementById("to-input");
    //   if(fromInput !== null && toInput !== null){
    //     const from = fromInput.value;
    //     const to = toInput.value;
    //     this.takeInputFromUser(from,to);
    //   }
    // });
    // this.controller();
    // let from = arr[0];
    // let to = arr[1];
    // console.log(`from = ${from}, to = ${to}`)
    // this.makeMove(from, to);
    // const curPlayer = document.getElementById("currPlayer");
    // curPlayer.value = turn === -1?"White":"Black"
    return {
      grid: grid,
      noOfPlayers: noOfPlayers,
    };
  }   
}
// -1 is white, 1 is black
// const game = new Checkers();
// game.play();
// game.init();

// module.exports = GameEngine;