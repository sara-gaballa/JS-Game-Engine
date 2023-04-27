import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class Checkers extends GameEngine {
  constructor(grid) {
    super([8, 8], ["white", "black"]);
    this.currentPlayer = -1;
    this.grid = grid;
  }

  drawBoard() {
    const board = document.getElementById("board");
    let letters = "ABCDEFGH";
    board.innerHTML = ""; // clear the board before drawing the new board
    // draw board
    for (let i = 0; i < 9; i++) {
      const row = document.createElement("tr");
      for (let j = -1; j < 8; j++) {
        const cell = document.createElement("td");
        if (j === -1) {
          if(i === 8) {
            cell.textContent = '';
          }else
            cell.textContent = i+1;//|| ''
          row.appendChild(cell);
          continue;
        }
        if (i === 8) {
          cell.textContent = letters.charAt(j);
          cell.classList.add('letter');
          row.appendChild(cell);
          continue;
        }
        if ((i + j) % 2 !== 0) {
          cell.className = "black";
        }
        const pieceValue = this.grid[i][j];
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

  check_grand_right(fromRow,fromCol,toRow,toCol){// method to check if you can eat your opponent if right grand parent is empty
    let sign = 1;
    if(this.currentPlayer === -1){
      sign = -1;
    }
    if((fromCol+2) < 0 || (fromCol+2) > 8) {
      console.log("In third1")
      return 0;
    }
    console.log("this.grid[fromRow+1*sign][fromCol+1] = ",this.grid[fromRow+1*sign][fromCol+1]);
    
    if(this.grid[fromRow+1*sign][fromCol+1] === -1*sign && (this.grid[fromRow+2*sign][fromCol+2] === 0)){ // same as before //|| this.grid[fromRow+2][fromCol] === 0
      if(toRow === fromRow+2*sign && toCol === fromCol+2){
        console.log("Eating my oponent");
        this.grid[fromRow+1*sign][fromCol+1] = 0;
        return 1;
      } else{
        console.log("User didn't input this path in grand_right");
        return 2;
      }
    }return 0; //means that  there is nothing to eat
  }
  check_grand_left(fromRow,fromCol,toRow,toCol){
    let sign = 1;
    if(this.currentPlayer === -1){
      sign = -1;
    }
    if((fromCol-2) < 0 || (fromCol-2) > 8) {
      console.log("In third2")
      return 0;
    }
    if(this.grid[fromRow+1*sign][fromCol-1] === -1*sign && this.grid[fromRow+2*sign][fromCol-2] === 0){ // same as before //|| this.grid[fromRow+2][fromCol] === 0
      if(toRow === fromRow+2*sign && toCol === fromCol-2){
        console.log("Eating my oponent")
        this.grid[fromRow+1*sign][fromCol-1] = 0;
        return 1;
      } else{
        console.log("User didn't input this path in grand_left");
        return 2;
      }
    }return 0; //means that  there is nothing to eat
  }

  check_move(fromRow,fromCol,toRow,toCol){
    let sign = 1;
    if(this.currentPlayer === -1){
      sign = -1;
    }
    if((toRow ===fromRow+1*sign && toCol === fromCol-1*sign) || (fromRow+1*sign === toRow && fromCol+1*sign== toCol)){
      if(this.grid[toRow][toCol] === 0){// do the move if nothing is there
        return true;
      }else if(this.grid[toRow][toCol] !== 0){// error
        return false;
      }
    }return false;
  }
  
  // TODO isValid
  isValid(input){
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
    if(this.grid[fromRow][fromCol] === this.currentPlayer){
      let rightSide = this.check_grand_right(fromRow,fromCol,toRow,toCol);
      console.log("rightSide = ", rightSide);
      if(rightSide === 1){
        console.log("rightSide === 1")
        return true;
      }
      else if(rightSide === 2 || rightSide === 0){ //this is a valid path but user didn't choose it
        let leftSide = this.check_grand_left(fromRow,fromCol,toRow,toCol);
        console.log("LeftSide = ", leftSide);
        if(leftSide === 1){
          return true;
        }else if(leftSide === 2){
          alert("You can attack!");
          return false;
        }else if(leftSide ===  0){
          if(this.check_move(fromRow,fromCol,toRow,toCol)){
            console.log("I am here in check_move");
            return true;
          }else{
            alert("Invalid move!!");
            return false;
          }
        }
      }
    }else{
      alert("Not current player's piece");
      console.log("Current player:", this.currentPlayer)
      return false;
    }      
    //   else if(this.grid[fromRow][fromCol] === -1){ // white
    //     console.log("Checking the validity: White player");
    //     if(this.grid[fromRow-1][fromCol-1] === 1 && (this.grid[fromRow-2][fromCol-2] === 0 || this.grid[fromRow-2][fromCol] === 0)){
    //       // have the opportunity to attack
    //       console.log("White have the opp to attack");
    //       // if(this.grid[toRow][toCol] === this.grid[fromRow-2][fromCol-2] || this.grid[toRow][toCol] ===  this.grid[fromRow-2][fromCol]){
    //       if(toRow === fromRow-2 && toCol === fromCol-2){
    //         // eat your opponent
    //         console.log("Eating my oponent here")
    //         this.grid[fromRow-1][fromCol-1] = 0;
    //         return true;
    //       }else{
    //         alert('Invalid move. You can attack');
    //         return false;
    //       }
    //     }
    //     // this.grid[fromRow-2][fromCol-2] === 0 || 
    //     else if(this.grid[fromRow-1][fromCol+1] === 1 && (this.grid[fromRow-2][fromCol+2] === 0)){
    //       console.log("White have the opp tp attack 2");
    //       if(toRow === fromRow-2 && toCol === fromCol+2){
    //         // eat your opponent
    //         console.log("Eating my oponent")
    //         this.grid[fromRow-1][fromCol+1] = 0;
    //         return true;
    //       } else{
    //         alert('Invalid move. You can attack');
    //         return false;
    //       }
    //     }
    //     if(this.grid[toRow][toCol] === this.grid[fromRow-1][fromCol-1] || this.grid[toRow][toCol] === this.grid[fromRow-1][fromCol+1]){
    //       if(this.grid[toRow][toCol] === 0){// do the move if nothing is there
    //         console.log("VALID MOVE FOR WHITE");
    //         console.log("The pieceeee: ",this.grid[fromRow-1][fromCol+1])
    //         console.log("From row:", fromRow, ",formCol: " , fromCol);
    //         return true;
    //       }else if(this.grid[toRow][toCol] === -1){// error
    //         alert("You can't eat your piece or bypass it");
    //         return false;
    //       }
    //     }
    //     else{
    //       alert("Invalid move");
    //       return false;
    //     }
    //   }
    //   else if(this.grid[fromRow][fromCol] === 0){
    //     alert("Invalid move");
    //     return false; 
    //   }
    // }else{
    //   alert("Not current player's piece");
    //   return false;
    // }
  }

  // takeInputFromUser
  // play
  // whichPlayer
  // reverseTurns

  makeMove(input) {
    let [fromRow,fromCol,toRow,toCol] = input ||[0,0,0,0];
    if(fromRow == undefined ||fromCol == undefined || toRow == undefined || toCol == undefined) return this.grid;
    if(fromRow !== 0 || fromCol !== 0 || toRow !== 0 || toCol !== 0){
      this.grid[toRow][toCol] = this.grid[fromRow][fromCol];
      console.log(`Moving from row ${fromRow}, column ${fromCol} , to row ${toRow}, column ${toCol}`);
      this.grid[fromRow][fromCol] = 0;
    }
  

    // console.log(this.grid);
    // this.drawBoard();
    return this.grid;
  }

  takeInputFromUser(from,to) {
    let fromRow = parseInt(from?.charAt(0));
    let fromCol = from?.charAt(1);
    // while(fromRow === undefined || fromCol === undefined);
    let toRow = parseInt(to?.charAt(0));
    let toCol = to?.charAt(1);
    // console.log(`fromRow = ${fromRow} ,fromCol = ${fromCol} ,toRow = ${toRow} ,toCol = ${toCol}`);
    // console.log("returning from the takeInput");
    fromRow = fromRow-1;
    toRow = toRow-1;
    toCol = (toCol?.charCodeAt(0) - 96) -1;
    fromCol = (fromCol?.charCodeAt(0) - 96) -1;
    const fromInput = document.getElementById("from-input");
    const toInput = document.getElementById("to-input");
    fromInput.value = "";
    toInput.value = "";
    this.controller([fromRow,fromCol,toRow,toCol]);
  }

  controller(input){
    // console.log("In Controller");
    // const input= this.takeInputFromUser();
    // console.log("I am here ")
    // console.log("input:",input,"grid:",this.grid,"parent:", this.currentPlayer)
    this.play(input,this.grid,this.currentPlayer);
  }
  whichPlayer(){
    return this.currentPlayer;
  }
  reverseTurns(){
    if(this.currentPlayer === 1){
      this.currentPlayer = -1;
    }else{
      this.currentPlayer = 1;
    }
    const curPlayer = document.getElementById("currPlayer");
    curPlayer.value = this.currentPlayer === -1?"White":"Black"
    console.log("Current player:", this.currentPlayer === -1?"white":"black");
  }
  init() {
    console.log("Current player: ",this.currentPlayer === -1?"white":"black");
    this.drawBoard(this.grid);
    const connectButton = document.getElementById("but");
    connectButton.addEventListener("click", () => {
      console.log("Button is clicked");
      const fromInput = document.getElementById("from-input");
      const toInput = document.getElementById("to-input");
      if(fromInput !== null && toInput !== null){
        const from = fromInput.value;
        const to = toInput.value;
        this.takeInputFromUser(from,to);
      }
    });
    // this.controller();
    // let from = arr[0];
    // let to = arr[1];
    // console.log(`from = ${from}, to = ${to}`)
    // this.makeMove(from, to);
    const curPlayer = document.getElementById("currPlayer");
    curPlayer.value = this.currentPlayer === -1?"White":"Black"
  }   
}
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
// -1 is white, 1 is black
const game = new Checkers(grid);
game.init();
