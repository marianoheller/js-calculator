import React, { Component } from 'react';



export class BigDisplay extends Component {
    render() {
        return (
            <div className="pure-g big-display-container">
                <div className="pure-u-1 big-display">
                    <p>{this.props.input}</p>
                </div>
            </div>
        )
    }
}


export class SmallDisplay extends Component {
    render() {
        return (
            <div className="pure-g">
                <div className="pure-u-1 small-display">
                    <p>{this.props.input}</p>
                </div>
            </div>
        )
    }
}