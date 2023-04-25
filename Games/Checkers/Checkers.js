import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class Checkers extends GameEngine {
  constructor(grid) {
    super([8, 8], ["white", "black"]);
    this.currentPlayer = -1;
    this.grid = grid;
  }

  drawBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    // draw board
    for (let i = 0; i < 8; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 8; j++) {
        const cell = document.createElement("td");
        if ((i + j) % 2 === 0) {
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
    if(fromRow < 0 || fromRow > 8 || fromCol < 0 || fromCol > 8 || toRow < 0 || toRow > 8 || toCol < 0 || toCol > 8) {
      console.log("In second")
      return false;
    }
    if(this.grid[fromRow][fromCol] === this.currentPlayer){
      if(this.grid[fromRow][fromCol] === -1){
        if((fromRow+2) < 0 || (fromRow+2) > 8 || (fromCol-2) < 0 || (fromCol-2) > 8) {
          console.log("In third")
          return false;
        }
        if(this.grid[fromRow+1][fromCol-1] === 1 && (this.grid[fromRow+2][fromCol-2] === 0 || this.grid[fromRow+2][fromCol] === 0)){ // 0 0 -1 0 0
          // have the opportunity to attack                                                                                         // 0 1  0 1 0
          //                                                                                                                        // 0 0  0 0 0
          if(this.grid[toRow][toCol] === this.grid[fromRow+2][fromCol-2] || this.grid[toRow][toCol] ===  this.grid[fromRow+2][fromCol]){
            // this.makeMove(fromRow,fromCol,toRow,toCol);
            // remove the opponents' piece
            console.log("Eating my oponent")
            this.grid[fromRow+1][fromCol-1] = 0;
            return true;
          }else{
            alert('Invalid move. You can attack');
            return false;
          }
        }
        else if(this.grid[fromRow+1][fromCol+1] === 1 && (this.grid[fromRow+2][fromCol+2] === 0 || this.grid[fromRow+2][fromCol] === 0)){ // same as before
          if(this.grid[toRow][toCol] === this.grid[fromRow+2][fromCol+2] || this.grid[toRow][toCol] ===  this.grid[fromRow+2][fromCol]){
            // this.makeMove(fromRow,fromCol,toRow,toCol);
            console.log("Eating my oponent")
            this.grid[fromRow+1][fromCol+1] = 0;
            return true;
          } else{
            alert('Invalid move. You can attack');
            return false;
          }
        }
        if(this.grid[toRow+1][toCol] === this.grid[fromRow+1][fromCol-1] || this.grid[fromRow+1][fromCol+1] === this.grid[toRow+1][toCol]){
          if(this.grid[toRow][toCol] === 0){// do the move if nothing is there
            return true;
          }else if(this.grid[toRow][toCol] === -1){// error
            alert("you can't eat your piece or bypass it");
            return false;
          }
        }
        else{
          alert("Invalid move");
          return false;
        }
      }
      else if(this.grid[fromRow][fromCol] === 1){
        if(this.grid[fromRow-1][fromCol-1] === -1 && (this.grid[fromRow-2][fromCol-2] === 0 || this.grid[fromRow-2][fromCol] === 0)){
          // have the opportunity to attack
          if(this.grid[toRow][toCol] === this.grid[fromRow-2][fromCol-2] || this.grid[toRow][toCol] ===  this.grid[fromRow-2][fromCol]){
            // eat your opponent
            console.log("Eating my oponent")
            this.grid[fromRow-1][fromCol-1] = 0;
            return true;
          }else{
            alert('Invalid move. You can attack');
            return false;
          }
        }
        else if(this.grid[fromRow-1][fromCol+1] === -1 && (this.grid[fromRow-2][fromCol-2] === 0 || this.grid[fromRow-2][fromCol] === 0)){
          if(this.grid[toRow][toCol] === this.grid[fromRow-2][fromCol-2] || this.grid[toRow][toCol] ===  this.grid[fromRow-2][fromCol]){
            // eat your opponent
            console.log("Eating my oponent")
            this.grid[fromRow-1][fromCol+1] = 0;
            return true;
          } else{
            alert('Invalid move. You can attack');
            return false;
          }
        }
        if(this.grid[toRow][toCol] === this.grid[fromRow-1][fromCol-1] || this.grid[toRow][toCol] === this.grid[fromRow-1][fromCol+1]){
          if(this.grid[toRow][toCol] === 0){// do the move if nothing is there
            return true;
          }else if(this.grid[toRow][toCol] === 1){// error
            alert("you can't eat your piece or bypass it");
            return false;
          }
        }
        else{
          alert("Invalid move");
          return false;
        }
      }
      else if(this.grid[fromRow][fromCol] === 0){
        alert("Invalid move");
        return false; 
      }
    }else{
      console.log("not current player");
      return false;
    }
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
  

    console.log(this.grid);
    // this.drawBoard();
    return this.grid;
  }

  takeInputFromUser(from,to) {
    let fromRow = parseInt(from?.charAt(0));
    let fromCol = from?.charAt(1);
    let toRow = parseInt(to?.charAt(0));
    let toCol = to?.charAt(1);
    console.log(`fromRow = ${fromRow} ,fromCol = ${fromCol} ,toRow = ${toRow} ,toCol = ${toCol}`);
    console.log("returning from the takeInput");
    fromRow = fromRow-1;
    toRow = toRow-1;
    toCol = (toCol.charCodeAt(0) - 96) -1;
    fromCol = (fromCol.charCodeAt(0) - 96) -1;
    this.controller([fromRow,fromCol,toRow,toCol]);
  }

  controller(input){
    console.log("In Controller");
    // const input= this.takeInputFromUser();
    console.log("I am here ")
    console.log("input:",input,"grid:",this.grid,"parent:", this.currentPlayer)
    this.play(input,this.grid,this.currentPlayer);
    // takes input from user
    // isValid
    // if isValid ==> makeMove, Next Player
    // else userInput again, (same player)
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
    console.log("Current player:", this.currentPlayer);
  }
  init() {
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
  }   
}
var grid = [
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, -1, 0, -1, 0, -1, 0, -1],
  [-1, 0, -1, 0, -1, 0, -1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
];
const game = new Checkers(grid);
game.init();
