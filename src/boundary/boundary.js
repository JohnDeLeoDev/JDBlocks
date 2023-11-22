import React, { useEffect } from 'react';
import { movePiece, playerBounds, selectPiece, movePieceToBoard, clickPiece, dragBounds } from '../controller/controller';

export var BOARDSIZE;
export var PLAYERBOXSIZE;
export var BOXSIZE;
export var SPACING;
export var BOARDINDENT;
export var BOARDINDENTX;
export var BOARDINDENTY;

export var PLAYER1;
export var PLAYER3;
export var PLAYER2;
export var PLAYER4;
export var PLAYERINDENT;
export var RIGHTSIDEPLAYER;
export var DRAGBOUNDS;

export var PLAYER1BOUNDS;
export var PLAYER2BOUNDS;
export var PLAYER3BOUNDS;
export var PLAYER4BOUNDS;
export var PLAYERBOUNDS;

export var SELECTEDBOX;
export var SELECTEDPIECELOCATION;
export var CLICKOFFSET;

export function updateSizes(dimensions) {
    if (!dimensions) {
        dimensions = {
            height: window.innerHeight,
            width: window.innerWidth
        }
    }
    PLAYERBOXSIZE = dimensions.width *.22;
    BOARDSIZE = dimensions.width*.25;
    BOXSIZE = BOARDSIZE / 20;
    SPACING = BOXSIZE;
    BOARDINDENT = 20;
    BOARDINDENTX = PLAYERBOXSIZE + BOARDINDENT;
    BOARDINDENTY = BOARDSIZE/2;

    PLAYER1 = [-(BOXSIZE*19), 10]; //grey
    PLAYER3 = [-(BOXSIZE*19), PLAYERBOXSIZE + 15]; //blue
    PLAYER2 = [(BOXSIZE*20), 10]; //green
    PLAYER4 = [(BOXSIZE*20), PLAYERBOXSIZE + 15]; //Yellow
    PLAYERINDENT = 10;
    RIGHTSIDEPLAYER = PLAYERBOXSIZE + BOARDINDENT + BOARDSIZE + BOARDINDENT/2;
    
    DRAGBOUNDS = [BOARDINDENTX, BOARDINDENTX + BOARDSIZE, 0, BOARDSIZE*2];

    PLAYER1BOUNDS = [0, PLAYERBOXSIZE, 0, PLAYERBOXSIZE];
    PLAYER2BOUNDS = [RIGHTSIDEPLAYER, RIGHTSIDEPLAYER + PLAYERBOXSIZE, 0, PLAYERBOXSIZE];
    PLAYER3BOUNDS = [0, PLAYERBOXSIZE, PLAYERBOXSIZE + 2*PLAYERINDENT, 2*PLAYERBOXSIZE + 2*PLAYERINDENT];
    PLAYER4BOUNDS = [RIGHTSIDEPLAYER, RIGHTSIDEPLAYER + PLAYERBOXSIZE, PLAYERBOXSIZE + 2*PLAYERINDENT, 2*PLAYERBOXSIZE + 2*PLAYERINDENT];
    PLAYERBOUNDS = [PLAYER1BOUNDS, PLAYER2BOUNDS, PLAYER3BOUNDS, PLAYER4BOUNDS];

    SELECTEDBOX = [BOARDINDENTX, 0 + 10, BOARDSIZE, (BOARDINDENTY - 20)];
    SELECTEDPIECELOCATION = [(SELECTEDBOX[0] + (SELECTEDBOX[0] + SELECTEDBOX[2]))/2 - 10, (SELECTEDBOX[1] + (SELECTEDBOX[1] + SELECTEDBOX[3]))/2 - 20];
    CLICKOFFSET = [BOXSIZE*(dimensions.width/350), BOXSIZE*dimensions.height/110];
}


export function Canvas(props, handleNewModel) {
    const canvasRef = React.useRef(null);
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    updateSizes(dimensions);

    useEffect(() => {
        updateSizes(dimensions);
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        ctx.width = dimensions.width;
        ctx.height = dimensions.height;
        props.model.recreateBoard();
        props.model.recreatePieces();
    }, [dimensions]);

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight * 0.8,
                width: window.innerWidth * 0.9
            })
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        ctx.lineWidth = BOXSIZE/10;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.shadowBlur = 0;
        ctx.width = dimensions.width;
        ctx.height = dimensions.height;
    
        ctx.beginPath();
        //Canvas area
    
        //Selected piece area
        if (props.model.players[props.model.currentPlayer].selectedPiece) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = BOXSIZE/5;
        } else {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
        }
        ctx.strokeRect(SELECTEDBOX[0], SELECTEDBOX[1], SELECTEDBOX[2], SELECTEDBOX[3]);
    
        // Drag area
        ctx.strokeStyle = "black";
        ctx.fillStyle = "grey";
        ctx.lineWidth = BOXSIZE/10;
        // Board area
        for (let i = 0; i < props.model.board.boardSquares.length; i++) {
            ctx.fillStyle = "white";
            let shape = computeSquare(props.model.board.boardSquares[i]);
            if (!props.model.board.boardSquares[i].isOpen) {
                ctx.fillStyle = props.model.board.boardSquares[i].color;
            } else if (props.model.board.boardSquares[i].corner && !props.model.board.boardSquares[i].hovered) {
                ctx.fillStyle = "grey";
            } else if (props.model.board.boardSquares[i].checkAllowed() && props.model.board.boardSquares[i].hovered) {
                ctx.fillStyle = props.model.movePossibleColor;
            } else if (props.model.board.boardSquares[i].hovered) {
                ctx.fillStyle = props.model.hoverColor;
            } else if (!props.model.board.boardSquares[i].isOpen) {
                ctx.fillStyle = props.model.board.boardSquares[i].color;
            } else {
                ctx.fillStyle = "white";
            } 
            ctx.fillRect(shape.squareCoords[0], shape.squareCoords[1], BOXSIZE, BOXSIZE);
            ctx.strokeRect(shape.squareCoords[0], shape.squareCoords[1], BOXSIZE, BOXSIZE);
        }
    
        //player areas
        ctx.lineWidth = BOXSIZE/10;
        for (let i = 0; i < props.model.players.length; i++) {
            //player 1
            if (i === 0) {
                if (props.model.players[i] === props.model.players[props.model.currentPlayer]) {
                    ctx.lineWidth = BOXSIZE/5;
                    ctx.strokeStyle = "red";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                } else {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                }
                ctx.fillRect(PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
                ctx.strokeRect(PLAYERINDENT, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            } else if (i === 1) {
                //player 2
                if (props.model.players[i] === props.model.players[props.model.currentPlayer]) {
                    ctx.lineWidth = BOXSIZE/5;
                    ctx.strokeStyle = "red";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                } else {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                }
                ctx.fillRect(RIGHTSIDEPLAYER, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
                ctx.strokeRect(RIGHTSIDEPLAYER, PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            } else if (i === 2) {
                if (props.model.players[i] === props.model.players[props.model.currentPlayer]) {
                    ctx.lineWidth = BOXSIZE/5;
                    ctx.strokeStyle = "red";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                } else {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                }
                ctx.fillRect(PLAYERINDENT, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
                ctx.strokeRect(PLAYERINDENT, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
            } else if (i === 3) {
                if (props.model.players[i] === props.model.players[props.model.currentPlayer]) {
                    ctx.lineWidth = BOXSIZE/5;
                    ctx.strokeStyle = "red";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                } else {
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = props.model.players[i].fadedColor;
                }
                ctx.fillRect(RIGHTSIDEPLAYER, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);
                ctx.strokeRect(RIGHTSIDEPLAYER, PLAYERBOXSIZE + 2*PLAYERINDENT, PLAYERBOXSIZE, PLAYERBOXSIZE);        
            }
    
            //Pieces
            ctx.lineWidth = BOXSIZE/10;
            
            for (let j = 0; j < props.model.players[i].pieces.length; j++) {
                for (let k = 0; k < props.model.players[i].pieces[j].shape.length; k++) {
                    let piece = computePiece(props.model.players[i].pieces[j]);
                    ctx.fillStyle = props.model.players[i].pieces[j].color;
                    ctx.strokeStyle = "black";
                    if (props.model.players[i].pieces[j].played === true) {
                        ctx.fillStyle = "grey";
                        ctx.strokeStyle = "grey";
                        for (let j = 0; j < piece.shapeCoords.length; j++) {
                            ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                            ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        }
                    } else if (props.model.players[i].pieces[j].hovMoveAllowed === true ){
                        ctx.strokeStyle = props.model.movePossibleColor;
                        for (let j = 0; j < piece.shapeCoords.length; j++) {
                            ctx.fillRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                            ctx.strokeRect(piece.shapeCoords[j][0], piece.shapeCoords[j][1], BOXSIZE, BOXSIZE);
                        }
                    } else if (props.model.players[i].pieces[j].clicked === true) {
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
        ctx.closePath();
        props.handleCookie();
    }, [props.model, props.redraw]);


    function computeSquare(square) {
        let c = square;
        return new SquareShape(c.row, c.col, c.size, c.color, c.coord);
    }

    function computePiece(piece) {
        let p = piece;
        return new PieceShape(p.id, p.shape, p.color);
    }

    class SquareShape {
        constructor(row, col, size, color, coords) {
            this.row = row;
            this.col = col;
            this.size = size;
            this.color = color;
            this.squareCoords = coords;
        }
    }

    class PieceShape {
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


    const upHandler = (event) => {
        let b = canvasRef.current.getBoundingClientRect();
        let scaleX = canvasRef.current.width / b.width;
        let scaleY = canvasRef.current.height / b.height;
        let x = (event.clientX - b.left) * scaleX;
        let y = (event.clientY - b.top) * scaleY;

        if (props.model.players[props.model.currentPlayer].clickedPiece && playerBounds(props.model, [x, y])) {
          selectPiece(props.model, [x, y]);
          props.handleRedraw();
        }
        if (props.model.players[props.model.currentPlayer].selectedPiece) {
          movePieceToBoard(props.model, CLICKOFFSET, canvasRef.current);
          props.handleRedraw();
        }
        props.model.players[props.model.currentPlayer].unclickPieces();
      }
    
    const downHandler = (event) => {
        let b = canvasRef.current.getBoundingClientRect();
        let scaleX = canvasRef.current.width / b.width;
        let scaleY = canvasRef.current.height / b.height;
        let x = (event.clientX - b.left) * scaleX;
        let y = (event.clientY - b.top) * scaleY;
        clickPiece(props.model, [x, y])
        props.handleRedraw();
    }
    
    const moveHandler = (event) => {
        let b = canvasRef.current.getBoundingClientRect();
        let scaleX = canvasRef.current.width / b.width;
        let scaleY = canvasRef.current.height / b.height;
        let x = (event.clientX - b.left) * scaleX;
        let y = (event.clientY - b.top) * scaleY;

        if (event.buttons === 1 && props.model.players[props.model.currentPlayer].clickedPiece && dragBounds(props.model, [x, y]) && props.model.players[props.model.currentPlayer].selectedPiece) {
            movePiece(props.model, [x, y]);
        }
        props.handleRedraw();
    }


    return (
        <canvas 
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onMouseDown={downHandler}
            onMouseUp={upHandler}
            onMouseMove={moveHandler}
        />

        
    )
}




