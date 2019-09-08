import React, { Component } from 'react';

export class CellStatus extends Component {
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