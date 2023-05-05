import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export class TicTacToe extends GameEngine {
  drawBoard(grid) {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    console.log("In drawboard: ", grid);
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("td");
        const pieceValue = grid[i][j];
        if (pieceValue === 1) {
        const piece = document.createElement("div");
        piece.className = "piece red";
        cell.appendChild(piece);
        } else if (pieceValue === -1) {
        const piece = document.createElement("div");
        piece.className = "piece blue";
        cell.appendChild(piece);
        }
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
    
  }

  makeMove(input,grid,turn) {
    let [toRow,toCol] = input;
    console.log(`to row ${toRow}, column ${toCol}`);
    grid[toRow][toCol] = turn;
    console.log("New grid = ",grid)
    return grid;
  }
  
  isValid(input,grid,turn){
    let [toRow, toCol] = input;
    console.log(`${toRow},${toCol}`);
      if(toRow > 2 || toCol >2)  {
        alert("Invalid move");
        return false;
      }
      if(grid[toRow][toCol] != 0){
          //full 
          alert("Invalid move");
          return false;
      } else {
          return true;
      }
  }

  whichPlayer(turn){
    const curPlayer = document.getElementById("currPlayer");
    curPlayer.value = turn === -1? "Blue" : "Red";
  }

  takeInputFromUser() {
    return new Promise(resolve => {
      const toRow = parseInt(prompt("Enter the row number of the piece to move (0-2)"));
      const toCol = prompt("Enter the column letter of the piece to move (a-c)").charCodeAt(0) - 97;
      const input = [toRow, toCol];
      console.log("input: ", input);
      resolve(input);
    });
  }
  init() {
    var grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var noOfPlayers = 2;
    return{
      grid: grid,
      noOfPlayers: noOfPlayers,
    }
  }   
}

