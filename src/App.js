import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const widthButtonera = 4; //4 botones chicos por fila


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
  render() {

    const buttons = (new Array(5*widthButtonera)).fill(0).map( (e,i) => {
      let trO = null;
      let trC = null;
      if ( i%widthButtonera === 0) {
        trO = <tr>;
        trC = </tr>;
      }
      return (
        {/*<div className="pure-u-6-24">
          <Button key={i} value={i}></Button>
        </div>*/}
        {trO}
          <td>
            <Button key={i} value={i}></Button>
          </td>
        {trC}

      );
    });

    return (
      <div>
        <table>
          <tbody>
            
          </tbody>          
        </table>
        <div className="pure-g">
          {buttons}
        </div>
      </div>
    );
  }
}

class Button extends Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <div>{this.props.value}</div>
        </div>
      </div>
    )
  }
}

export default App;
