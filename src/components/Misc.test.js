import Decimal from 'decimal.js';
import { compute, parseInput } from "./Misc";

const expectedParsed = [
        {
            input: "3+4",
            expected: {
                dataInput: [new Decimal(3), new Decimal(4)],
                opsInput: ["+"]
            }
        },
        {
            input: "+3-+4+-5--6++7",
            expected: {
                dataInput: [new Decimal(3), new Decimal(4), new Decimal(-5), new Decimal(-6), new Decimal(7)],
                opsInput: ["-", "+", "-", "+"]
            }
        },
        {
            input: "-3+-4-+5++1--4",
            expected: {
                dataInput: [new Decimal(-3), new Decimal(-4), new Decimal(5), new Decimal(1), new Decimal(-4)],
                opsInput: ["+", "-", "+", "-"]
            }
        },
        {
            input: "4÷2÷4x5x2",
            expected: {
                dataInput: [new Decimal(4), new Decimal(2), new Decimal(4), new Decimal(5), new Decimal(2)],
                opsInput: ["÷", "÷", "x", "x"]
            }
        }
    ];

const expectedComputed = [
    {
        input: {
            dataInput: [new Decimal(1), new Decimal(2), new Decimal(3), new Decimal(4), new Decimal(5)],
            opsInput: ["+", "-", "x", "÷"]
        },
        expected: "0.6"
    },
    {
        input: {
            dataInput: [new Decimal(1), new Decimal(-2), new Decimal(3), new Decimal(-5), new Decimal(5)],
            opsInput: ["÷", "+", "x", "-"]
        },
        expected: "-20.5"
    },
    {
        input: {
            dataInput: [new Decimal(1), new Decimal(0), new Decimal(3), new Decimal(4), new Decimal(5)],
            opsInput: ["÷", "÷", "x", "x"]
        },
        expected: "NaN"
    }
];


it('Parses input correctly', () => {
    expectedParsed.forEach( (e) => {
        expect(parseInput(e.input)).toMatchObject(e.expected);
    });
});

it('Computes correctly', () => {
    expectedComputed.forEach( (e) => {
        expect(compute(e.input)).toBe(e.expected);
    })
});
