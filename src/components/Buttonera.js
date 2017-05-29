import React, { Component } from 'react';
import Button from './Button';

import { buttonsConfig, buttonsOrder } from '../configApp';




//const widthButtonera = 4; //4 botones chicos por fila
const cantRows = 5;




export default class Buttonera extends Component {

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
                  <Button onInput={this.props.setInput} key={i+indexButton} config={config}></Button>
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