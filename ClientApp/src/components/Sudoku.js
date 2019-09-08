import React, { Component } from 'react';
import './Sudoku.css';

function gridValuesToArrayIndex(row, col) {
    return row * 9 + col;
}

function isInBounds(row, col) {
    return row >= 0 && row < 9 && col >= 0 && col < 9;
}

function Square(props) {
    let className = "square";
    if (props.isActive) {
        className += " active";
    }
    return (
        <button className={className} onClick={props.onClick}>?</button>
        );
}

class GameBoard extends Component {
    displayName = GameBoard.name

    createGrid(gridRow, gridCol) {
        let table = [];

        for (let i = 0; i < 3; i++) {
            let children = [];

            let row = gridRow * 3 + i;
            for (let j = 0; j < 3; j++) {
                let col = gridCol * 3 + j;

                const isActive = row === this.props.active.row && col === this.props.active.col;

                children.push(<td key={row * 3 + col}><Square isActive={isActive} onClick={() =>
                    this.props.onCellClick(row, col)} /></td>);
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
                children.push(<td key={`grid${i},${j}`}>
                    <table className="grid"><tbody>{this.createGrid(i, j)}</tbody></table>
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

class CellStatus extends Component {
    displayName = CellStatus.name

    renderRow(minNum, maxNum) {
        let children = [];
        for (let i = minNum; i < maxNum; i++) {
            const possible = this.props.activePossibilities[i];
            let btnClass = possible ? "btn-primary" : "btn-secondary";
            children.push(<button onClick={() => this.props.onPossibilityClick(i, possible)} key={`btn${i}`} className={`btn ${btnClass}`}>{i + 1}</button>);
        }

        return children;
    }

    renderRows() {
        let children = [];

        for (let i = 0; i < 3; i++) {
            const minNum = (i * 3);
            const maxNum = minNum + 3;
            children.push(<div key={`btn-row${i}`} className="btn-group">{this.renderRow(minNum, maxNum)}</div>);
        }

        return children;
    }

    render() {
        return (
            <div className="cell-status">
            <h3 className="h3 mb-5">Options:</h3>
            <div className="numberButtons">
            {this.renderRows()}
                </div>
                </div>)
    }
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