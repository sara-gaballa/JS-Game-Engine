import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class TicTacToe extends GameEngine {
  constructor(grid) {
    super([3, 3], ["x", "o"]);
    this.currentPlayer = 1;
    this.grid = grid;
  }

  whichPlayer(turn){
    (turn == 1) ? this.currentPlayer = -1 : this.currentPlayer = 1;
  }

  drawBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    for (let i = 0; i < 3; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("td");
        const pieceValue = this.grid[i][j];
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

      makeMove(to) {
        const toRow = parseInt(to.charAt(0));
        const toCol = to.charAt(1).charCodeAt(0) - 97;
        
        console.log(`to row ${toRow}, column ${toCol}`);
        if(this.isValid(toRow, toCol)){
            this.grid[toRow][toCol]=this.currentPlayer;
            this.whichPlayer(this.currentPlayer);
            this.drawBoard();
        }else{
            alert("invaled move");
        }
    }
    
    isValid(toRow,toCol){
        if(toRow > 2 || toCol >2)  return false;
        if(this.grid[toRow][toCol]!=0){
            //full 
            return false;
        } else {
            return true;
        }
    }
    
      init() {
        this.drawBoard();
        const connectButton = document.getElementById("but");
        connectButton.addEventListener("click", () => {
            const toInput = document.getElementById("to-input");
            const to = toInput.value;
            this.makeMove(to);
        });
      }
      
}
var grid = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
];
const game = new TicTacToe(grid);
game.init();
