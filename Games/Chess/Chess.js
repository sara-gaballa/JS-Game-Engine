import { GameEngine } from "../../Game-Engine/Engine-abstract.js";

export class Chess extends GameEngine {
    drawBoard(grid) {
        const canvas = document.getElementById("canvas");
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

        IMAGES.pawn1.src = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg";
        IMAGES.rook1.src = "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg";
        IMAGES.Knight1.src = "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg";
        IMAGES.Bishop1.src = "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg";
        IMAGES.Queen1.src = "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg";
        IMAGES.King1.src = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg";

        IMAGES.pawn2.src = "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg";
        IMAGES.rook2.src = "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg";
        IMAGES.Knight2.src = "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg";
        IMAGES.Bishop2.src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg";
        IMAGES.Queen2.src = "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg";
        IMAGES.King2.src = "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg";
        Promise.all(Object.values(IMAGES).map(img => new Promise(resolve => img.onload = resolve)))
            .then(() => {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if(grid[i][j][0] == "-"){
                            if(grid[i][j] == "-P"){
                                ctx.drawImage(IMAGES.pawn2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "-R"){
                                ctx.drawImage(IMAGES.rook2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "-Kn"){
                                ctx.drawImage(IMAGES.Knight2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "-B"){
                                ctx.drawImage(IMAGES.Bishop2, j * CELL_SIZE + 25, i * CELL_SIZE + 25, 85, 85);
                            }else if(grid[i][j] == "-Q"){
                                ctx.drawImage(IMAGES.Queen2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "-K"){
                                ctx.drawImage(IMAGES.King2, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }
                        }else{
                            if(grid[i][j] == "+P"){
                                ctx.drawImage(IMAGES.pawn1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "+R"){
                                ctx.drawImage(IMAGES.rook1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "+Kn"){
                                ctx.drawImage(IMAGES.Knight1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "+B"){
                                ctx.drawImage(IMAGES.Bishop1, j * CELL_SIZE + 25, i * CELL_SIZE + 25, 85, 85);
                            }else if(grid[i][j] == "+Q"){
                                ctx.drawImage(IMAGES.Queen1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }else if(grid[i][j] == "+K"){
                                ctx.drawImage(IMAGES.King1, j * CELL_SIZE + 30, i * CELL_SIZE + 30, 75, 75);
                            }
                        }
                    }
                }

            });
    }
    pawnMove(fromRow, fromCol, toRow, toCol, color, grid){
        var bool = false
        if(color == "black"){
            if(((toRow - fromRow == 1 && toCol == fromCol) || (fromRow == 1 && ((toRow - fromRow == 2 && toCol == fromCol))))){//if one move or first move is double celled 
                bool = true
            }else if(((toRow - fromRow == 1 &&  Math.abs(toCol - fromCol) == 1) && grid[7 - toRow][toCol] != 0 )){//killing move
                bool = true
            }
        }else {//white pawn
            if((toRow - fromRow == -1 && toCol == fromCol) || (fromRow == 6 && ((toRow - fromRow == -2 && toCol == fromCol)))){//if one move or first move is double celled 
                bool = true
            }else if((toRow - fromRow == -1 &&  Math.abs(toCol - fromCol) == 1) && grid[7 - toRow][toCol] != 0){//killing move
                bool = true
            }
        }
        return bool
    }
    rookMove(fromRow, fromCol, toRow, toCol, grid){
        if(toRow - fromRow != 0 && toCol == fromCol) {//vertical move
            if(toRow > fromRow){
                for (let i = 7 - fromRow - 1; i > 7 - toRow; i--) {//check there is not a piece on the way
                    console.log(i)
                    if(grid[i][toCol] != 0) return false
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
                    if(grid[fromRow][i] != 0) return false
                }
                return true
            }else {
                for (let i = toCol ; i < fromCol ; i++) {//check there is not a piece on the way
                    if(grid[fromRow][i] != 0) return false
                }
                return true
            }
        }
        return false
    }

    bishopMove(fromRow, fromCol, toRow, toCol, grid){
        if(Math.abs(toCol - fromCol) != Math.abs(toRow - fromRow)) return false
        let xDiff = 7 - toRow > 7 - fromRow ? 1 : -1;
        let yDiff = fromCol > toCol ? -1 : 1;
        let x = 7 - fromRow + xDiff;
        let y = fromCol + yDiff;
        
        // If the path is not empty, return false
        while (x != 7 - toRow && y != toCol) {
            if (grid[x][y] !== 0) {
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
    knightMove(fromRow, fromCol, toRow, toCol, color,grid){
        var bool = false;
        if(color == "black"){
            if(toRow >= 8 || toCol >= 8 || toRow < 0 || toCol < 0) bool = false;
            if((toCol == fromCol - 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toCol == fromCol + 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toRow == fromRow - 2 && (toCol == fromCol - 1 || toCol == fromCol + 1)) || (toRow == fromRow + 2 && (toCol == fromCol - 1 || toCol == fromCol + 1))){
                if(grid[7 - toRow][toCol].toString().charAt(0)== "-" || grid[7 - toRow][toCol].toString().charAt(0)== 0){
                    bool = true;
                }else bool = false;
            }
        }else {//white knight
            if(toRow >= 8 || toCol >= 8 || toRow < 0 || toCol < 0) bool = false;
            if((toCol == fromCol - 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toCol == fromCol + 2 && (toRow == fromRow - 1 || toRow == fromRow + 1)) || (toRow == fromRow - 2 && (toCol == fromCol - 1 || toCol == fromCol + 1)) || (toRow == fromRow + 2 && (toCol == fromCol - 1 || toCol == fromCol + 1))){
                if(grid[7 - toRow][toCol].toString().charAt(0)!= "-" || grid[7 - toRow][toCol].toString().charAt(0)== 0){
                    bool = true;
                }else bool = false;
            }
        }
        return bool
    }
    queenMove(fromRow, fromCol, toRow, toCol, color, grid){
        if(this.bishopMove(fromRow, fromCol, toRow, toCol, color) || this.rookMove(fromRow, fromCol, toRow, toCol, color)){
            return true
        }else{
            return false
        }
    }
//     takeInputFromUser() {
//         // window.onload = function() {
//             return new Promise(resolve => {
//                 const fromRow = parseInt(prompt("Enter the row number of the piece to move (1-8)")) - 1;
//                 const fromCol = prompt("Enter the column letter of the piece to move (a-h)").charCodeAt(0) - 97;
//                 const toRow = parseInt(prompt("Enter the row number of the destination square (1-8)")) - 1;
//                 const toCol = prompt("Enter the column letter of the destination square (a-h)").charCodeAt(0) - 97;
//                 const input = [fromRow, fromCol, toRow, toCol];
//                 console.log("input: ", input);
//                 resolve(input);
//             });
// // }
//     }

    parseInput(input){//2a 3a
        if(input.length>5) return[NaN,NaN,NaN,NaN];
        const fromRow = parseInt(input.charAt(0)) - 1;
        const fromCol = input.charAt(1).charCodeAt(0) - 97;
        const toRow = parseInt(input.charAt(3)) - 1;
        const toCol = input.charAt(4).charCodeAt(0) - 97;
        return [fromRow, fromCol, toRow, toCol];
    }

    isValid(input,grid,turn){
        console.log(input)
        const fromRow = input[0];
        const fromCol = input[1];
        const toRow = input[2];
        const toCol = input[3];
        console.log("fromR "+ fromRow+" fromcol "+ fromCol +"ftoR "+ toRow+" tocol "+ toCol)
        if(isNaN(fromRow)  ||isNaN(fromCol) || isNaN(toRow) || isNaN(toCol)) {
            console.log("In first2");
            alert("Invalid input!!");
            return false;
          }
        if(fromRow < 0 || fromRow > 7 || fromCol < 0 || fromCol > 7 || toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) {
            console.log("In second");
            alert("Invalid input!!");
            return false;
        }
        if((grid[7 - fromRow][fromCol].toString().charAt(0)=='-' && turn!=-1)||(grid[7 - fromRow][fromCol].toString().charAt(0)!='-' && turn!=1)){
            console.log("In third");
            alert("Not current player's piece");
            return false;
        }
        if((fromRow != toRow || fromCol != toCol) && (grid[7 - toRow][toCol].toString().charAt(0) != grid[7 - fromRow][fromCol].toString().charAt(0))){
            if(grid[7 - fromRow][fromCol] == "+P" &&turn == 1){
                if(!this.pawnMove(fromRow, fromCol, toRow, toCol, "black", grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if(grid[7 - fromRow][fromCol] == "-P" && turn == -1){
               if(!this.pawnMove(fromRow, fromCol, toRow, toCol, "white", grid)){
                    alert("Invalid input!!");
                    return false;
               }
            }else if(grid[7 - fromRow][fromCol] == "+R" && turn == 1){
                if(!this.rookMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if(grid[7 - fromRow][fromCol] == "-R" && turn == -1){
                if(!this.rookMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if(grid[7 - fromRow][fromCol] == "+B" && turn == 1){
                if(!this.bishopMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if(grid[7 - fromRow][fromCol] == "-B" && turn == -1){
               if(!this.bishopMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
               }
            }else if(grid[7 - fromRow][fromCol] == "+K" && turn == 1){
                if(!this.kingMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if(grid[7 - fromRow][fromCol] == "-K" && turn == -1){
               if(!this.kingMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
               }
            }else if(grid[7 - fromRow][fromCol] == "+Kn" && turn == 1){
                if(!this.knightMove(fromRow, fromCol, toRow, toCol, "black", grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if(grid[7 - fromRow][fromCol] == "-Kn" && turn == -1){
               if(!this.knightMove(fromRow, fromCol, toRow, toCol, "white", grid)){
                    alert("Invalid input!!");
                    return false;
               }
            }else if(grid[7 - fromRow][fromCol] == "+Q" && turn == 1){
                if(!this.queenMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
                }
            }else if( grid[7 - fromRow][fromCol] == "-Q" && turn == -1){
               if(!this.queenMove(fromRow, fromCol, toRow, toCol, grid)){
                    alert("Invalid input!!");
                    return false;
               }
            }
            return true;
   }
    else{
        alert("Invalid input!!");
            return false;
        }
    }

    makeMove(input,grid){
        const fromRow = input[0];
        const fromCol = input[1];
        const toRow = input[2];
        const toCol = input[3];
        console.log(grid);
        if(fromRow != undefined && fromCol!= undefined && toRow != undefined && toCol != undefined){
            grid[7 - toRow][toCol] = grid[7 - fromRow][fromCol];
            grid[7 - fromRow][fromCol] = 0;
        }
        return grid;
    }

    whichPlayer(turn){
        const curPlayer = document.getElementById("currPlayer");
        curPlayer.value = turn === -1? "White" : "Black";
    }


    init(){
        var grid = [
            ["-R", "-Kn", "-B", "-Q", "-K", "-B", "-Kn", "-R"],
            ["-P", "-P", "-P", "-P", "-P", "-P", "-P", "-P"],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            ["+P", "+P", "+P", "+P", "+P", "+P", "+P", "+P"],
            ["+R", "+Kn", "+B","+Q", "+K", "+B", "+Kn", "+R"],
        ];
        var noOfPlayers = 2;
        return {
            grid: grid,
            noOfPlayers: noOfPlayers,
        };
    }
    
}
