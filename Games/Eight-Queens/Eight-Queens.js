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
          if (grid[i][j] == 1) {
            ctx.drawImage(img, j * CELL_SIZE + 50, i * CELL_SIZE + 50, 55, 55);
          }
        }
      }
    }.bind(this);
  }

  // takeInputFromUser() {
  //   return new Promise(resolve => {
  //     const input = prompt("Enter the queen letter and the column number (a 1)");
  //     const inputArray = input.split(" ");
  //     resolve(inputArray);
  //   });
  // }
  parseInput(input){//a 7
    if(input.length>3) return[NaN,NaN];
    const column = input.charAt(0).charCodeAt(0) - 97;
    const row = parseInt(input.charAt(2));
    return [column,row];
  }
  makeMove(input,grid) {
      const column = input[0]; // column is now 0
      const row = input[1];
      grid[row][column]=1;
      grid[8][column]=0;
      return grid;
      
  }

  isValid(input,grid,turn){//What The???
    const column = input[0]; // column is now 0
    const row = input[1];
    const toInt = parseInt(row, 10);
    if(isNaN(row)||isNaN(column)){
      alert("invaild input");
      return false;
    }
    if (!Number.isInteger(toInt)) {
      alert("invaild input");
      return false;
    }
    console.log("row= "+row+" col = "+column);
    if(column < 0 || column > 7 || row < 0 || row > 7){
      alert("invaild input");
      return false;
    }
    else {
      for(let i = 0 ;i < 8;i++ ){
        if(grid[row][i]==1){
          alert("invaild place");
          return false;
        }
      }
      for(let j = 0 ;j < 8 ;j++){
        if(grid[j][column]==1){
          alert("invaild place");
          return false;
        }
      }
      let i = row;
      for(let j = column ;j >= 0 && i >=0; j-- ){
        if(grid[i][j]==1){
          alert("invaild place");
          return false;
        }else i--;
      }
      let k = row;
      for(let j = column ;j < 8 && k != 8; j++ ){
        if(grid[k][j]==1){
          alert("invaild place");
          return false;
        }else k++;
      }
      let l = row;
      for(let j = column ;j >= 0 && l != 8; j-- ){
        if(grid[l][j]==1){
          alert("invaild place");
          return false;
        }else l++;
      }
      let p = row;
      for(let j = column ;j < 8 && p >= 0; j++ ){
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
