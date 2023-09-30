import { NewLayoutFieldsPair, OldLayout } from './types'

export const simpleExample = {
    input: [['A', ['B', 'C']]],
    output: ["'A A' 'B C'", ['A', 'B', 'C']],
} as { input: OldLayout; output: NewLayoutFieldsPair }

export const exampleOne = {
    input: [
        ['A', ['E', 'F']],
        [
            ['B', 'C', 'D'],
            ['G', 'H'],
        ],
    ],
    output: [
        [
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(2).fill('B'),
                ...new Array(2).fill('C'),
                ...new Array(2).fill('D'),
            ].join(' ')}'`,
            `'${[
                ...new Array(3).fill('E'),
                ...new Array(3).fill('F'),
                ...new Array(3).fill('G'),
                ...new Array(3).fill('H'),
            ].join(' ')}'`,
        ].join(' '),
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ],
} as { input: OldLayout; output: NewLayoutFieldsPair }

export const exampleTwo = {
    input: [
        [
            [
                'A',
                [
                    ['B', 'C', 'D'],
                    ['F', 'G'],
                ],
                ['E', 'H', 'I'],
            ],
            'J',
        ],
    ],
    output: [
        [
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(2).fill('B'),
                ...new Array(2).fill('C'),
                ...new Array(2).fill('D'),
                ...new Array(6).fill('E'),
            ].join(' ')}'`,
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(2).fill('B'),
                ...new Array(2).fill('C'),
                ...new Array(2).fill('D'),
                ...new Array(6).fill('E'),
            ].join(' ')}'`,
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(2).fill('B'),
                ...new Array(2).fill('C'),
                ...new Array(2).fill('D'),
                ...new Array(6).fill('H'),
            ].join(' ')}'`,
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(3).fill('F'),
                ...new Array(3).fill('G'),
                ...new Array(6).fill('H'),
            ].join(' ')}'`,
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(3).fill('F'),
                ...new Array(3).fill('G'),
                ...new Array(6).fill('I'),
            ].join(' ')}'`,
            `'${[
                ...new Array(6).fill('A'),
                ...new Array(3).fill('F'),
                ...new Array(3).fill('G'),
                ...new Array(6).fill('I'),
            ].join(' ')}'`,
            `'${new Array(18).fill('J').join(' ')}'`,
            `'${new Array(18).fill('J').join(' ')}'`,
        ].join(' '),
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ],
} as { input: OldLayout; output: NewLayoutFieldsPair }

export const exampleThree = {
    input: [
        [
            [
                'A',
                [
                    ['B', 'C', 'D'],
                    ['J', 'K'],
                ],
                [['E', 'F', 'G', 'H', 'I'], 'L', 'M'],
            ],
            'N',
        ],
    ],
    output: [
        [
            `'${[
                ...new Array(30).fill('A'),
                ...new Array(10).fill('B'),
                ...new Array(10).fill('C'),
                ...new Array(10).fill('D'),
                ...new Array(6).fill('E'),
                ...new Array(6).fill('F'),
                ...new Array(6).fill('G'),
                ...new Array(6).fill('H'),
                ...new Array(6).fill('I'),
            ].join(' ')}'`,
            `'${[
                ...new Array(30).fill('A'),
                ...new Array(10).fill('B'),
                ...new Array(10).fill('C'),
                ...new Array(10).fill('D'),
                ...new Array(6).fill('E'),
                ...new Array(6).fill('F'),
                ...new Array(6).fill('G'),
                ...new Array(6).fill('H'),
                ...new Array(6).fill('I'),
            ].join(' ')}'`,
            `'${[
                ...new Array(30).fill('A'),
                ...new Array(10).fill('B'),
                ...new Array(10).fill('C'),
                ...new Array(10).fill('D'),
                ...new Array(30).fill('L'),
            ].join(' ')}'`,
            `'${[
                ...new Array(30).fill('A'),
                ...new Array(15).fill('J'),
                ...new Array(15).fill('K'),
                ...new Array(30).fill('L'),
            ].join(' ')}'`,
            `'${[
                ...new Array(30).fill('A'),
                ...new Array(15).fill('J'),
                ...new Array(15).fill('K'),
                ...new Array(30).fill('M'),
            ].join(' ')}'`,
            `'${[
                ...new Array(30).fill('A'),
                ...new Array(15).fill('J'),
                ...new Array(15).fill('K'),
                ...new Array(30).fill('M'),
            ].join(' ')}'`,
            `'${new Array(90).fill('N').join(' ')}'`,
            `'${new Array(90).fill('N').join(' ')}'`,
        ].join(' '),
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ],
} as { input: OldLayout; output: NewLayoutFieldsPair }
