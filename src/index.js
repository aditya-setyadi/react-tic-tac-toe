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
      sort: 'asc',
      currentStepNumber: 0,
      maxStepNumber: 0,
      xIsNext: true,
    }
  }

  jumpTo(step) {
    this.setState({
      currentStepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleBoardClick(i, j) {
    const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
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
      maxStepNumber: history.length,
      currentStepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  sortButtonClick() {
    const newSortStatus = this.state.sort === 'asc' ? 'desc' : 'asc';
    this.setState({
      sort: newSortStatus
    })
  }

  renderHistoryMove(sort) {
    const history = this.state.history;
    const currentStep = this.state.currentStepNumber;
    const maxStep = this.state.maxStepNumber;
    const moves = history.map((step, move) => {
      const sortMoves = sort === 'asc' ? move : maxStep - move;
      const description = sortMoves ? `Go to move #${sortMoves}` : `Go to game start`;
      const lastTurn = sortMoves === 0 ? null : `${(sortMoves % 2) === 0 ? 'O' : 'X'}`;
      const moveDetail = lastTurn ? `${lastTurn} moves filling box (${history[sortMoves].columnFillRecord},${history[sortMoves].rowFillRecord})` : null;
      const buttonClassName = currentStep === sortMoves ? 'selectedHistory' : 'unselectedButton';
      return (
        <HistoryList
          key={sortMoves}
          move={sortMoves}
          buttonClassName={buttonClassName}
          onClick={() => this.jumpTo(sortMoves)}
          desc={description}
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
    const stepNumber = this.state.currentStepNumber;
    const winner = calculateWinner(history[stepNumber].squares);
    const moves = this.renderHistoryMove(this.state.sort);
    const status = this.renderNextMoveStatus(winner);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={history[stepNumber].squares}
            onClick={(i, j) => this.handleBoardClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortButtonClick()}>SORT{this.state.sort === 'asc' ? ' DESCENDING' : ' ASCENDING'}</button>
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
