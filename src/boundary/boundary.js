
export var CANVASWIDTH = 1850;
export var CANVASHEIGHT = 1200;
export var PLAYERBOXSIZE = CANVASWIDTH * .31;
export var BOARDSIZE = CANVASWIDTH * 0.34;
export var BOXSIZE = BOARDSIZE / 20;
export var SPACING = BOXSIZE;
export var BOARDINDENT = 25
export var BOARDINDENTX = PLAYERBOXSIZE + BOARDINDENT;
export var BOARDINDENTY = 250;


export var PLAYER1 = [-600, 20]; //grey
export var PLAYER3 = [-600, PLAYERBOXSIZE + 20]; //blue
export var PLAYER2 = [650, 20]; //green
export var PLAYER4 = [650, PLAYERBOXSIZE + 20]; //Yellow
export var PLAYERINDENT = 5;
export var RIGHTSIDEPLAYER = PLAYERBOXSIZE + BOARDINDENT + BOARDSIZE + BOARDINDENT;
export var DRAGBOUNDS = [BOARDINDENTX, BOARDINDENTX + BOARDSIZE, 0, RIGHTSIDEPLAYER];

export var PLAYER1BOUNDS = [0, PLAYERBOXSIZE, 0, PLAYERBOXSIZE];
export var PLAYER2BOUNDS = [RIGHTSIDEPLAYER, RIGHTSIDEPLAYER + PLAYERBOXSIZE, 0, PLAYERBOXSIZE];
export var PLAYER3BOUNDS = [0, PLAYERBOXSIZE, PLAYERBOXSIZE + 2*PLAYERINDENT, 2*PLAYERBOXSIZE + 2*PLAYERINDENT];
export var PLAYER4BOUNDS = [RIGHTSIDEPLAYER, RIGHTSIDEPLAYER + PLAYERBOXSIZE, PLAYERBOXSIZE + 2*PLAYERINDENT, 2*PLAYERBOXSIZE + 2*PLAYERINDENT];
export var PLAYERBOUNDS = [PLAYER1BOUNDS, PLAYER2BOUNDS, PLAYER3BOUNDS, PLAYER4BOUNDS];

export var SELECTEDBOX = [BOARDINDENTX, 0 + 5, BOARDSIZE, BOARDINDENTY - 10];
export var SELECTEDPIECELOCATION = [(SELECTEDBOX[0] + (SELECTEDBOX[0] + SELECTEDBOX[2]))/2 - 10, (SELECTEDBOX[1] + (SELECTEDBOX[1] + SELECTEDBOX[3]))/2 - 20];



// playerColors: ['rgba(128,128,128,1)', 'rgba(0,0,255,1)', 'rgba(0,128,0,1)', 'rgba(255,255,0,1)']


export function redrawCanvas(model, canvasObj) {
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasObj.width, canvasObj.height);
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    drawBoard(ctx, model);
}

export function drawBoard(ctx, model) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.shadowBlur = 0;
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;


    ctx.beginPath();
    //Canvas area
    ctx.strokeRect(0, 0, CANVASWIDTH, CANVASHEIGHT);  

    //Selected piece area
    if (model.players[model.currentPlayer].selectedPiece) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
    } else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
    }
    ctx.strokeRect(SELECTEDBOX[0], SELECTEDBOX[1], SELECTEDBOX[2], SELECTEDBOX[3]);

    // Drag area
    ctx.strokeStyle = "black";
    ctx.fillStyle = "grey";
    ctx.lineWidth = 2;
    // Board area
    for (let i = 0; i < model.board.boardSquares.length; i++) {
        ctx.fillStyle = "white";
        let shape = computeSquare(model.board.boardSquares[i]);
        if (!model.board.boardSquares[i].isOpen) {
            ctx.fillStyle = model.board.boardSquares[i].color;
        } else if (model.board.boardSquares[i].corner && !model.board.boardSquares[i].hovered) {
            ctx.fillStyle = "grey";
        } else if (model.board.boardSquares[i].checkAllowed() && model.board.boardSquares[i].hovered) {
            ctx.fillStyle = model.movePossibleColor;
        } else if (model.board.boardSquares[i].hovered) {
            ctx.fillStyle = model.hoverColor;
        } else if (!model.board.boardSquares[i].isOpen) {
            ctx.fillStyle = model.board.boardSquares[i].color;
        } else {
            ctx.fillStyle = "white";
        } 
        ctx.fillRect(shape.squareCoords[0], shape.squareCoords[1], BOXSIZE, BOXSIZE);
        ctx.strokeRect(shape.squareCoords[0], shape.squareCoords[1], BOXSIZE, BOXSIZE);
    }

    //player areas
    ctx.lineWidth = 2;
    for (let i = 0; i < model.players.length; i++) {
        //player 1
        if (i === 0) {
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.lineWidth = 4;
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
        } else if (i === 1) {
            //player 2
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.lineWidth = 4;
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(RIGHTSIDEPLAYER, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(RIGHTSIDEPLAYER, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
        } else if (i === 2) {
            if (model.players[i] === model.players[model.currentPlayer]) {
                ctx.lineWidth = 4;
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
                ctx.lineWidth = 4;
                ctx.strokeStyle = "red";
                ctx.fillStyle = model.players[i].fadedColor;
            } else {
                ctx.strokeStyle = "black";
                ctx.fillStyle = model.players[i].fadedColor;
            }
            ctx.fillRect(RIGHTSIDEPLAYER, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            ctx.strokeRect(RIGHTSIDEPLAYER, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);        
        }

        //Pieces
        ctx.lineWidth = 2;
        
        for (let j = 0; j < model.players[i].pieces.length; j++) {
            for (let k = 0; k < model.players[i].pieces[j].shape.length; k++) {
                let piece = computePiece(model.players[i].pieces[j]);
                ctx.fillStyle = model.players[i].pieces[j].color;
                ctx.strokeStyle = "black";
                if (model.players[i].pieces[j].played === true) {
                    ctx.fillStyle = "grey";
                    ctx.strokeStyle = "grey";
                    for (let j = 0; j < piece.shapeCoords.length; j++) {
                        ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                    }
                } else if (model.players[i].pieces[j].hovMoveAllowed === true ){
                    ctx.strokeStyle = model.movePossibleColor;
                    for (let j = 0; j < piece.shapeCoords.length; j++) {
                        ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                    }
                } else if (model.players[i].pieces[j].clicked === true) {
                    ctx.strokeStyle = "red";
                    for (let j = 0; j < piece.shapeCoords.length; j++) {
                        ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                    }
                }   else {
                    ctx.strokeStyle = "black";
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
    return new SquareShape(c.row, c.col, c.size, c.color, c.coord);
}

export function computePiece(piece) {
    let p = piece;
    return new PieceShape(p.id, p.shape, p.color);
}

export class SquareShape {
    constructor(row, col, size, color, coords) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.color = color;
        this.squareCoords = coords;
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

