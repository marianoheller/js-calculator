import React, { Component } from 'react';
import Decimal from 'decimal.js';
import R from 'ramda';
import keydown from 'react-keydown';

import Buttonera from './Buttonera';
import Display from './Display';
import { buttonsConfig } from '../configApp';


@keydown
export default class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display: {
                bigDisplay: "",
                smallDisplay: ""
            }
        }
    }

    componentWillReceiveProps( { keydown } ) {
        if ( keydown.event ) {
            const keyFound = Object.keys(buttonsConfig).find( (key) => {
                return buttonsConfig[key].key.some( (e) => e ===keydown.event.key )
            });
            if ( keyFound ) {
                this.handleInput(buttonsConfig[keyFound].symbol);
            }
            
        }
    }


    parseInput( input ) {
        const regex = /x|-|\+|\u00F7/g;

        const dataInput = input.split( regex ).filter( (e) => e !== "" ).map((e) => parseFloat(e) );
        const opsInput = input.split("").filter( (e) => e.match(regex));
        
        // console.log(dataInput, opsInput);

        return {
            dataInput: dataInput,
            opsInput: opsInput
        }
    }


    compute( { dataInput=[], opsInput=[] } ) {

        const divChar = String.fromCharCode(247);
        var ops = [
    	    {'x': (a, b) => a*b, [divChar]: (a, b) => a/b},
            {'+': (a, b) => a+b, '-': (a, b) => a-b}  ];
        
        let offset = 0;

        if ( dataInput.length > 1) {
            ops.forEach( (op) => {
                offset = 0;
                opsInput.forEach( (opInput, indexOp) => {
                    if ( op.hasOwnProperty(opInput) ) {
                        // console.log("dataInput", dataInput, "indexOP", indexOp, "offset", offset, "op", opInput, "opsInput", opsInput);
                        if ( dataInput[indexOp - offset + 1] !== undefined ) {
                            const a = dataInput[indexOp - offset];
                            const b = dataInput[indexOp + 1 - offset];
                            // console.log("a", a, typeof(a), indexOp - offset);
                            // console.log("b", b, typeof(b), indexOp - offset + 1);
                            dataInput.splice(indexOp - offset, 2 ,op[opInput](a,b) );
                            offset++;
                        }
                    }
                });
                opsInput = opsInput.filter( (e) => !Object.keys(op).includes(e) );
            });
        }
        if ( dataInput.length > 1) {
            console.log("Resultado", dataInput, opsInput );
            throw Error("Error de computo")
        }
        return dataInput.length === 0 ? 0 : dataInput[0];
    }

    clearMemory() {
        let newBigDisplay = "";
        let newSmallDisplay = "";
        this.setState( {
            ...this.state,
            display: {
                ...this.state.display,
                bigDisplay: newBigDisplay,
                smallDisplay: newSmallDisplay
            }
        });
    }

    deleteInput() {
        const { bigDisplay } = this.state.display;
        if ( bigDisplay.length === 0 ) {   return;   }

        const newBigDisplay = bigDisplay.substr( 0, bigDisplay.length-1);
        let newSmallDisplay = "";
        if ( newBigDisplay.length !== 0) {
            newSmallDisplay = this.compute( this.parseInput( newBigDisplay ) );
        }
        

        this.setState( {
            ...this.state,
            display: {
                ...this.state.display,
                bigDisplay: newBigDisplay,
                smallDisplay: newSmallDisplay
            }
        })

    }

    getDisplay( ) {
        return this.state.display;
    }


    handleInput(input) {
        switch (input) {
            case "DEL":
                this.deleteInput();
                break;
            case "AC":
                this.clearMemory();
                break;
            default:
                this.setBigDisplay(input);
                break;

        }
    }

    setBigDisplay(input) {

        let newBigDisplay = this.state.display.smallDisplay;
        let newSmallDisplay = "";

        if( input !== '=') {
            newBigDisplay = this.state.display.bigDisplay + input;
            newSmallDisplay = this.compute( this.parseInput( newBigDisplay ) );
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
                    <div className="pure-g calculator-container">
                        <div className="pure-u-1">
                            <Header></Header>
                        </div>
                        <div className="pure-u-1">
                            <Display display={this.getDisplay()}></Display>
                        </div>
                        <div className="pure-u-1">
                            <Buttonera  setInput={this.handleInput.bind(this)} ></Buttonera>
                        </div>
                    </div>
                    
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
        <div className="pure-u-1 title">
          <img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" alt="FCC logo"/>
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
