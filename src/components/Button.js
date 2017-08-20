import React, { Component } from 'react';





export default class Button extends Component {

  handleClick(e) {
    const { config } = this.props;
    this.props.onInput(config.symbol);
  }

  render() {
    const { config } = this.props;
    return (
      <td onClick={this.handleClick.bind(this)}  className="button-calc no-select" rowSpan={config.rowSpan} colSpan={config.colSpan}>
        <div className="pure-g no-select">
          <div className="pure-u-1 no-select">
            <div id={config.id} className="no-select calc-text">{config.symbol}</div>
          </div>
        </div>
      </td>
    )
  }
}