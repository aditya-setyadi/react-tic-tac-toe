
export default function calculateWinner(squares) {
  let rowWinner = winByRow(squares);
  let columnWinner = winByColumn(squares);
  let diagonalWinner = winByDiagonal(squares);
  return rowWinner || columnWinner || diagonalWinner;
}

function winByRow(squares) {
  for (let row = 0; row < squares.length; row++) {
    if (squares[row][0] && squares[row][0] === squares[row][1] && squares[row][0] === squares[row][2]) {
      return squares[row][0];
    }
  }
  return null;
}

function winByColumn(squares) {
  for (let column = 0; column < squares.length; column++) {
    if (squares[0][column] && squares[0][column] === squares[1][column] && squares[0][column] === squares[2][column]) {
      return squares[0][column];
    }
  }
  return null;
}

function winByDiagonal(squares) {
  if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
    return squares[0][0];
  } else if (squares[0][2] && squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]) {
    return squares[0][2];
  } else return null;
}

