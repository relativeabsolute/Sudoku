import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export class CellStatus extends Component {
    displayName = CellStatus.name

    renderRow(minNum, maxNum) {
        let children = [];
        for (let i = minNum; i < maxNum; i++) {
            const possible = this.props.activePossibilities[i];
            children.push(<Button key={`btn${i}`} onClick={() => this.props.onPossibilityClick(i, possible)}
                variant={possible ? "primary" : "secondary"}>{i + 1}</Button>)
        }

        return children;
    }

    renderRows() {
        let children = [];

        for (let i = 0; i < 3; i++) {
            const minNum = (i * 3);
            const maxNum = minNum + 3;
            children.push(<ButtonGroup key={`btn-row${i}`}>{this.renderRow(minNum, maxNum)}</ButtonGroup>);
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