import React, { Component } from 'react';



export class BigDisplay extends Component {
    render() {
        return (
            <p>{this.props.input}</p>
        )
    }
}


export class SmallDisplay extends Component {
    render() {
        return (
            <div>
                <p>{this.props.input}</p>
            </div>
        )
    }
}