export const config = {
    numRows: 20,
    numCols: 20,
    playerColors: ["red", "blue", "green", "yellow"],
    totalPieces: 21,

    pieceTypes: {
        type1: {
            numSquares: 1,
            shape: [
                [0, 0]
            ],
        },
        type2: {
            numSquares: 2,
            shape: [
                [[0,0], [0,1]]
            ],
        },
        type4: {
            numSquares: 3,
            shape: [
                [[0,0], [0,1], [0,2]]
            ],
        },
        type3: {
            numSquares: 3,
            shape: [
                [[1,0], [1,1], [0,1]]
            ],
        },
        type5: {
            numSquares: 4,
            shape: [
                [[0,0], [0,1], [0,2], [0,3]]
            ],       
        },
        type6: {
            numSquares: 4,
            shape: [
                [[1,0], [1,1], [1,2], [0,2]]
            ],       
        },
        type7: {
            numSquares: 4,
            shape: [
                [[0,0], [0,1], [1,1], [1,2]]
            ],       
        },
        type8: {
            numSquares: 4,
            shape: [
                [[0,0], [0,1], [1,0], [1,1]]
            ],       
        },
        type9: {
            numSquares: 4,
            shape: [
                [[0,0], [0,1], [0,2], [1,1]]
            ],       
        },
        type10: {
            numSquares: 5,
            shape: [
                [[0,1], [0,2], [1,0], [1,1], [2,1]]
            ],    
        },
        type11: {
            numSquares: 5,
            shape: [
                [[0,0], [0,1], [0,2], [0,3], [0,4]]
            ],    
        },
        type12: {
            numSquares: 5,
            shape: [
                [[0,0], [0,1], [0,2], [0,3], [1,3]]
            ],    
        },
        type13: {
            numSquares: 5,
            shape: [
                [[0,1], [1,0], [1,1], [2,0], [3,0]]
            ],    
        },
        type14: {
            numSquares: 5,
            shape: [
                [[0,0], [0,1], [1,0], [1,1], [2,0]]
            ],    
        },
        type15: {
            numSquares: 5,
            shape: [
                [[0,0], [0,1], [0,2], [1,1], [2,1]]
            ],    
        },
        type16: {
            numSquares: 5,
            shape: [
                [[0,0], [0,2], [1,0], [1,1], [1,3]]
            ],    
        },
        type17: {
            numSquares: 5,
            shape: [
                [[0,2], [1,2], [3,0], [3,1], [3,2]]
            ],    
        },
        type18: {
            numSquares: 5,
            shape: [
                [[2,0], [1,1], [1,2], [3,0], [3,1]]
            ],    
        },
        type19: {
            numSquares: 5,
            shape: [
                [[0,1], [1,0], [1,1], [1,2], [2,1]]
            ],    
        },
        type20: {
            numSquares: 5,
            shape: [
                [[0,1], [1,0], [1,1], [2,1], [3,1]]
            ],    
        },
        type21: {
            numSquares: 5,
            shape: [
                [[0,0], [0,1], [1,1], [2,1], [2,2]]
            ],    
        },

    }


}