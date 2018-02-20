import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
  renderRow(column) {
    const row = this.props.squares.map((v, row) => {
      return (
        <Square
          key={row}
          value={this.props.squares[column][row]}
          onClick={() => this.props.onClick(column, row)}
        />
      )
    });
    return row;
  }

  renderBoard() {
    const column = this.props.squares.map((v, column) => {
      const row = this.renderRow(column);
      return (
        <div className="board-row" col={column} key={column}>{row}</div>
      );
    });
    return column;
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    );
  }
}