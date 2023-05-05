import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export class Sudoku extends GameEngine {

  // JS program to implement the approach

	// Constructor

	// Sudoku Generator
	fillValues(grid) {
		// Fill the diagonal of SRN x SRN matrices
		grid=this.fillDiagonal(grid);

		// Fill remaining blocks
		grid=this.fillRemaining(grid,0, 3);

		// Remove Randomly K digits to make game
		grid=this.removeKDigits(grid);
    return grid;
	}

	// Fill the diagonal SRN number of SRN x SRN matrices
	fillDiagonal(grid) {
		for (let i = 0; i < 9; i += 3) {
			// for diagonal box, start coordinates->i==j
			grid= this.fillBox(grid,i, i);
		}
    return grid;
	}

	

	// Fill a 3 x 3 matrix.
	fillBox(grid,row, col) {
		let num = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				while (true) {
					num = this.randomGenerator(9);
					if (this.unUsedInBox(grid,row, col, num)) {
						break;
					}
				}
				grid[row + i][col + j] = num;
			}
		}
    return grid;
	}

	// Random generator
	randomGenerator(num) {
		return Math.floor(Math.random() * num + 1);
	}

	// Check if safe to put in cell
	checkIfSafe(grid,i, j, num) {
		return (
			this.unUsedInRow(grid,i, num) &&
			this.unUsedInCol(grid,j, num) &&
			this.unUsedInBox(grid,i - (i % 3), j - (j % 3), num)
		);
	}

	// check in the row for existence
	unUsedInRow(grid,i, num) {
		for (let j = 0; j < 9; j++) {
			if (Math.abs(grid[i][j]) === num) {
				return false;
			}
		}
		return true;
	}

	// check in the row for existence
	unUsedInCol(grid,j, num) {
		for (let i = 0; i < 9; i++) {
			if (Math.abs(grid[i][j])  === num) {
				return false;
			}
		}
		return true;
	}

  // Returns false if given 3 x 3 block contains num.
	unUsedInBox(grid,rowStart, colStart, num) {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (Math.abs(grid[rowStart + i][colStart + j]) === num) {
					return false;
				}
			}
		}
		return true;
	}
	// A recursive function to fill remaining
	// matrix
	fillRemaining(grid) {
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if (grid[i][j] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.checkIfSafe(grid,i, j, num)) {
              grid[i][j] = num;
              // grid[i][j] = 0;
            }
          }
        }
      }
    }
    return grid;
	}

	// Print sudoku
	printSudoku(grid) {
		for (let i = 0; i < 9; i++) {
				console.log(grid[i].join(" "))
		}
	}

	// Remove the K no. of digits to
	// complete game
	removeKDigits(grid) {
		let count = 45;

		while (count !== 0) {
			// extract coordinates i and j
			let i = Math.floor(Math.random() * 9);
			let j = Math.floor(Math.random() * 9);
			if (grid[i][j] !== 0) {
				count--;
				grid[i][j] = 0;
			}
		}

		return grid;
	}

drawBoard(grid) {
    const board = document.getElementById("board");
    board.innerHTML = ""; // clear the board before drawing the new board
    for (let i = 0; i < 9; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 9; j++) {
        const cell = document.createElement("td");
        if(3<=i && i<6) cell.className="c1";
        else if(3<=j && j<6)  cell.className="c2";
        else cell.className="c3";
        const pieceValue = grid[i][j];
        if (pieceValue >0) {
        const piece = document.createElement("div");
        piece.innerHTML=`${pieceValue}`;
        cell.appendChild(piece);
        } else if (pieceValue <0) {
        const piece = document.createElement("div");
        piece.className="init";
        piece.innerHTML=`${-1*pieceValue}`;
        cell.appendChild(piece);
        }
        row.appendChild(cell);
      }
      board.appendChild(row);
      
    }
    
  }

  // takeInputFromUser(){
  //   return new Promise(resolve => {
  //     const i = parseInt(prompt("Enter the row number of the piece to move (0-8)"));
  //     const j = prompt("Enter the column letter of the piece to move (a-i)").charCodeAt(0) - 97;
  //     const num = parseInt(prompt("Enter 0 to delet or a number (1-9) to enter"));
  //     const input = [i, j, num];
  //     console.log("input: ", input);
  //     resolve(input);
  //   });
  // }

  parseInput(input){//0a 1
    if(input.length>4) return[NaN,NaN,NaN];
    const i = parseInt(input.charAt(0));//Enter the row number of the piece to move (0-8)"
    const j = input.charAt(1).charCodeAt(0)- 97;//"Enter the column letter of the piece to move (a-i)"
    const num = parseInt(input.charAt(3));//"Enter 0 to delet or a number (1-9) to enter"
    return [i, j, num];
  }


  makeMove(input,grid) {
    let [i,j,num] = input;
    console.log(`to row ${i}, column ${j}`);
    grid[i][j]=num;
    return grid;
  }
    
    isValid(input,grid){
      let [i,j,num] = input;
      if(isNaN(i)  ||isNaN(j) || isNaN(num) ) {
        alert("Invalid input!!");
        return false;
      }
      if(i>=0 && i<=8 && j>=0 && j<=8 && num>=0 && num<=9 ){
        if(num >0 ){//add
          if( grid[i][j]>=0 && this.checkIfSafe(grid,i, j, num)){
            return true;
          }else{
            alert("invalid place");
            return false;
          }
        }else{
          if(grid[i][j]<0){
            alert("can't delet intial value");
            return false;
          }else{
            return true;
          }
        }
    }else{
      alert("invalid input");
      return false;
    }
      
    }
    
  init() {
        var grid = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        
        grid=this.fillValues(grid);
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            grid[i][j]*=-1
        }}
        this.printSudoku(grid);
        var noOfPlayers = 1;
        return {
          grid: grid,
          noOfPlayers: noOfPlayers,
        };
  }
      
}


