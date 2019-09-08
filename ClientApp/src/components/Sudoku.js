import React, { Component } from 'react';
import { CellStatus } from './CellStatus';
import { GameBoard } from './GameBoard';
import './Sudoku.css';

function gridValuesToArrayIndex(row, col) {
    return row * 9 + col;
}

function isInBounds(row, col) {
    return row >= 0 && row < 9 && col >= 0 && col < 9;
}

export class Sudoku extends Component {
    displayName = Sudoku.name

    constructor(props) {
        super(props);
        let cells = [];
        const sideLength = 9;
        for (let i = 0; i < sideLength * sideLength; i++) {
            const values = Array(sideLength).fill(false);
            cells.push(values);
        }
        this.state = {
            cells: cells,
            active: { row: -1, col: -1 }
        }
    }

    render() {
        const activeRow = this.state.active.row;
        const activeCol = this.state.active.col;
        const index = gridValuesToArrayIndex(activeRow, activeCol);

        let cellStatus = "";
        if (isInBounds(activeRow, activeCol)) {
            cellStatus = <CellStatus activePossibilities={this.state.cells[index]}
                onPossibilityClick={(clickedNum, isPossible) => this.handlePossibilityClick(clickedNum, isPossible)} />;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <GameBoard active={this.state.active} onCellClick={(row, col) => this.handleCellClick(row, col)} />
                </div>
                <div className="cell-status">
                    {cellStatus}
                 </div>
            </div>
            );
    }

    handleCellClick(row, col) {
        this.setState({
            active: {
                row: row, col: col
            }
        });
    }

    handlePossibilityClick(clickedNum, isPossible) {
        let newCells = this.state.cells;
        const active = this.state.active;
        const index = gridValuesToArrayIndex(active.row, active.col);
        newCells[index][clickedNum] = !isPossible;
        this.setState({
            cells: newCells
        });
    }
}