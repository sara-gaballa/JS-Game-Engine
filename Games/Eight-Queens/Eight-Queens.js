import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class EightQueens extends GameEngine {
  constructor(grid) {
    super([6, 7], ["red", "yellow"]);
    this.grid = grid;
  }

  drawBoard(){
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
          } 
        }
        row.appendChild(cell);
      }
      board.appendChild(row);
    }
    const board2 = document.getElementById("board2");
    board2.innerHTML = ""; // clear the board before drawing the new board

    for (let i = 0; i < 1; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 8; j++) {
        const cell = document.createElement("td");
        const img = document.createElement("img");

        // Set the image source to the path of your image file
        img.src = "https://cdn-icons-png.flaticon.com/512/4880/4880372.png";

        // Add any additional attributes to the image element as needed
        img.setAttribute("alt", "Description of the image");

        // Add the image element to the cell
        cell.appendChild(img);

        // Add any additional styling to the cell element as needed
        cell.style.border = "1px solid black";

        // Add the cell element to the row
        row.appendChild(cell);
      }
      board2.appendChild(row);
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
        } else{
            alert("invalid move");
        }
        console.log(this.grid);
        this.drawBoard();
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
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
const game = new EightQueens(grid);
game.init();
