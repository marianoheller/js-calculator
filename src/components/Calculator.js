import React, { Component } from 'react';

import Buttonera from './Buttonera';
import Display from './Display';

import { buttonsConfig } from '../configApp';



export default class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display: {
                bigDisplay: "",
                smallDispaly: ""
            }
        }
    }


    getDisplay() {
        return this.state.display;
    }

    setBigDisplay(input) {

        let newBigDisplay = this.state.display.bigDisplay + input;
        let newSmallDisplay = (new Processor(newBigDisplay)).compute();

        if( input === '=') {
            newBigDisplay = newSmallDisplay;
            newSmallDisplay = ""
        }
        
        this.setState( {
            ...this.state,
            display: {
                ...this.state.display,
                bigDisplay: newBigDisplay,
                smallDisplay: newSmallDisplay
            }
        });
    }



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
                <Display display={this.getDisplay()}></Display>
            </div>
            <div className="pure-u-6-24"></div>

            <div className="pure-u-6-24"></div>
            <div className="pure-u-12-24">
                <Buttonera  setInput={this.setBigDisplay.bind(this)} ></Buttonera>
            </div>
            <div className="pure-u-6-24"></div>

        </div>
        );
    }
}


class Processor {

    constructor( inputString) {
        this.inputString = inputString;

    }


    compute( ) {
        return "123";

    }

}



class Header extends Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <p>FCC Calculator</p>
        </div>
      </div>
    );
  }
}








Number.isNaN = Number.isNaN || function(value) {
    return typeof value === 'number' && isNaN(value);
}




    //     const keyFound =  Object.keys(buttonsConfig).find( (key) => buttonsConfig[key].symbol === current );
    //     if( !keyFound ) {  throw Error("Error al setear el Input. KeyFound invalid!");   }
    //     console.log(buttonsConfig[keyFound].symbol );
    //     if ( Number.isNaN( parseInt(buttonsConfig[keyFound].symbol,10) ) ) {
    //         if ( this.state.mem === null) {
    //             this.setState( {
    //                 ...this.state,
    //                 currentInput: 0,
    //                 mem: {
    //                     ...this.state.mem,
    //                     input: this.state.currentInput,
    //                     op: current
    //                 }
    //             });    
    //         }
    //         else {
                
    //         }
            
    //     }
    //     else {
    //         const newCurrentInput = this.state.currentInput === 0 ? current : this.state.currentInput + current;
    //         this.setState( {
    //             ...this.state,
    //             currentInput: newCurrentInput
    //         });
    //     }
