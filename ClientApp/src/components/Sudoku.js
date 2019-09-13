import React, { Component } from 'react';
import { CellStatus } from './CellStatus';
import { GameBoard } from './GameBoard';
import * as BoardUtilities from './BoardUtilities';
import './Sudoku.css';

export class Sudoku extends Component {
    displayName = Sudoku.name

    constructor(props) {
        super(props);
        let cells = [];
        const sideLength = 9;
        for (let i = 0; i < sideLength * sideLength; i++) {
            const possibilityValues = Array(sideLength).fill(false);
            cells.push({
                possibilities: possibilityValues,
                currentValue: null
            });
        }
        this.state = {
            cells: cells,
            active: { row: -1, col: -1 }
        }
    }

    render() {
        const activeRow = this.state.active.row;
        const activeCol = this.state.active.col;
        const index = BoardUtilities.gridValuesToArrayIndex(activeRow, activeCol);

        let cellStatus = "";
        if (BoardUtilities.isInBounds(activeRow, activeCol)) {
            cellStatus = <CellStatus activePossibilities={this.state.cells[index].possibilities}
                onPossibilityClick={(clickedNum, isPossible) => this.handlePossibilityClick(clickedNum, isPossible)} />;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <GameBoard cells={this.state.cells} active={this.state.active} onCellClick={(row, col) => this.handleCellClick(row, col)} />
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
        const index = BoardUtilities.gridValuesToArrayIndex(active.row, active.col);
        newCells[index].possibilities[clickedNum] = !isPossible;
        this.setState({
            cells: newCells
        });
    }
}