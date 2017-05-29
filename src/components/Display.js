import React, { Component } from 'react';
import { BigDisplay, SmallDisplay } from './SubDisplays';




export default class Display extends Component {
  render() {
    return (
        <div className="pure-g">

            <div className="pure-u-6-24"></div>
            <div className="pure-u-12-24">
                <BigDisplay input={this.props.display.bigDisplay}></BigDisplay>
                <SmallDisplay input={this.props.display.smallDisplay}>></SmallDisplay>
            </div>
            <div className="pure-u-6-24"></div>

        </div>
    );
  }
}

