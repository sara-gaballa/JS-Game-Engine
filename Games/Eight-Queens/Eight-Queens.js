import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class EightQueens extends GameEngine {
  constructor(grid) {
    super([9, 8], ["red", "yellow"]);
    this.grid = grid;
  }

  drawBoard() {
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
  
    const num = ["0", "1", "2", "3", "4", "5", "6", "7"];
    for (let i = 0; i < 8; i++) {
      const y = i * CELL_SIZE + 50 + CELL_SIZE / 2 + 12;
      const x1 = 30;
      const x2 = BOARD_SIZE + 50 + 5;
      ctx.fillText(num[i], x1, y);
      ctx.fillText(num[i], x2, y);
    }
  
    // Load the image and draw it on the canvas when it has finished loading
    const img = new Image();
    img.src = "https://cdn-icons-png.flaticon.com/512/4880/4880372.png";
    img.onload = function() {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.grid[i][j] == 1) {
            ctx.drawImage(img, j * CELL_SIZE + 50, i * CELL_SIZE + 50, 55, 55);
          }
        }
      }
    }.bind(this);
  }
  
  

      makeMove(queen,to) {
        const queenInt = queen.charCodeAt(0) - 97;
        if(this.isValid(queenInt,to)){
          console.log("to: "+to );
          console.log("queen: " +queenInt);
          this.grid[to][queenInt]=1;
          this.grid[8][queenInt]=0;
          console.log(this.grid);
          this.drawBoard();
        } else{
            console.log("invalid move");
            alert("invalid move");
        }
        
    }
    isValid(queen,to){
      const toInt = parseInt(to, 10);
      if (!Number.isInteger(toInt)) {
        
        return false;
      }
      if(queen < 0 || queen > 7 || to < 0 || to > 7){
        
        return false;
      }
      else {
        for(let i = 0 ;i < 8;i++ ){
          if(grid[to][i]==1){
            
            return false;
          }
        }
        for(let j = 0 ;j < 8 ;j++){
          if(grid[j][queen]==1){
            
            return false;
          }
        }
        let i = to;
        for(let j = queen ;j >= 0 && i >=0; j-- ){
          if(grid[i][j]==1){
            
            return false;
          }else i--;
        }
        let k = to;
        for(let j = queen ;j < 8 && k != 8; j++ ){
          if(grid[k][j]==1){
            console.log("here?");
            return false;
          }else k++;
        }
        let l = to;
        for(let j = queen ;j >= 0 && l != 8; j-- ){
          if(grid[l][j]==1){
            return false;
          }else l++;
        }
        let p = to;
        for(let j = queen ;j < 8 && p >= 0; j++ ){
          if(grid[p][j]==1){
            return false;
          }else p--;
        }
      }
     return true;
  }
    
    
      init() {
        this.drawBoard();
        const connectButton = document.getElementById("but");
        connectButton.addEventListener("click", () => {
          const queenInput = document.getElementById("from-input");
          const toInput = document.getElementById("to-input");
          const queen =queenInput.value;
          const to = toInput.value;
          this.makeMove(queen,to);
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
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
  
];
const game = new EightQueens(grid);
game.init();
