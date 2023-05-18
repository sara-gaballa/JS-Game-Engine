import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export class EightQueens extends GameEngine {
  


  drawBoard(grid) {

    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
  
    const CELL_SIZE = 55;
    const BOARD_SIZE = CELL_SIZE * 8;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
    ctx.fillStyle = "#FFF";
    ctx.fillRect(50, 50, BOARD_SIZE, BOARD_SIZE);
  
    // Draw the background cells
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = "#EEE";
        } else {
          ctx.fillStyle = "#000000";
        }
        ctx.fillRect(i * CELL_SIZE + 50, j * CELL_SIZE + 50, CELL_SIZE, CELL_SIZE);
      }
    }
  
    // Add numbers and letters to the top cells
    ctx.font = "bold 15px Arial";
    ctx.fillStyle = "#000";
  
    const num = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    for (let i = 0; i < 9; i++) {
      const y = i * CELL_SIZE + 50 + CELL_SIZE / 2 + 12;
      const x1 = 30;
      const x2 = BOARD_SIZE + 50 + 5;
      ctx.fillText(num[i], x1, y);
      ctx.fillText(num[i], x2, y);
    }
    console.log("grid in draw= ",grid);
    
    // Load the image and draw it on the canvas when it has finished loading
    const img = new Image();
    img.src = "https://cdn-icons-png.flaticon.com/512/4880/4880372.png";
    img.onload = function() {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 8; j++) {
          if (grid[i][j] == 1) {
            ctx.drawImage(img, j * CELL_SIZE + 50, i * CELL_SIZE + 50, 55, 55);
          }
        }
      }
    }.bind(this);
  }

   async solve(grid){
    const session = pl.create();
const knowledge_base = `
convert(Board, Converted) :-
transposeBoard(Board, Transposed),
convertColumns(Transposed, Converted),
!,  % Cut operator - prevents backtracking
queens(Converted).

transposeBoard([], []).
transposeBoard([[]|_], []).
transposeBoard(Matrix, [FirstCol|TransposedRest]) :-
extractFirstColumn(Matrix, FirstCol, RestMatrix),
transposeBoard(RestMatrix, TransposedRest).

extractFirstColumn([], [], []).
extractFirstColumn([[X|Xs]|Matrix], [X|FirstCol], [Xs|RestMatrix]) :-
extractFirstColumn(Matrix, FirstCol, RestMatrix).

convertColumns([], []).
convertColumns([Column|Rest], [ConvertedCol|ConvertedRest]) :-
convertColumn(Column, ConvertedCol),
convertColumns(Rest, ConvertedRest).

convertColumn(Column, ConvertedCol) :-
member(1, Column),
convertColumnHelper(Column, 1, ConvertedCol).

convertColumn(_, ConvertedCol) :-
ConvertedCol = _.

convertColumnHelper([1|_], Row, ConvertedCol) :-
ConvertedCol = Row.
convertColumnHelper([0|Rest], Row, ConvertedCol) :-
NewRow is Row + 1,
convertColumnHelper(Rest, NewRow, ConvertedCol).


:- use_module(library(clpfd)).
queens(Board) :-
length(Board, 8),
Board ins 1..8,
safe(Board),
label(Board).

safe([]).
safe([Q|Queens]) :-
safe(Queens),
no_attack(Q, Queens, 1).

no_attack(_, [], _).
no_attack(Q, [Q1|Queens], D) :-
Q #\= Q1,
abs(Q1 - Q) #\= D,
D1 #= D + 1,
no_attack(Q, Queens, D1).`

session.consult(knowledge_base);
let GridP=[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];
pl.type.is_variable(GridP);
const query =  "convert(GridP, X).";

session.query(query,{
    success: function(goal){
        console.log("Query is correct");
    },
    error: function(err){console.log("Error!!", err)},
});

let ans;
session.answer({
    
    success:  function(answer) {
        ans = session.format_answer(answer);
    },
    fail: function() {console.log("No more answers")},
    error: function(err) {alert("Error occured while trying to find answers!"+ err)},
    limit: function(){alert("Time limit exceeded!!!")},
});

await new Promise(resolve => setTimeout(resolve, 0)); // no meaning

console.log("ans = ", ans);
grid = JSON.parse(ans.slice(4));
console.log("array = ", grid);
return grid;

  }

  
  parseInput(input){//a 7 //new input => 0a
    if(input.length>2) return[NaN,NaN];
    const to = parseInt(input.charAt(0));
    const queen = input.charAt(1).charCodeAt(0) - 97;
    console.log(to);
    console.log(queen);
    return [to,queen];
    // if(input.length>3) return[NaN,NaN];
    // const column = input.charAt(0).charCodeAt(0) - 97;
    // const row = parseInt(input.charAt(2));
    // return [column,row];
  }
     async makeMove(input,grid) {
        console.log("grid before= ",grid);
        let [to,queen] = input;
        if(to==0 && queen==-49){
          grid= await this.solve(grid);     
          // // do{
          //   gridAfterPromise.then((grid) => {
          //   console.log("grid in then= ",grid);
          // });
        // } while(grid==null);
          console.log("grid aftere= ",grid);
        }
        else if(grid[to][queen]==1){
          grid[8][queen]=1;
          grid[to][queen]=0;
        } else{
          grid[8][queen]=0;
          grid[to][queen]=1;
        }
        return grid;
        
        
    }

    isValid(input,grid){
      let [to,queen] = input;
      console.log(`${to},${queen}`)
      // const column = input[0]; // column is now 0
      // const row = input[1];
      if(isNaN(to)||isNaN(queen)){
        console.log("1")
        alert("invaild input");
        return false;
      }
      if (to==0 && queen==-49) {
        console.log("solve");
        return true;
      }
      if(to < 0 || to > 7 || queen < 0 || queen > 7){
        console.log("2")
        alert("invaild input");
        return false;
      }
      if(grid[to][queen]==1){
        return true;
      }
  
      
      else {
        for(let i = 0 ;i < 8;i++ ){
          if(grid[to][i]==1){
            alert("invaild place");
            return false;
          }
        }
        for(let j = 0 ;j < 8 ;j++){
          if(grid[j][queen]==1){
            alert("invaild place");
            return false;
          }
        }
        let i = to;
        for(let j = queen ;j >= 0 && i >=0; j-- ){
          if(grid[i][j]==1){
            alert("invaild place");
            return false;
          }else i--;
        }
        let k = to;
        for(let j = queen ;j < 8 && k != 8; j++ ){
          if(grid[k][j]==1){
            alert("invaild place");
            return false;
          }else k++;
        }
        let l = to;
        for(let j = queen ;j >= 0 && l != 8; j-- ){
          if(grid[l][j]==1){
            alert("invaild place");
            return false;
          }else l++;
        }
        let p = to;
        for(let j = queen ;j < 8 && p >= 0; j++ ){
          if(grid[p][j]==1){
            alert("invaild place");
            return false;
          }else p--;
        }
      }
     return true;
  }



  
      init() {
        var grid = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [1, 1, 1, 1, 1, 1, 1, 1]
        ];
        var noOfPlayers = 1;
        return {
          grid: grid,
          noOfPlayers: noOfPlayers,
        };
      } 
      
}
