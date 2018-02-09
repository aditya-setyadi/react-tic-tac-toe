import React from 'react';
import ReactDOM from 'react-dom';
import calculateWinner from './winner.js';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row" col={0}>
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
        </div>
        <div className="board-row" col={1}>
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
        </div>
        <div className="board-row" col={2}>
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: [Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)],
          columnFillRecord: -1,
          rowFillRecord: -1,
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let colStepRecord = current.columnFillRecord;
    let rowStepRecord = current.rowFillRecord;
    const newSquares = [];

    for (let i = 0; i < current.squares.length; i++) {
      newSquares[i] = current.squares[i].slice();
    }

    if (calculateWinner(newSquares) || newSquares[i][j]) {
      return;
    }

    newSquares[i][j] = this.state.xIsNext ? 'X' : 'O';
    colStepRecord = j;
    rowStepRecord = i;
    this.setState({
      history: history.concat([{ squares: newSquares, columnFillRecord: colStepRecord, rowFillRecord: rowStepRecord }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const winner = calculateWinner(history[stepNumber].squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      const moveDetail = move === 0 ? null : `${(move % 2) === 0 ? 'O' : 'X'} moves filling box (${history[move].columnFillRecord},${history[move].rowFillRecord})`
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>{moveDetail}
        </li>
      )
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player turn: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={history[stepNumber].squares}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
