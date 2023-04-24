const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const game = urlParams.get('game');
if (game === 'Checkers') {
  console.log(game);
  window.location.href = "../Games/" + game + "/" + game +".html";
} else if (game === 'chess') {
    console.log(game);
} else if (game === 'connectfour') {
    console.log(game);
} else if (game === 'sudoku') {
    console.log(game);
} else if (game === 'eightqueens') {
    console.log(game);
} else if (game === 'Tic-Tac-Toe') {
    console.log(game);
} else {
    console.log(game);
}