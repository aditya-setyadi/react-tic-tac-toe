import React from 'react';
import ReactDOM from 'react-dom';
import calculateWinner from './winner.js';
import Board from './board.js';
import './index.css';

function HistoryList(props) {
  return (
    <li key={props.move} className={props.buttonClassName}>
      <button className={props.buttonClassName} onClick={props.onClick}>
        {props.desc}
      </button> {props.moveDetail}
    </li>
  );
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

  renderHistoryMove() {
    const history = this.state.history;
    const stepActive = this.state.stepNumber;
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      const lastTurn = move === 0 ? null : `${(move % 2) === 0 ? 'O' : 'X'}`;
      const moveDetail = lastTurn ? `${lastTurn} moves filling box (${history[move].columnFillRecord},${history[move].rowFillRecord})` : null;
      const buttonClassName = stepActive === move ? 'selectedHistory' : 'unselectedButton';
      return (
        <HistoryList
          key={move}
          move={move}
          buttonClassName={buttonClassName}
          onClick={() => this.jumpTo(move)}
          desc={desc}
          moveDetail={moveDetail}
        />
      );
    });
    return moves;
  }

  renderNextMoveStatus(winner) {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player turn: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
  }


  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const winner = calculateWinner(history[stepNumber].squares);
    const moves = this.renderHistoryMove();
    const status = this.renderNextMoveStatus(winner);

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
