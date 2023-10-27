export const config = {
    numRows: 20,
    numCols: 20,
    playerColors: ['rgba(255,190,107,1)', 'rgba(71,157,255,1)', 'rgba(231,137,255,1)', 'rgba(252, 255, 122, 1)'],
    playerColorsFaded: ['rgba(255,190,107,0.2)', 'rgba(71,157,255,0.2)', 'rgba(231,137,255,0.2)', 'rgba(252, 255, 122,0.2)'],
    hoverColor: 'grey',
    movePossibleColor: 'rgba(121,255,112,1)',
    totalPieces: 20,
    numPlayers: 4, 

    pieceTypes: [
        {
            id: 1,
            numSquares: 1,
            shape: [
                [0, 0]
            ],
            coord:[21, 1],
            startingCoord: [21, 1]
        },
        {
            id: 2,
            numSquares: 2,
            shape: [
                [0,0], [0,1]
            ],
            coord: [21,3],
            startingCoord: [21,3]
        },
        {
            id: 4,
            numSquares: 3,
            shape: [
                [0,0], [0,-1], [0,1]
            ],
            coord: [21,7],
            startingCoord: [21,7]
        },
        {
            id: 3,
            numSquares: 3,
            shape: [
                [0,0], [0,1], [-1,1]
            ],
            coord: [21.5,10],
            startingCoord: [21.5,10]
        },
        {
            id: 5,
            numSquares: 4,
            shape: [
                [0,-1], [0,0], [0,1], [0,2]
            ],       
            coord: [21,14],
            startingCoord: [21,14]
        },
        {
            id: 6,
            numSquares: 4,
            shape: [
                [0,-1], [0,0], [0,1], [-1,1]
            ],    
            coord: [24,2],
            startingCoord: [24,2]
        },
        {
            id: 7,
            numSquares: 4,
            shape: [
                [0,-1], [0,0], [1,0], [1,1]
            ], 
            coord: [23,6],
            startingCoord: [23,6]
        },
        {
            id: 8,
            numSquares: 4,
            shape: [
                [0,0], [0,1], [1,0], [1,1]
            ],       
            coord:[23.5,9],
            startingCoord: [23.5,9]
        },
        {
            id: 9,
            numSquares: 4,
            shape: [
                [0,0], [0,-1], [0,1], [1,0]
            ],   
            coord:[23,14],
            startingCoord: [23,14]
        },
        {
            id: 10,
            numSquares: 5,
            shape: [
                [0,0], [0,-1], [-1,0], [-1,1], [1,0]
            ],   
            coord: [27,2],
            startingCoord: [27,2]
        },
        {
            id: 11,
            numSquares: 5,
            shape: [
                [0,-2], [0,-1], [0,0], [0,1], [0,2]
            ],    
            coord: [26.5,7],
            startingCoord: [26.5,7]
        },
        {
            id: 12,
            numSquares: 5,
            shape: [
                [0,0], [-1,0],[-2,0], [1,0], [1,1]
            ],    
            coord: [27,12],
            startingCoord: [27,12]
        },
        {
            id: 13,
            numSquares: 5,
            shape: [
                [0,0],[-1,0],[-1,-1],[0,-1],[1,-1]
            ],    
            coord: [31,2],
            startingCoord: [31,2]
        },
        {
            id: 14,
            numSquares: 5,
            shape: [
                [0,0],[0,-1],[0,1],[1,0],[2,0]
            ],
            coord: [29,5],
            startingCoord: [29,5]
        },
        {
            id: 15,
            numSquares: 5,
            shape: [
                [0,0],[0,-1],[0,1],[-1,-1],[-1,1]
            ],    
            coord: [30,9],
            startingCoord: [30,9]
        },
        {
            id: 16,
            numSquares: 5,
            shape: [
                [0,0],[0,1],[-1,1],[1,0],[2,0]
            ],   
            coord: [26,14.5],
            startingCoord: [26,14.5]
        },
        {
            id: 17,
            numSquares: 5,
            shape: [
                [0,0],[-1,0],[-2,0],[0,-1],[0,-2]
            ],   
            coord: [32,15],
            startingCoord: [32,15]
        },
        {
            id: 18,
            numSquares: 5,
            shape: [
                [0,0],[0,1],[-1,1],[1,0],[1,-1]
            ],    
            coord: [34,2],
            startingCoord: [34,2]
        },
        {
            id: 19,
            numSquares: 5,
            shape: [
                [0,0], [0,-1], [0,1], [1,0], [-1,0]
            ],  
            coord: [34,6],
            startingCoord: [34,6]
        },
        {
            id: 20,
            numSquares: 5,
            shape: [
                [0,0],[-1,0],[-1,-1],[1,0],[1,1]
            ], 
            coord: [34,10],
            startingCoord: [34,10]
        }
    ] 
}