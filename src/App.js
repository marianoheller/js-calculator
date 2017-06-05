import React, { Component } from 'react';
import Calculator from './components/Calculator';
import ReactTooltip from 'react-tooltip';


import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Calculator></Calculator>
        <ReactTooltip place="right" type="dark" effect="solid"/>
      </div>
    );
  }
}




export default App;
