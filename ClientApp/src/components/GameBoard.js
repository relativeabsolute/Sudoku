import React, { Component } from 'react';
import * as BoardUtilities from './BoardUtilities';

function Square(props) {
    let className = "square";
    let cellValue = props.cellValue;
    // TODO: differentiate between user-filled in values and values provided by the puzzle
    if (!cellValue) {
        cellValue = '?';
        if (!props.isActive) {
            className += " to-fill";
        } else {
            className += " active";
        }
    } else if (props.isInvalid) {
        className += " invalid";
    }
    return (
        <button className={className} onClick={props.onClick}>{cellValue}</button>
    );
}

export class GameBoard extends Component {
    displayName = GameBoard.name

    createGrid(gridCell) {
        let table = [];

        for (let i = 0; i < 3; i++) {
            let children = [];

            const row = gridCell.row * 3 + i;
            for (let j = 0; j < 3; j++) {
                let curCell = { row: row, col: gridCell.col * 3 + j };

                const isActive = curCell.row === this.props.active.row && curCell.col === this.props.active.col;
                const isInvalid = this.props.invalid_cells.findIndex(
                    (cell) => BoardUtilities.cellsMatch(cell, curCell)) > -1;

                children.push(<td key={curCell.row * 3 + curCell.col}><Square cellValue={
                    this.props.cells[BoardUtilities.gridValuesToArrayIndex(curCell)].currentValue}
                    isActive={isActive} isInvalid={isInvalid} onClick={() => this.props.onCellClick(curCell)} /></td>);
            }

            table.push(<tr key={`row${row}`}>{children}</tr>);
        }

        return table
    }

    createTable() {
        let table = [];

        for (let i = 0; i < 3; i++) {
            let children = [];

            for (let j = 0; j < 3; j++) {
                const cell = { row: i, col: j };
                children.push(<td key={`grid${i},${j}`}>
                    <table className="grid"><tbody>{this.createGrid(cell)}</tbody></table>
                </td>);
            }

            table.push(<tr key={`gridrow${i}`}>{children}</tr>);
        }
        return table
    }

    render() {
        return (
            <table>
                <tbody>
                    {this.createTable()}
                </tbody>
            </table>
        );
    }
}