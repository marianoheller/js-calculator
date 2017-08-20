
import Decimal from 'decimal.js';


export function parseInput( input ) {
    //const regexSignados = /x|(?<=[0-9])-|(?<=[0-9])\+|\u00F7/g;
    const regexSignos = /x|[0-9]-|[0-9]\+|\u00F7/g;
    const regexParaData = /x|-(?=[0-9])|\+(?=[0-9])|\u00F7/g; //Regex para input reversed con lookahead
    Decimal.set({ precision: 10, rounding: 4 });

    //const dataInput = input.split( regex ).filter( (e) => e !== "" ).map((e) => new Decimal(parseFloat(e)) );
    //const opsInput = input.split("").filter( (e) => e.match(regex));
    const dataInput = input.split("").reverse().join("")
                        .split( regexParaData ).reverse()
                        .map( (e) => e.split("").reverse().join(""))
                        .filter( (e) => e !== "" )
                        .map((e) => new Decimal( parseFloat(e) ) );

    const auxOpsInput = input.match(regexSignos);
    let opsInput = [];
    if ( auxOpsInput ) {
        opsInput = input.match(regexSignos).reduce( (acc,e) => {
            e = e.split("").filter( (w) => isNaN(w) );
            acc.push(e)
            return  acc;
        }, [] );
        opsInput = [].concat.apply([], opsInput);
    }
    
    return {
        dataInput: dataInput,
        opsInput: opsInput
    }
}


export function compute( { dataInput=[], opsInput=[] } ) {

    console.log(dataInput, opsInput);

    const divChar = String.fromCharCode(247);
    var ops = [
        {'x': (a, b) => a.times(b), [divChar]: (a, b) => a.div(b)},
        {'+': (a, b) => a.plus(b), '-': (a, b) => a.minus(b) }  ];
    
    let offset = 0;

    if ( dataInput.length > 1) {
        ops.forEach( (op) => {
            offset = 0;
            opsInput.forEach( (opInput, indexOp) => {
                if ( op.hasOwnProperty(opInput) ) {
                    if ( dataInput[indexOp - offset + 1] !== undefined ) {
                        const a = dataInput[indexOp - offset];
                        const b = dataInput[indexOp + 1 - offset];
                        dataInput.splice(indexOp - offset, 2 ,op[opInput](a,b) );
                        offset++;
                    }
                }
            });
            opsInput = opsInput.filter( (e) => !Object.keys(op).includes(e) );
        });
    }
    if ( dataInput.length > 1) {
        throw Error("Error de computo")
    }
    if ( dataInput.length === 0 ) {   return 0;   }
    const res = !dataInput[0].isFinite() ? "NaN" : dataInput.toString();
    return res;
}


export function filterInput( input, bigDisplay ) {
    if ( bigDisplay.length === 0 && input.match(/x|\u00F7/g)  ) {   return undefined;   }
    if ( (bigDisplay.length === 0 ) || input.match(/[0-9]/) ) {   return input;   }
    if ( input.match(/\.|x|\u00F7/) ) {
        const lastCharacter = bigDisplay[bigDisplay.length-1];
        if ( lastCharacter && lastCharacter.match(/\.|x|-|\+|\u00F7/) )  {   
            return undefined;   
        }
    }
    /* if ( input.match(/\+|-/) ) {
        if ( bigDisplay.length < 2 ) {   return input;   }
        const lastCharacters = bigDisplay.substr(-2, 2);
        const matches = lastCharacters.match(/x|-|\+|\u00F7/g);
        const matchesDot = lastCharacters.match(/\./g);
        //console.log(matches, matchesDot);
        if ( (matches && matches.length >= 2) || (matchesDot && matchesDot.length > 1) ) {
            return undefined;
        }
    } */
    const auxBigDisplay = bigDisplay.split(/x|-|\+|\u00F7/g);
    const lastWord = auxBigDisplay[auxBigDisplay.length-1];
    if( lastWord && lastWord.match(/\./) && input.match(/\./)) {   return undefined;   }
    return input;
}