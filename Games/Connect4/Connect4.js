import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export class Connect4 extends GameEngine {
  // constructor(grid) {
  //   super([6, 7], ["red", "yellow"]);
  //   this.currentPlayer = 1;
  //   this.grid = grid;
  // }


  drawBoard(grid) {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");
        const pieceValue = grid[i][j];
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

      makeMove(input,grid,turn) {
            let row = -1;
            for(let i = 5;i>=0;i--){
                if(grid[i][input]==0){
                    row = i;
                    break;
                }
            }
            grid[row][input] = turn;
            console.log(grid);
            return grid;
    }
    
    isValid(input,grid,turn){
      if(isNaN(input)||input<0 || input>6){
        alert("invaild input");
        return false;
      }
      else if(grid[0][input]!=0){
          //full 
          alert("this column is full");
          return false;
      } else {
          return true;
      }
  }

    // takeInputFromUser() {
    //   return new Promise(resolve => {
    //     const input = prompt("Enter the column number (0)");
    //     resolve(input);
    //   });
    // }

    parseInput(input){// 1
      if(input.length==1 && input>=0 && input<=6){
        return input
      }else{
        return NaN //out of bound
      }
    }

    whichPlayer(turn){
      const curPlayer = document.getElementById("currPlayer");
      curPlayer.value = turn === -1? "Yellow" : "Red";
    }
    
      // init() {
      //   this.drawBoard();
      //   const connectButton = document.getElementById("but");
      //   connectButton.addEventListener("click", () => {
      //     const toInput = document.getElementById("to-input");
      //     const col = toInput.value;
      //     this.makeMove(col);
      //   });
      // }

      init() {
        var grid = [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ];
        var noOfPlayers = 2;
        return {
          grid: grid,
          noOfPlayers: noOfPlayers,
        };
      }   
}

