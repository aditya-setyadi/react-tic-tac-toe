import React from 'react';

function Square(props) {
  return (
    <button className={props.btnClassName} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
  renderHighlightSquare(row, column) {
    const isWin = this.props.columnWin === 'no-winner' ? false : true;
    let rowToHighlight = -1;
    let colToHighlight = -1;

    //checking if win by row or column
    const isWinByRow = this.props.rowWin[0] === this.props.rowWin[1] && this.props.rowWin[1] === this.props.rowWin[2];
    const isWinByColumn = this.props.columnWin[0] === this.props.columnWin[1] && this.props.columnWin[1] === this.props.columnWin[2];

    if (isWinByRow) {
      rowToHighlight = this.props.rowWin[0] === row;
      colToHighlight = this.props.columnWin[column] === column;
    } else if (isWinByColumn) {
      rowToHighlight = this.props.rowWin[row] === row;
      colToHighlight = this.props.columnWin[0] === column;
    } else if (!isWinByColumn && !isWinByRow) {
      const rowList = this.props.rowWin[column];
      const columnList = this.props.columnWin[column];

      //condition for diagonal win compare row vs column
      rowToHighlight = rowList === column;
      colToHighlight = columnList === row;
    }
    return isWin && colToHighlight && rowToHighlight ? 'win-square' : 'square';
  }

  renderColumn(row) {
    const columns = this.props.squares.map((v, column) => {
      const btnClassName = this.renderHighlightSquare(row, column);
      return (
        <Square
          key={column}
          value={this.props.squares[row][column]}
          onClick={() => this.props.onClick(row, column)}
          btnClassName={btnClassName}
        />
      )
    });
    return columns;
  }

  renderBoard() {
    const board = this.props.squares.map((v, row) => {
      const boardColumn = this.renderColumn(row);
      return (
        <div className="board-row" row={row} key={row}>{boardColumn}</div>
      );
    });
    return board;
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}