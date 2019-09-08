import React, { Component } from 'react';

function Square(props) {
    let className = "square";
    if (props.isActive) {
        className += " active";
    }
    return (
        <button className={className} onClick={props.onClick}>?</button>
    );
}

export class GameBoard extends Component {
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