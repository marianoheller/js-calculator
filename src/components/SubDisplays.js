import React, { Component } from 'react';



export class BigDisplay extends Component {
    render() {
        return (
            <div className="pure-g">
                <div className="pure-u-1 big-display">
                    {this.props.input}
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
                    {this.props.input}
                </div>
            </div>
        )
    }
}