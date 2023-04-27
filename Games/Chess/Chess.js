import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export default class Chess extends GameEngine {
    constructor(grid) {
        super([8, 8], []);
        this.currentPlayer = 1;//black
        this.grid = grid;
      }
    drawBoard(){
        const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext("2d");
    
        const CELL_SIZE = 75;
        const BOARD_SIZE = CELL_SIZE * 8;
    
        ctx.fillStyle = "#FFF";
        ctx.fillRect(30, 30, BOARD_SIZE, BOARD_SIZE);
    
        // Draw the background cells
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    ctx.fillStyle = "#EEE";
                } else {
                    ctx.fillStyle = "#666666";
                }
                ctx.fillRect(i * CELL_SIZE + 30, j * CELL_SIZE + 30, CELL_SIZE, CELL_SIZE);
            }
        }
               // Add numbers and letters to the top cells
        ctx.font = "bold 15px Arial";
        ctx.fillStyle = "#000";
        const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
        for (let i = 0; i < 8; i++) {
            const x = i * CELL_SIZE + 30 + CELL_SIZE / 2 - 10;
            const y1 = 20;
            const y2 = BOARD_SIZE + 20  + 26;
            ctx.fillText(letters[i], x , y1);
            ctx.fillText(letters[i], x, y2);
        }

        ctx.font = "bold 15px Arial";
        ctx.fillStyle = "#000";
        const num = [ "8", "7", "6", "5", "4", "3", "2", "1"];
        for (let i = 0; i < 8; i++) {
            const y = i * CELL_SIZE + 30 + CELL_SIZE / 2 + 12;
            const x1 = 20;
            const x2 = BOARD_SIZE +30 + 5;
            ctx.fillText(num[i], x1, y);
            ctx.fillText(num[i], x2, y);
        }

        const IMAGES = {
            pawn1: new Image(),
            rook1: new Image(),
            Knight1: new Image(),
            Bishop1: new Image(),
            Queen1: new Image(),
            King1: new Image(),
            pawn2: new Image(),
            rook2: new Image(),
            Knight2: new Image(),
            Bishop2: new Image(),
            Queen2: new Image(),
            King2: new Image(),
            // add more images here
          };
          
          IMAGES.pawn1.src = "https://cdn-icons-png.flaticon.com/512/657/657487.png";
          IMAGES.rook1.src = "https://cdn-icons-png.flaticon.com/512/1626/1626883.png";
          IMAGES.Knight1.src = "https://cdn-icons-png.flaticon.com/512/3612/3612777.png";
          IMAGES.Bishop1.src = "https://cdn-icons-png.flaticon.com/512/5077/5077021.png";
          IMAGES.Queen1.src = "https://cdn-icons-png.flaticon.com/512/658/658098.png";
          IMAGES.King1.src = "https://cdn-icons-png.flaticon.com/512/3522/3522646.png";

          IMAGES.pawn2.src = "https://cdn-icons-png.flaticon.com/512/657/657588.png";
          IMAGES.rook2.src = "https://cdn-icons-png.flaticon.com/512/1626/1626848.png";
          IMAGES.Knight2.src = "https://cdn-icons-png.flaticon.com/512/3610/3610829.png";
          IMAGES.Bishop2.src = "https://cdn-icons-png.flaticon.com/512/5077/5077028.png";
          IMAGES.Queen2.src = "https://cdn-icons-png.flaticon.com/512/657/657997.png";
          IMAGES.King2.src = "https://cdn-icons-png.flaticon.com/512/3522/3522656.png";
          Promise.all(Object.values(IMAGES).map(img => new Promise(resolve => img.onload = resolve)))
            .then(() => {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if(this.grid[i][j][0] == "-"){
                            if(this.grid[i][j] == "-P"){
                                ctx.drawImage(IMAGES.pawn2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "-R"){
                                ctx.drawImage(IMAGES.rook2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "-Kn"){
                                ctx.drawImage(IMAGES.Knight2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "-B"){
                                ctx.drawImage(IMAGES.Bishop2, j * CELL_SIZE + 20, i * CELL_SIZE + 20, 85, 85);
                            }else if(this.grid[i][j] == "-Q"){
                                ctx.drawImage(IMAGES.Queen2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "-K"){
                                ctx.drawImage(IMAGES.King2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }
                        }else{
                            if(this.grid[i][j] == "P"){
                                ctx.drawImage(IMAGES.pawn1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "R"){
                                ctx.drawImage(IMAGES.rook1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "Kn"){
                                ctx.drawImage(IMAGES.Knight1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "B"){
                                ctx.drawImage(IMAGES.Bishop1, j * CELL_SIZE + 20, i * CELL_SIZE + 20, 85, 85);
                            }else if(this.grid[i][j] == "Q"){
                                ctx.drawImage(IMAGES.Queen1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(this.grid[i][j] == "K"){
                                ctx.drawImage(IMAGES.King1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }
                      }
                }
            }
            
        });
    }
    pawnMove(fromRow, fromCol, toRow, toCol, color){
        var bool = false
        if(color == "black"){
            if(((toRow - fromRow == 1 && toCol == fromCol) || (fromRow == 1 && ((toRow - fromRow == 2 && toCol == fromCol))))){//if one move or first move is double celled 
                bool = true
            }else if(((toRow - fromRow == 1 &&  Math.abs(toCol - fromCol) == 1) && this.grid[7 - toRow][toCol] != 0 )&& this.grid[7 - toRow][toCol] == 0){//killing move
                bool = true
            }
        }else {//white pawn
            if((toRow - fromRow == -1 && toCol == fromCol) || (fromRow == 6 && ((toRow - fromRow == -2 && toCol == fromCol)))){//if one move or first move is double celled 
                bool = true
            }else if((toRow - fromRow == -1 &&  Math.abs(toCol - fromCol) == 1) && this.grid[7 - toRow][toCol] != 0){//killing move
                bool = true
            }
        }
        return bool
    }
    rookMove(fromRow, fromCol, toRow, toCol){
        if(toRow - fromRow != 0 && toCol == fromCol) {//vertical move
            if(toRow > fromRow){
                for (let i = 7 - fromRow - 1; i > 7 - toRow; i--) {//check there is not a piece on the way
                    console.log(i)
                    if(this.grid[i][toCol] != 0) return false
                }
                return true
            }else {
                for (let i = 7 - fromRow + 1; i < 7 - toRow; i++) {//check there is not a piece on the way
                    if(this.grid[i][toCol] != 0) return false
                }
                return true
            }
        }else if(toRow == fromRow  && toCol - fromCol != 0){//horizontal move
            if(toCol > fromCol){
                for (let i = fromCol + 1; i < toCol; i++) {//check there is not a piece on the way
                    if(this.grid[fromRow][i] != 0) return false
                }
                return true
            }else {
                for (let i = toCol ; i < fromCol ; i++) {//check there is not a piece on the way
                    if(this.grid[fromRow][i] != 0) return false
                }
                return true
            }
        }
        return false
    }

    bishopMove(fromRow, fromCol, toRow, toCol){
        if(Math.abs(toCol - fromCol) != Math.abs(toRow - fromRow)) return false
        let xDiff = 7 - toRow > 7 - fromRow ? 1 : -1;
        let yDiff = fromCol > toCol ? -1 : 1;
        let x = 7 - fromRow + xDiff;
        let y = fromCol + yDiff;
        
        // If the path is not empty, return false
        while (x != 7 - toRow && y != toCol) {
            if (this.grid[x][y] !== 0) {
                return false;
            }
            x += xDiff;
            y += yDiff;
        }
        return true
    }  

    kingMove(fromRow, fromCol, toRow, toCol){
       if( Math.abs(fromRow - toRow) == 1 && Math.abs(fromCol - toCol) == 1 || Math.abs(fromRow - toRow) == 0 && Math.abs(fromCol - toCol) == 1 || Math.abs(fromRow - toRow) == 1 && Math.abs(fromCol - toCol) == 0) return true
        else return false
    }       
    knightMove(fromRow, fromCol, toRow, toCol, color){
        var bool = false;
        if(color == "black"){
            if(toRow >= 8 || toCol >= 8 || toRow < 0 || toCol < 0) bool = false;
            if((toCol == fromCol - 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toCol == fromCol + 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toRow == fromRow - 2 && (toCol == fromCol - 1 || toCol == fromCol + 1)) || (toRow == fromRow + 2 && (toCol == fromCol - 1 || toCol == fromCol + 1))){
                if(this.grid[7 - toRow][toCol].toString().charAt(0)== "-" || this.grid[7 - toRow][toCol].toString().charAt(0)== 0){
                    bool = true;
                }else bool = false;
            }
        }else {//white knight
            if(toRow >= 8 || toCol >= 8 || toRow < 0 || toCol < 0) bool = false;
            if((toCol == fromCol - 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toCol == fromCol + 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toRow == fromRow - 2 && (toCol == fromCol - 1 || toCol == fromCol + 1)) || (toRow == fromRow + 2 && (toCol == fromCol - 1 || toCol == fromCol + 1))){
                if(this.grid[7 - toRow][toCol].toString().charAt(0)!= "-" || this.grid[7 - toRow][toCol].toString().charAt(0)== 0){
                    bool = true;
                }else bool = false;
            }
        }
        return bool
    }
    queenMove(fromRow, fromCol, toRow, toCol, color){
        if(this.bishopMove(fromRow, fromCol, toRow, toCol, color) || this.rookMove(fromRow, fromCol, toRow, toCol, color)){
            return true
        }else{
            return false
        }
    }
    isValid(fromRow, fromCol, toRow, toCol){
        console.log("fromR "+ fromRow+" fromcol "+ fromCol +"ftoR "+ toRow+" tocol "+ toCol)
        //if((fromRow != toRow || fromCol != toCol) && (( this.grid[7 - toRow][toCol].toString().charAt(0)!= "-" || this.grid[7 - toRow][toCol].toString().charAt(0)== 0 ) && ((this.grid[7 - toRow][toCol].toString().charAt(0)== "-" || this.grid[7 - toRow][toCol].toString().charAt(0)== 0)))){
            if(this.grid[7 - fromRow][fromCol] == "P" && this.currentPlayer == 1){
                return this.pawnMove(fromRow, fromCol, toRow, toCol, "black")
            }else if(this.grid[7 - fromRow][fromCol] == "-P" && this.currentPlayer == -1){
               return this.pawnMove(fromRow, fromCol, toRow, toCol, "white")
            }else if(this.grid[7 - fromRow][fromCol] == "R" && this.currentPlayer == 1){
                return this.rookMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "-R" && this.currentPlayer == -1){
                return this.rookMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "B" && this.currentPlayer == 1){
                return this.bishopMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "-B" && this.currentPlayer == -1){
                return this.bishopMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "K" && this.currentPlayer == 1){
                return this.kingMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "-K" && this.currentPlayer == -1){
                return this.kingMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "Kn" && this.currentPlayer == 1){
                return this.knightMove(fromRow, fromCol, toRow, toCol, "black")
            }else if(this.grid[7 - fromRow][fromCol] == "-Kn" && this.currentPlayer == -1){
               return this.knightMove(fromRow, fromCol, toRow, toCol, "white")
            }else if(this.grid[7 - fromRow][fromCol] == "Q" && this.currentPlayer == 1){
                return this.queenMove(fromRow, fromCol, toRow, toCol)
            }else if(this.grid[7 - fromRow][fromCol] == "-Q" && this.currentPlayer == -1){
               return this.queenMove(fromRow, fromCol, toRow, toCol)
            }
   // }
    else{
            return false
        }
        

    }
    
    makeMove(fromRow, fromCol, toRow, toCol) {
        console.log(this.grid);
        if(fromRow != undefined && fromCol!= undefined && toRow != undefined && toCol != undefined && this.isValid(fromRow, fromCol, toRow, toCol)){
            this.currentPlayer = -1 * this.currentPlayer
            this.grid[7 - toRow][toCol] = this.grid[7 - fromRow][fromCol];
            this.grid[7 - fromRow][fromCol] = 0;
            this.drawBoard();
        }else{
            alert("Invalid move")
        }
    }
    init() {
        this.drawBoard();
        const connectButton = document.getElementById("but");
        connectButton.addEventListener("click", () => {
          const fromInput = document.getElementById("from-input");
          const toInput = document.getElementById("to-input");
          const from = fromInput.value;
          const to = toInput.value;
          const fromRow = parseInt(from.charAt(0)) - 1;
          const fromCol = from.charAt(1).charCodeAt(0) - 97;
          const toRow = parseInt(to.charAt(0)) - 1;
          const toCol = to.charAt(1).charCodeAt(0) - 97;
          this.makeMove(fromRow, fromCol, toRow, toCol);
        });
      }
    
    
}
var grid = [
    ["-R", "-Kn", "-B", "-Q", "-K", "-B", "-Kn", "-R"],
    [0, 0, "-P", "-P", "-P", "-P", "-P", "-P"],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, "P", 0, 0, 0, 0],
    [0, "Q", 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, "P"],
    [0, 0, "P", 0, 0, 0, 0, 0],
    ["R", "Kn", "B", 0, "K", "Q", "Kn", "R"],
  ];
const game = new Chess(grid);
game.init(); // call the drawboard() method to draw the board and pawn on the canvas