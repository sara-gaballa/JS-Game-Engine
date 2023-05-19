import { GameEngine } from "../../Game-Engine/Engine-abstract.js";
import{SudokuGenerator}from"./SudokoGenerator.js"

export class Sudoku extends GameEngine {

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


  async solve(grid){

    const session = pl.create();
    const knowledge_base = `
    :- use_module(library(apply)).
    :- use_module(library(clpfd)).
    :- use_module(library(clpb)).
    :- use_module(library(lists)).
    :- use_module(library(ISO)).
    :- use_module(library(clpfd)).

    
    convert_array([], []).
    convert_array([Row|Rest], [NewRow|NewRest]) :-
        write('in convert first'),
        convert_row(Row, NewRow),  
        convert_array(Rest, NewRest).  


    convert_row([], []).
    convert_row([0|Rest], [_|NewRest]) :-
         write('in convert row3'),
        convert_row(Rest, NewRest).  


    convert_row([Z|Rest], [Z|NewRest]) :-
        write('in convert row1'),
        Z \\= 0,
        write('in convert row2'),
        convert_row(Rest, NewRest).  


    solve(Array,X):-
      write('in solve first'+Array),
      convert_array(Array, X),
      write('in solve after convert'+X),
      sudoku(X).



      
    sudoku(Puzzle) :-
        write('in sodoku first'+Puzzle),
        mflatten(Puzzle, Tmp),
        write('in sodoku after flatten'+Tmp),
        manualll(Tmp, 1, 9),
        write('in sodoku after ins'+Puzzle),
        Rows = Puzzle,
        transpose(Rows, Columns),
        blocks(Rows, Blocks),
        maplist(all_distinct, Rows),
        maplist(all_distinct, Columns),
        maplist(all_distinct, Blocks),
        maplist(label, Rows).
      

    mflatten(List, FlatList) :-
      mflatten(List, [], FlatList0),
      !,
      FlatList = FlatList0.
  
    mflatten(Var, Tl, [Var|Tl]) :-
      var(Var),
      !.
    mflatten([], Tl, Tl) :- !.
    
    mflatten([Hd|Tl], Tail, List) :-
      !,
      mflatten(Hd, FlatHeadTail, List),
      mflatten(Tl, Tail, FlatHeadTail).
      mflatten(NonList, Tl, [NonList|Tl]).  
      

    manualll([], _, _).
    manualll([X|Xs], Min, Max) :-
      write('in inssssss'),
      X #>= Min,
      X #=< Max,
      manualll(Xs, Min, Max).
    

    blocks([A,B,C,D,E,F,G,H,I], Blocks) :-
      blocks(A,B,C,Block1), blocks(D,E,F,Block2), blocks(G,H,I,Block3),
      append([Block1, Block2, Block3], Blocks).

    blocks([], [], [], []).
    blocks([A,B,C|Bs1],[D,E,F|Bs2],[G,H,I|Bs3], [Block|Blocks]) :-
      Block = [A,B,C,D,E,F,G,H,I],
      blocks(Bs1, Bs2, Bs3, Blocks).


  
    `;

    let found=false;

    session.consult(knowledge_base);
    let T=grid;
    console.log(JSON.stringify(grid));
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(grid[i][j]<0) {
          T[i][j]=grid[i][j]*(-1);
        }
        else {
          T[i][j]=grid[i][j];
        }
      }
    }
    console.log(JSON.stringify(T));
    const query = `solve(${JSON.stringify(T)},X).`;

    session.query(query,{
        success: function(goal){
            console.log("Query is correct");
        },
        error: function(err){console.log("Error!!", err)},
    });

    let ans;
    session.answer({
        
        success:  function(answer) {
            found=true;
            ans = session.format_answer(answer);
        },
        fail: function() {
          found=false;
          console.log("No more answers")
        },
        error: function(err) {alert("Error occured while trying to find answers!"+ err)},
        limit: function(){alert("Time limit exceeded!!!")},
    });

    await new Promise(resolve => setTimeout(resolve, 0)); // no meaning


    if(found){
      console.log("ans = ", ans);
      GridP = JSON.parse(ans.slice(4));
      for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
          if(grid[i][j]<0)grid[i][j]=GridP[i][j]*(-1);
          else grid[i][j]=GridP[i][j];
        }
      }
    }else{
      alert("No solution");
    }

    return grid;

  }


  parseInput(input){//0a 1
    if(input.length>4) return[NaN,NaN,NaN];
    const i = parseInt(input.charAt(0));//Enter the row number of the piece to move (0-8)"
    const j = input.charAt(1).charCodeAt(0)- 97;//"Enter the column letter of the piece to move (a-i)"
    const num = parseInt(input.charAt(3));//"Enter 0 to delet or a number (1-9) to enter"
    return [i, j, num];
  }


  async makeMove(input,grid) {
    let [i,j,num] = input;
    if(i==0&& j==-49&&num==0){
      //solve
      console.log("solve");
      grid=await this.solve(grid); 

    }else{
      console.log(`to row ${i}, column ${j}`);
      grid[i][j]=num;
    }
    
    return grid;
  }
    
  isValid(input,grid){
    let [i,j,num] = input;
    if(isNaN(i)  ||isNaN(j) || isNaN(num) ) {
      alert("Invalid input!!");
      return false;
    }
    if(i==0&& j==-49&&num==0){
      //solve
      console.log("solve");
      return true;
    }
    else if(i>=0 && i<=8 && j>=0 && j<=8 && num>=0 && num<=9 ){
      if(num >0 ){//add
        if( grid[i][j]>=0 && this.checkIfSafe(grid,i, j, num)){
          return true;
        }else{
          alert("invalid place");
          return false;
        }
      }else{
        if(grid[i][j]<0){
          alert("can't delete intial value");
          return false;
        }else if(grid[i][j]===0){
          alert("Nothing to delete: empty cell");
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
    let generator=new SudokuGenerator(9,45);
    generator.fillValues();
    grid=generator.mat;
   
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        grid[i][j] *= -1
      }
    }
    var noOfPlayers = 1;
    console.log(grid);
    return {
      grid: grid,
      noOfPlayers: noOfPlayers,
    };
  }
      
}


