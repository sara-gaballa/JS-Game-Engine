import {GameEngine} from "../../Game-Engine/Engine-abstract.js";

export class Checkers extends GameEngine {

  drawBoard(grid) {
    const board = document.getElementById("board");
    let letters = "ABCDEFGH";
    board.innerHTML = ""; // clear the board before drawing the new board
    // draw background cells
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
        // draw pieces
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
    
    if(grid[fromRow+1*sign][fromCol+1] === -1*sign && (grid[fromRow+2*sign][fromCol+2] === 0)){ // same as before 
      if(toRow === fromRow+2*sign && toCol === fromCol+2){
        console.log("Eating my oponent");
        // grid[fromRow+1*sign][fromCol+1] = 0;
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
    if(grid[fromRow+1*sign][fromCol-1] === -1*sign && grid[fromRow+2*sign][fromCol-2] === 0){ // same as before
      if(toRow === fromRow+2*sign && toCol === fromCol-2){
        console.log("Eating my oponent")
        // grid[fromRow+1*sign][fromCol-1] = 0;
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
  
  isValid(input,grid,turn){
    console.log("In isValid:in checkers");
    let [fromRow,fromCol,toRow,toCol] = input;
    console.log(`${fromRow},${fromCol} : ${toRow},${toCol}`)
    if(fromRow == undefined ||fromCol == undefined || toRow == undefined || toCol == undefined) {
      console.log("In first");
      alert("Invalid input!!");
      return false;
    }
    if(isNaN(fromRow)  ||isNaN(fromCol) || isNaN(toRow) || isNaN(toCol)) {
      console.log("In first2");
      alert("Invalid input!!");
      return false;
    }
    if(fromRow < 0 || fromRow > 7 || fromCol < 0 || fromCol > 7 || toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) {
      console.log("In second");
      alert("Invalid input!!");
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
        }else if(leftSide === 2 || rightSide === 2){
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

  makeMove(input,grid) {
    let [fromRow,fromCol,toRow,toCol] = input ||[0,0,0,0];
    if(fromRow == undefined ||fromCol == undefined || toRow == undefined || toCol == undefined) return grid;
    if(fromRow !== 0 || fromCol !== 0 || toRow !== 0 || toCol !== 0){
      grid[toRow][toCol] = grid[fromRow][fromCol];
      console.log(`Moving from row ${fromRow}, column ${fromCol} , to row ${toRow}, column ${toCol}`);
      grid[fromRow][fromCol] = 0;

      if(Math.abs(fromRow - toRow) == 2) {
        let eatx = (fromRow + toRow) / 2;
        let eaty = (fromCol + toCol) / 2;
        grid[eatx][eaty] = 0;
      }
    }
    return grid;
  }

  whichPlayer(turn){
    const curPlayer = document.getElementById("currPlayer");
    curPlayer.value = turn === -1? "White" : "Black";
  }

  parseInput(input){//3b 4a
    if(input.length>5) return[NaN,NaN,NaN,NaN];
    const fromRow = parseInt(input.charAt(0)) - 1;
    const fromCol = input.charAt(1).charCodeAt(0) - 97;
    const toRow = parseInt(input.charAt(3)) - 1;
    const toCol = input.charAt(4).charCodeAt(0) - 97;
    return [fromRow, fromCol, toRow, toCol];
  }

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
    var noOfPlayers = 2;
    return {
      grid: grid,
      noOfPlayers: noOfPlayers,
    };
  }   
}