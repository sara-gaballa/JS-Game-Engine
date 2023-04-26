import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class Connect4 extends GameEngine {
  constructor(grid) {
    super([6, 7], ["red", "yellow"]);
    this.currentPlayer = 1;
    this.grid = grid;
  }

  whichPlayer(turn){
    (turn == 1) ? this.currentPlayer = -1 : this.currentPlayer = 1;
  }

  drawBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        const pieceValue = this.grid[i][j];
        if (pieceValue === 1) {
        const piece = document.createElement("div");
        piece.className = "piece red";
        cell.appendChild(piece);
        } else if (pieceValue === -1) {
        const piece = document.createElement("div");
        piece.className = "piece yellow";
        cell.appendChild(piece);
        }
        row.appendChild(cell);
      }
      board.appendChild(row);
      
    }
    
  }

      makeMove(col) {
        console.log("col: "+col);
        if(this.isValid(col)){
            let row = -1;
            for(let i = 5;i>=0;i--){
                if(this.grid[i][col]==0){
                    row = i;
                    break;
                }
            }
            this.grid[row][col] = this.currentPlayer;
            this.whichPlayer(this.currentPlayer);
            console.log(this.grid);
            this.drawBoard();
        } else{
            alert("invalid move");
        }
        
    }
    
    isValid(col){
        if(this.grid[0][col]!=0){
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
          const col = toInput.value;
          this.makeMove(col);
        });
      }
      
}
var grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
const game = new Connect4(grid);
game.init();
