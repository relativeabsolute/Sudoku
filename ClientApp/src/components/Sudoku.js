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
        for (let i = 0; i < BoardUtilities.SIDE_LENGTH * BoardUtilities.SIDE_LENGTH; i++) {
            const possibilityValues = Array(BoardUtilities.SIDE_LENGTH).fill(false);
            cells.push({
                possibilities: possibilityValues,
                currentValue: null
            });
        }
        this.state = {
            cells: cells,
            active: { row: -1, col: -1 },
            loaded: false
        }
    }

    render() {
        // TODO: handle loaded or not loaded
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

    handleSuccessfulPuzzleRequest(result) {
        // result is a 9x9 array of cell values
        // we need to fill in the values of the state's cell objects
        let newCells = this.state.cells;
        for (let row = 0; row < BoardUtilities.SIDE_LENGTH; row++) {
            for (let col = 0; col < BoardUtilities.SIDE_LENGTH; col++) {
                const index = BoardUtilities.gridValuesToArrayIndex(row, col);
                newCells[index].currentValue = result[row][col];
            }
        }
        this.setState({
            loaded: true,
            cells: newCells
        });
    }

    componentDidMount() {
        fetch("api/PuzzleGenerator/Generate")
            .then(result => result.json())
            .then(
                (result) => {
                    this.handleSuccessfulPuzzleRequest(result);
                },
                (error) => {
                    this.setState({
                        loaded: true,
                        error
                    });
                });
    }
}