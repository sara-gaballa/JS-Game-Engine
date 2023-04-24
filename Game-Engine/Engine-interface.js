export class GameEngine {
    constructor(boardSize, pieces) {
      this.boardSize = boardSize;
      this.pieces = pieces;
      this.board = Array.from({ length: boardSize[0] }, () => Array.from({ length: boardSize[1] }, () => null));
    }
    drawBoard(){}
}