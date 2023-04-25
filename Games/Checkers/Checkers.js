import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class Checkers extends GameEngine {
  constructor(grid) {
    super([8, 8], ["red", "black"]);
    this.currentPlayer = 0;
    this.grid = grid;
  }

  drawBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    for (let i = 0; i < 8; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 8; j++) {
        const cell = document.createElement("td");
        if ((i + j) % 2 === 0) {
          cell.className = "black";
          const pieceValue = this.grid[i][j];
          if (pieceValue === 1) {
            const piece = document.createElement("div");
            piece.className = "piece red";
            cell.appendChild(piece);
          } else if (pieceValue === -1) {
            const piece = document.createElement("div");
            piece.className = "piece white";
            cell.appendChild(piece);
          }
        }
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
  }

      makeMove(from, to) {
        const fromRow = parseInt(from.charAt(0));
        const fromCol = from.charAt(1);
        const toRow = parseInt(to.charAt(0));
        const toCol = to.charAt(1);
        console.log(`Moving from row ${fromRow}, column ${fromCol.charCodeAt(0) - 96} to row ${toRow}, column ${toCol.charCodeAt(0) - 96}`);
        
        this.grid[toRow-1][(toCol.charCodeAt(0) - 96) -1] = this.grid[fromRow-1][(fromCol.charCodeAt(0) - 96)-1];

        this.grid[fromRow-1][(fromCol.charCodeAt(0) - 96)-1] = 0;

        console.log(this.grid);
        this.drawBoard();
    }
    
    
      init() {
        this.drawBoard();
        const connectButton = document.getElementById("but");
        connectButton.addEventListener("click", () => {
          const fromInput = document.getElementById("from-input");
          const toInput = document.getElementById("to-input");
          const from = fromInput.value;
          const to = toInput.value;
          this.makeMove(from, to);
        });
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
