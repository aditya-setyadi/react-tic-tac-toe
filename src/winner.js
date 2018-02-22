
export function calculateWinner(squares) {
  const winner = {};
  const rowWinner = winByRow(squares);
  const columnWinner = winByColumn(squares);
  const diagonalWinner = winByDiagonal(squares);
  winner.by = rowWinner.by || columnWinner.by || diagonalWinner.by;
  winner.detail = rowWinner.detail || columnWinner.detail || diagonalWinner.detail;
  return winner;
}

function winByRow(squares) {
  const win = {};
  for (let row = 0; row < squares.length; row++) {
    if (squares[row][0] && squares[row][0] === squares[row][1] && squares[row][0] === squares[row][2]) {
      win.by = squares[row][0];
      win.detail = { row: [row, row, row], column: [0, 1, 2] };
      return win;
    }
  }
  return { by: null, detail: null };
}

function winByColumn(squares) {
  const win = {};
  for (let column = 0; column < squares.length; column++) {
    if (squares[0][column] && squares[0][column] === squares[1][column] && squares[0][column] === squares[2][column]) {
      win.by = squares[0][column];
      win.detail = { row: [0, 1, 2], column: [column, column, column] };
      return win;
    }
  }
  return { by: null, detail: null };
}

function winByDiagonal(squares) {
  const win = {};
  if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
    win.by = squares[1][1];
    win.detail = { row: [0, 1, 2], column: [0, 1, 2] };
    return win;
  } else if (squares[0][2] && squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]) {
    win.by = squares[1][1];
    win.detail = { row: [0, 1, 2], column: [2, 1, 0] };
    return win;
  } else {
    return { by: null, detail: null }
  }
}

