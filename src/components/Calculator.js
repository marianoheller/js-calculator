import React, { Component } from 'react';
import keydown from 'react-keydown';


import Buttonera from './Buttonera';
import Display from './Display';
import { buttonsConfig } from '../configApp';

import { compute, parseInput, filterInput } from "./Engine";


@keydown
export default class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            display: {
                bigDisplay: "0",
                smallDisplay: "0"
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


    clearMemory() {
        let newBigDisplay = "0";
        let newSmallDisplay = "0";
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

        let newBigDisplay = bigDisplay.substr( 0, bigDisplay.length-1);
        if ( newBigDisplay === '' ) newBigDisplay='0'; 
        let newSmallDisplay = "";
        if ( newBigDisplay.length !== 0) {
            newSmallDisplay = compute( parseInput( newBigDisplay ) );
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
        input = filterInput(input, this.state.display.bigDisplay);
        switch (input) {
            case "DEL":
                this.deleteInput();
                break;
            case "AC":
                this.clearMemory();
                break;
            case null:
            case undefined:
                break;
            default:
                this.setBigDisplay(input);
                break;

        }
    }

    setBigDisplay(input) {
        const { smallDisplay } = this.state.display;

        let newBigDisplay = this.state.display.smallDisplay;
        let newSmallDisplay = "";

        if ( smallDisplay === "NaN") {
            newBigDisplay = "";
        }

        if( input !== '=') {
            newBigDisplay = this.state.display.bigDisplay !== '0' ?
                            this.state.display.bigDisplay + input
                            : input;
            newSmallDisplay = compute( parseInput( newBigDisplay ) );
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
            <div className="pure-g" >
                <div className="pure-u-6-24"></div>
                <div className="pure-u-12-24">
                    <div className="pure-g calculator-container"
                    data-html
                    data-tip="<b>ProTip:</b> You can also use the keyboard to type!<br>(1-9 . * / - + Backspace Delete)">
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


