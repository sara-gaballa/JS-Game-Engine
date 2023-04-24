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
    
}