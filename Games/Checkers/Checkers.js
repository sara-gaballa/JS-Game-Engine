import { GameEngine } from "../../Game-Engine/Engine-abstract.js";
export default class Checkers extends GameEngine {
    constructor() {
        super([8, 8], ["red", "black"]);
        this.currentPlayer = 0;
      }
    
      draw_board() {
        const board = document.getElementById("board");
        for (let i = 0; i < 8; i++) {
          const row = document.createElement("tr");
          for (let j = 0; j < 8; j++) {
            const cell = document.createElement("td");
            if ((i + j) % 2 === 0) {
              cell.className = "black";
              if (i < 3) {
                const piece = document.createElement("div");
                piece.className = "piece red";
                cell.appendChild(piece);
                } else if (i > 4) {
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
        console.log(`Moving from row ${fromRow}, column ${fromCol} to row ${toRow}, column ${toCol}`);
    
        const fromCell = document.querySelector(`#board tr:nth-child(${fromRow}) td:nth-child(${fromCol.charCodeAt(0) - 96})`);
        const toCell = document.querySelector(`#board tr:nth-child(${toRow}) td:nth-child(${toCol.charCodeAt(0) - 96})`);
    
        const piece = fromCell.querySelector(".piece");
        if (piece) {
            fromCell.removeChild(piece);
            toCell.appendChild(piece);
        }
    }
    
    

      init() {
        this.draw_board();
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
const game = new Checkers();
game.init();