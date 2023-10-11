export const BOXSIZE = 20;


export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    drawBoard(ctx, model.board);
}

export function drawBoard(ctx, board) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    
    for (var i = 0; i < board.boardSquares.length; i++) {
        for (var j = 0; j < board.boardSquares.length; j++) {
            ctx.beginPath();
            let shape = computeSquare(board.boardSquares[i][j]);
            console.log(shape);
            ctx.fillRect(shape.row * 20, shape.col * 20, BOXSIZE, BOXSIZE);
            ctx.strokeRect(shape.row * 20, shape.col * 20, BOXSIZE, BOXSIZE);
        }
    }
}

export function computeSquare(square) {
    let c = square;
    return new SquareShape(c.row, c.col, c.size, c.color);
}

export class SquareShape {
    constructor(row, col, size, color) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.color = color;
    }
}