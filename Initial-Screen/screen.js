// Import Checkers class from the module

// Check if running in a browser environment
import {Checkers} from "../Games/Checkers/Checkers.js";
import {Sudoku} from "../Games/Sudoku/Sudoku.js";
import {TicTacToe} from "../Games/Tic-Tac-Toe/Tic-Tac-Toe.js";
import {Chess} from "../Games/Chess/Chess.js";

if (typeof window !== "undefined") {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const game = urlParams.get('game');

    if (game === 'Checkers') {
        let checkers = new Checkers();
        checkers.play();
        console.log(game);
        // window.location.href = "../Games/" + game + "/" + game +".html";
    } else if (game === 'chess') {
        let chess = new Chess();
        chess.play();
        // window.location.href = "../Games/" + game + "/" + game +".html";
        console.log(game);
    } else if (game === 'Connect4') {
        console.log(game);
        window.location.href = "../Games/" + game + "/" + game +".html";
    } else if (game === 'Sudoku') {
        let sudoku= new Sudoku();
        sudoku.play();
        console.log(game);
       // window.location.href = "../Games/" + game + "/" + game +".html";
    } else if (game === 'Eight-Queens') {
        console.log(game);
        window.location.href = "../Games/" + game + "/" + game +".html";
    } else if (game === 'Tic-Tac-Toe') {
        let Tic=new TicTacToe();
        Tic.play();
        console.log(game);
        // window.location.href = "../Games/" + game + "/" + game +".html";
    } else {
        console.log(game);
    }
}
