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
                currentValue: null,
                status: BoardUtilities.CellStatus.UNFILLED
            });
        }
        let number_locations = {};
        for (let i = 0; i < BoardUtilities.SIDE_LENGTH; i++) {
            number_locations[i + 1] = [];
        }

        this.state = {
            cells: cells,
            active: { row: -1, col: -1 },
            loaded: false,
            invalid_cells: [],
            number_locations: number_locations
        }
    }

    render() {
        // TODO: handle loaded or not loaded
        const active = this.state.active;
        const index = BoardUtilities.gridValuesToArrayIndex(active);

        let cellStatus = "";
        if (BoardUtilities.isInBounds(active) &&
            this.state.cells[index].status != BoardUtilities.CellStatus.PROVIDED) {
            cellStatus = <CellStatus activePossibilities={this.state.cells[index].possibilities}
                onPossibilityClick={(clickedNum, isPossible) => this.handlePossibilityClick(clickedNum, isPossible)} />;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <GameBoard cells={this.state.cells} invalid_cells={this.state.invalid_cells} active={this.state.active} onCellClick={(cell) => this.handleCellClick(cell)} />
                </div>
                <div className="cell-status">
                    {cellStatus}
                 </div>
            </div>
            );
    }

    handleCellClick(cell) {
        this.setState({
            active: cell
        });
    }

    checkValid(checkCell, num) {
        let matches = this.state.number_locations[num].filter((cell) => {
            return cell.row === checkCell.row ||
                cell.col === checkCell.col ||
                BoardUtilities.blocksMatch(cell, checkCell);
        });
        this.setState({
            invalid_cells: matches
        });
    }

    handlePossibilityClick(clickedNum, isPossible) {
        let newCells = this.state.cells;
        const active = this.state.active;
        const index = BoardUtilities.gridValuesToArrayIndex(active);
        const newVal = !isPossible;
        if (newVal) {
            // TODO: should do something with CellStatus if the number isn't valid
            this.checkValid(active, clickedNum + 1);
        }
        newCells[index].possibilities[clickedNum] = newVal;
        this.setState({
            cells: newCells
        });
    }

    handleSuccessfulPuzzleRequest(result) {
        // result is a 9x9 array of cell values
        // we need to fill in the values of the state's cell objects
        let newCells = this.state.cells;
        let newLocations = this.state.number_locations;
        for (let row = 0; row < BoardUtilities.SIDE_LENGTH; row++) {
            for (let col = 0; col < BoardUtilities.SIDE_LENGTH; col++) {
                const cell = { row: row, col: col };
                const value = result[row][col];
                const index = BoardUtilities.gridValuesToArrayIndex(cell);
                newCells[index].currentValue = result[row][col];
                if (value > 0) {
                    newLocations[value].push(cell);
                    newCells[index].status = BoardUtilities.CellStatus.PROVIDED;
                }
            }
        }
        this.setState({
            loaded: true,
            cells: newCells,
            number_locations: newLocations
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