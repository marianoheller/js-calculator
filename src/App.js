import React, { Component } from 'react';
import './App.css';

import { buttonsConfig, buttonsOrder } from './configApp';


//const widthButtonera = 4; //4 botones chicos por fila
const cantRows = 5;




class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator></Calculator>
      </div>
    );
  }
}



class Calculator extends Component {
  render() {
    return (
      <div className="pure-g">
        
        <div className="pure-u-6-24"></div>
        <div className="pure-u-12-24">
          <Header></Header>
        </div>
        <div className="pure-u-6-24"></div>
        
        <div className="pure-u-6-24"></div>
        <div className="pure-u-12-24">
          <Display></Display>
        </div>
        <div className="pure-u-6-24"></div>

        <div className="pure-u-6-24"></div>
        <div className="pure-u-12-24">
          <Buttonera></Buttonera>
        </div>
        <div className="pure-u-6-24"></div>

      </div>
    );
  }
}


class Header extends Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <p>Header</p>
        </div>
      </div>
    );
  }
}

class Display extends Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <p>Display</p>
        </div>
      </div>
    );
  }
}

class Buttonera extends Component {

  getButtons() {
    let ret = [];

    for( let i=0 ; i<cantRows ; i++) {
      ret.push(
        (
          <tr key={i}>
            { 
              buttonsOrder.reduce( (acc,buttonKey, indexButton) => {
                if ( Math.floor(indexButton/4) !== i ) {   return acc;   }
                const config = buttonsConfig[ buttonKey ];  
                acc.push(
                  <Button key={i+indexButton} config={config}></Button>
                );
                return acc;
              }, [] )
            }
          </tr>
        )
      )
    }    
     return ret;  
  }

  render() {    

    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <div className=" buttonera-container">
            <table className="pure-table pure-table-bordered">
              <tbody>
                {this.getButtons()}
              </tbody>          
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class Button extends Component {

  handleClick(e) {
    const { config } = this.props;
    console.log(config.symbol);
  }

  render() {
    const { config } = this.props;
    return (
      <td onClick={this.handleClick.bind(this)}  className="button-calc" rowSpan={config.rowSpan} colSpan={config.colSpan}>
        <div className="pure-g">
          <div className="pure-u-1">
            <div>{config.symbol}</div>
          </div>
        </div>
      </td>
    )
  }
}

export default App;
