export const PIECES = [
    // L
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
    ],
    [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1],
    ],
    [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0],
    ],

    // T
    [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0],
    ],

    // Z
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],

    // I
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],

    // O
    [
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 0],
    ],
];

export const TABLE_ROW = 10;
export const TABLE_COLUMN = 10;
export const TILE_SIZE = 33.7;
export const PIECE_SIZE = TILE_SIZE * 3;

export const TILE_COLORS = ['#e80000', '#3740e8', '#0ab221', '#cde041', '#27b8ce'];
export const TILE_BORDER_COLORS = [
    '#7c0707',
    '#0b13aa',
    '#065110',
    '#6f7c0b',
    '#005663',
];