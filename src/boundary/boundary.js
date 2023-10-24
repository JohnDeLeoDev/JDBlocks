export const BOXSIZE = 30;
export const SPACING = 30;
export const BOARDINDENTX = 575;
export const BOARDINDENTY = 250;
export const PLAYERBOXSIZE = 550;
export const PLAYER1 = [-600, 0]; //grey
export const PLAYER3 = [-600, PLAYERBOXSIZE + 10]; //blue
export const PLAYER2 = [610, 10]; //green
export const PLAYER4 = [610, PLAYERBOXSIZE + 10]; //Yellow
export const PLAYERINDENT = 5;
export const SELECTEDPIECELOCATION = [850, 75];

// playerColors: ['rgba(128,128,128,1)', 'rgba(0,0,255,1)', 'rgba(0,128,0,1)', 'rgba(255,255,0,1)']


export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    drawBoard(ctx, model);
}

export function drawBoard(ctx, model) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.shadowBlur = 0;
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;

    let selectedPiece = model.players[model.currentPlayer].selectedPiece;

    ctx.beginPath();
    ctx.fillRect(BOARDINDENTX, 5, 600, 200);
    ctx.strokeRect(BOARDINDENTX, 5, 600, 200);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "grey";

    for (let i = 0; i < model.board.boardSquares.length; i++) {
        ctx.fillStyle = "white";
        let shape = computeSquare(model.board.boardSquares[i]);
        if (model.board.boardSquares[i].checkOpen()) {
            if (model.board.boardSquares[i].row === 0 && model.board.boardSquares[i].col === 0) {
                ctx.fillStyle = "red";
            } else if (model.board.boardSquares[i].row === 0 && (model.board.boardSquares[i].col === ( model.board.numCols - 1))) {
                ctx.fillStyle = "red";
            } else if ((model.board.boardSquares[i].row === (model.board.numRows - 1)) && model.board.boardSquares[i].col === 0) {
                ctx.fillStyle = "red";
            } else if ((model.board.boardSquares[i].row === model.board.numRows - 1) && (model.board.boardSquares[i].col === model.board.numCols - 1)) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "white";
            }
        } else {
            ctx.fillStyle = model.board.boardSquares[i].color;
        }

        ctx.fillRect(BOARDINDENTX + shape.col * SPACING, BOARDINDENTY + shape.row * SPACING, BOXSIZE, BOXSIZE);
        ctx.strokeRect(BOARDINDENTX + shape.col * SPACING, BOARDINDENTY + shape.row * SPACING, BOXSIZE, BOXSIZE);
    }
    ctx.lineWidth = 4;
    for (let i = 0; i < model.players.length; i++) {
        if (i === 0) {
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
        } else if (i === 1) {
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(1200 + PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(1200 + PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
        } else if (i === 2) {
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(PLAYERINDENT, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(PLAYERINDENT, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
        } else if (i === 3) {
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(1200 + PLAYERINDENT, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(1200 + PLAYERINDENT, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);        
        }
        ctx.lineWidth = 2;
        
        for (let j = 0; j < model.players[i].pieces.length; j++) {
            for (let k = 0; k < model.players[i].pieces[j].shape.length; k++) {
                let piece = computePiece(model.players[i].pieces[j]);
                ctx.fillStyle = model.players[i].pieces[j].color;
                ctx.strokeStyle = "black";
                if (model.players[i].pieces[j].selected === true) {
                    ctx.fillStyle = model.players[model.currentPlayer].pieces[i].color;
                    ctx.strokeStyle = "red";
                    for (let j = 0; j < piece.shapeCoords.length; j++) {
                        ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                    }   
                }  else {
                    for (let j = 0; j < piece.shapeCoords.length; j++) {
                        ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                    }  
                }
            }
        }
    }
}

export function computeSquare(square) {
    let c = square;
    return new SquareShape(c.row, c.col, c.size, c.color);
}

export function computePiece(piece) {
    let p = piece;
    return new PieceShape(p.id, p.shape, p.color);
}

export class SquareShape {
    constructor(row, col, size, color) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.color = color;
    }
}

export class PieceShape {
    constructor(id, shape, color) {
        this.id = id;
        this.color = color;
        this.shapeCoords = this.calcShapeCoords(shape);
    }

    calcShapeCoords(shape) {
        let coords = [];
        for (let i = 0; i < shape.length; i++) {
            coords.push([shape[i].shapeCoords[0], shape[i].shapeCoords[1]]);
        }
        return coords;
    }
}

