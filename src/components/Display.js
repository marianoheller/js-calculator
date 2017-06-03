import React, { Component } from 'react';
import { BigDisplay, SmallDisplay } from './SubDisplays';




export default class Display extends Component {
  render() {
    return (
        <div className="pure-g display-container">

            <div className="pure-u-1 display">
                <BigDisplay input={this.props.display.bigDisplay}></BigDisplay>
                <SmallDisplay input={this.props.display.smallDisplay}>></SmallDisplay>
            </div>

        </div>
    );
  }
}

