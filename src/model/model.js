import { BOXSIZE, SPACING, PLAYER1, PLAYER2, PLAYER3, PLAYER4, BOARDINDENTX, BOARDINDENTY, SELECTEDPIECELOCATION } from "../boundary/boundary.js";


export default class Model {
    constructor(config) {
        this.config = config;
        this.board = this.createBoard();
        this.playerColors = this.config.playerColors;
        this.playerColorsFaded = this.config.playerColorsFaded;
        this.hoverColor = this.config.hoverColor;
        this.numPlayers = this.config.numPlayers;
        this.movePossibleColor = this.config.movePossibleColor;
        this.players = []
        for (let i = 0; i < this.numPlayers; i++) {
            this.players.push(new Player(i, this.playerColors[i], this.playerColorsFaded[i], this.createPieces(i, this.playerColors[i])));
        }
        this.currentPlayer = 0;
        this.gameOver = false;
    }
        
    recreatePieces() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].pieces = this.createPieces(i, this.playerColors[i]);
            for (let j = 0; j < this.players[i].playedPieces.length; j++) {
                this.players[i].pieces.splice(this.players[i].pieces.indexOf(this.players[i].playedPieces[j]), 1);
            }
        }
    }

    recreateBoard() {
        let currentBoard = this.board;
        this.board = this.createBoard();
        for (let i = 0; i < currentBoard.boardSquares.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (currentBoard.boardSquares[i].row === this.board.boardSquares[j].row && currentBoard.boardSquares[i].col === this.board.boardSquares[j].col) {
                    this.board.boardSquares[j].color = currentBoard.boardSquares[i].color;
                    this.board.boardSquares[j].isOpen = currentBoard.boardSquares[i].isOpen;
                }
            }
        }
        
    }

    //check board  to see if current player can make a move at boardsquare


    reset(numPlayers) {
        this.board = this.createBoard();
        this.playerColors = this.config.playerColors;
        this.numPlayers = numPlayers;
        this.players = []
        for (let i = 0; i < this.numPlayers; i++) {
            this.players.push(new Player(i, this.playerColors[i], this.playerColorsFaded[i], this.createPieces(i, this.playerColors[i])));
        }
        this.currentPlayer = 0;
        this.gameOver = false;
    }

    setNumPlayers(num) {
        this.reset(num);
    }

    createBoard() {
        return new Board(this.config.numRows, this.config.numCols);
    }

    createPieces(player, color) {
        var pieces = [];       

        for (var i = 0; i < this.config.pieceTypes.length ; i++) {
            var piece = new Piece(
                this.config.pieceTypes[i].id,
                color,
                this.config.pieceTypes[i].shape,
                this.config.pieceTypes[i].numSquares,
                this.config.pieceTypes[i].coord,
                this.config.pieceTypes[i].startingCoord, 
                player
                );
            pieces.push(piece);
        }
        return pieces;
    }

    checkSquares(piece) {
        let checkEach = [];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(piece.shape[i].shapeCoords[0], piece.shape[i].shapeCoords[1])) {
                    checkEach.push(this.board.boardSquares[j].checkOpen());
                }
            }
        }
        if (checkEach.length === 0 || checkEach.length !== piece.shape.length) {
            return false;
        }
        for (let i = 0; i < checkEach.length; i++) {
            if (checkEach[i] === false) {
                return false;
            } 
        }
        return true;
    }

    checkSquaresByCoord(coord, boardSquare, piece) {
        let tempShape = piece;
        tempShape.coord = coord;
        if (this.checkCornerTouch(tempShape)) {
            return true;
        } else {
            return false;
        }
    }


    findSquares(piece) {
        let squares = [];
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(piece.shape[i].shapeCoords[0], piece.shape[i].shapeCoords[1])) {
                    squares.push(this.board.boardSquares[j]);
                }
            }
        }
        return squares;
    }

    hoverPiece(piece) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(piece.shape[i].shapeCoords[0], piece.shape[i].shapeCoords[1])) {
                    this.board.boardSquares[j].hovered = true;
                }
            }
        }
        return true;
    }

    hovMoveAllowed(piece) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(piece.shape[i].shapeCoords[0], piece.shape[i].shapeCoords[1])) {
                    this.board.boardSquares[j].moveAllowed = true;
                }
            }
        }
        return true;
    }

    hovNotAllowed(piece) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(piece.shape[i].shapeCoords[0], piece.shape[i].shapeCoords[1])) {
                    this.board.boardSquares[j].moveAllowed = false;
                }
            }
        }
        return true;
    }

    unHoverPieces() {
        for (let i = 0; i < this.board.boardSquares.length; i++) {
            this.board.boardSquares[i].hovered = false;
            this.board.boardSquares[i].MoveAllowed = false;
        }
    }


    setSquares(piece, color) {
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(piece.shape[i].shapeCoords[0], piece.shape[i].shapeCoords[1])) {
                    this.board.boardSquares[j].color = color;
                    this.board.boardSquares[j].isOpen = false;
                }
            }
        }
        return true;
    }
    checkNotTouching(squares) {
        let checkAroundAll = [];
        for (let i = 0; i < squares.length; i++) {
            let checkAround = [];
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].row - 1 === squares[i].row && this.board.boardSquares[j].col === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen()) {
                        checkAround.push(true);
                    } else if (this.board.boardSquares[j].color !== this.players[this.currentPlayer].color) {
                        checkAround.push(true); 
                    } else {
                        checkAround.push(false);
                    }
                } else if (this.board.boardSquares[j].row + 1 === squares[i].row && this.board.boardSquares[j].col === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen()) {
                        checkAround.push(true);
                    } else if (this.board.boardSquares[j].color !== this.players[this.currentPlayer].color) {
                        checkAround.push(true); 
                    } else {
                        checkAround.push(false);
                    }
                } else if (this.board.boardSquares[j].row === squares[i].row && this.board.boardSquares[j].col - 1 === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen()) {
                        checkAround.push(true);
                    } else if (this.board.boardSquares[j].color !== this.players[this.currentPlayer].color) {
                        checkAround.push(true); 
                    } else {
                        checkAround.push(false);
                    }
                } else if (this.board.boardSquares[j].row === squares[i].row && this.board.boardSquares[j].col + 1 === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen()) {
                        checkAround.push(true);
                    } else if (this.board.boardSquares[j].color !== this.players[this.currentPlayer].color) {
                        checkAround.push(true); 
                    } else {
                        checkAround.push(false);
                    }
                } 
            }
            checkAroundAll.push(checkAround);
        }
        for (let i = 0; i < checkAroundAll.length; i++) {
            for (let j = 0; j < checkAroundAll[i].length; j++) {
                if (checkAroundAll[i][j] === false) {
                    return false;
                }
            }
        }
        return true;
    }


    checkCornerTouch(squares) {
        let checkAroundAll = [];
        for (let i = 0; i < squares.length; i++) {
            let checkAround = [];
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].row - 1 === squares[i].row && this.board.boardSquares[j].col - 1 === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen() === false) {
                        if (this.board.boardSquares[j].color === this.players[this.currentPlayer].color) {
                            checkAround.push(true);
                        } else {
                            checkAround.push(false);
                        }
                    } else {
                        checkAround.push(false);
                    }
                } else if (this.board.boardSquares[j].row - 1 === squares[i].row && this.board.boardSquares[j].col + 1 === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen() === false) {
                        if (this.board.boardSquares[j].color === this.players[this.currentPlayer].color) {
                            checkAround.push(true);
                        } else {
                            checkAround.push(false);
                        }
                    } else {
                        checkAround.push(false);
                    }
                } else if (this.board.boardSquares[j].row + 1 === squares[i].row && this.board.boardSquares[j].col - 1 === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen() === false) {
                        if (this.board.boardSquares[j].color === this.players[this.currentPlayer].color) {
                            checkAround.push(true);
                        } else {
                            checkAround.push(false);
                        }
                    } else {
                        checkAround.push(false);
                    }
                } else if (this.board.boardSquares[j].row + 1 === squares[i].row && this.board.boardSquares[j].col + 1 === squares[i].col) {
                    if (this.board.boardSquares[j].checkOpen() === false) {
                        if (this.board.boardSquares[j].color === this.players[this.currentPlayer].color) {
                            checkAround.push(true);
                        } else {
                            checkAround.push(false);
                        }
                    } else {
                        checkAround.push(false);
                    }
                }
            }
            checkAroundAll.push(checkAround);
        }
        for (let i = 0; i < checkAroundAll.length; i++) {
            for (let j = 0; j < checkAroundAll[i].length; j++) {
                if (checkAroundAll[i][j] === true) {
                    return true;
                }
            }
        }
        return false;
    }


    firstMove() {
        if (this.players[this.currentPlayer].moveNumber === 0) {
            return true;
        } else {
            return false;
        }
    }


    checkMoveAllowed(piece) {
        let squares = this.findSquares(piece);
        if (this.checkSquares(piece)) {
            if (this.firstMove()) {
                for (let i = 0; i < squares.length; i++) {
                    if ((squares[i].row === 0) && (squares[i].col === 0)) {
                        return true;
                    } else if ((squares[i].row === this.board.numRows - 1) && (squares[i].col === 0)) {
                        return true;
                    } else if ((squares[i].row === 0) && (squares[i].col === this.board.numCols - 1)) {
                        return true;
                    } else if ((squares[i].row === this.board.numRows - 1) && (squares[i].col === this.board.numCols - 1)) {
                        return true;
                    } 
                }
            } else {

                if (this.checkNotTouching(squares) && this.checkCornerTouch(squares)) {
                    return true;
                }
            }
        }
    }

    checkVictory() {    
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].pieces.length === 0) {
                this.gameOver = true;
                console.log("No pieces remaining. Game over.")
                return true;
            }
        }
        this.gameOver = true;
        console.log("No moves remaining. Game over.")
        return true;
    }
                    
    isGameOver() {
        return this.gameOver;
    }
}

export class Player {
    constructor(id, color, fadedColor, pieces) {
        this.id = id;
        this.color = color;
        this.fadedColor = fadedColor;
        this.score = 0;
        this.pieces = pieces;
        this.playedPieces = [];
        this.moveNumber = 0;
        this.selectedPiece = null;
        this.clickedPiece = null;
    }

    playPiece(piece) {
        piece.playPiece();
        this.playedPieces.push(piece);
    }

    clickPiece(i) {
        this.clickedPiece = this.pieces[i];
        this.pieces[i].clickPiece();
    }

    unclickPiece(i) {
        this.pieces[i].unclickPiece();
    }

    unclickPieces() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].unclickPiece();
        }
        this.clickedPiece = null;
    }

    selectPiece(i) {
        this.selectedPiece = this.pieces[i];
        this.pieces[i].selectPiece();
        this.unclickPieces();
    }

    unselectPiece(i) {
        this.pieces[i].unselectPiece();
    }

    unselectPieces() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].unselectPiece();
        }
        this.selectedPiece = null;
    }

    getSelectedShape() {
        for (let i = 0; i < this.pieces.length; i++) {
            for (let j = 0; j < this.pieces[i].shape.length; j++) {
                if (this.pieces[i].shape[j].clicked === true) {
                    return this.pieces[i].shape[j];
                }
            }
        }
    }

    removePiece(piece) {
        this.playedPieces.push(piece);
        this.pieces.splice(this.pieces.indexOf(piece), 1);
        return piece;
    }

    increaseMoves() {
        this.moveNumber++;
    }

}

export class Board {
    constructor(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.boardSquares = [];
        this.init();
    }

    init() {
        for (var i = 0; i < this.numRows; i++) {
            for (var j = 0; j < this.numCols; j++) {
                if (i === 0 && j === 0) {
                    this.boardSquares.push(new BoardSquare(i, j, BOXSIZE, true, true));
                } else if (i === 0 && j === this.numCols - 1) {
                    this.boardSquares.push(new BoardSquare(i, j, BOXSIZE, true, true));
                } else if (i === this.numRows - 1 && j === 0) {
                    this.boardSquares.push(new BoardSquare(i, j, BOXSIZE, true, true));
                } else if (i === this.numRows - 1 && j === this.numCols - 1) {                    
                    this.boardSquares.push(new BoardSquare(i, j, BOXSIZE, true, true)); 
                } else {
                    this.boardSquares.push(new BoardSquare(i, j, BOXSIZE, false, false));
                }
            }
        }
    }    

}

export class BoardSquare {
    constructor(row, col, size, movePossible, corner, isOpen, color) {
        this.row = row;
        this.col = col;
        this.size = size;
        if (color) {
            this.color = color;
        } else {
            this.color = "white";
        }
        if (isOpen) {
            this.isOpen = isOpen;
        } else {
            this.isOpen = true;
        }
        this.hovered = false;
        this.moveAllowed = movePossible;
        this.corner = corner;
        this.coord = this.calcSquareCoords();
        this.bounds = this.calcSquareBounds();

    }

    checkAllowed() {
        return this.moveAllowed;
    }

    checkHovered() {
        return this.hovered;
    }

    contains(x, y) {
        return ((x >= this.bounds[0] && x <= this.bounds[1]) && (y >= this.bounds[2] && y <= this.bounds[3]));
    }

    checkOpen() {
        return this.isOpen;
    }

    checkColor() {
        return this.color;
    }

    calcSquareBounds() {
        let xLeft = this.coord[0] - (this.size / 2);
        let xRight = this.coord[0] + (this.size / 2);
        let yTop = this.coord[1] - (this.size / 2);
        let yBottom = this.coord[1] + (this.size / 2);

        return [xLeft, xRight, yTop, yBottom];
    }

    calcSquareCoords() {
        let coords = [];
        coords.push(BOARDINDENTX + (this.col * SPACING),BOARDINDENTY + (this.row * SPACING));
        return coords;
    }
}

export class Piece {
    constructor(id, color, shape, numSquares, coord, startingCoord, player) {
        this.id = id
        this.color = color;
        this.startingCoord = startingCoord;
        this.coord = coord;
        this.player = player;
        this.numSquares = numSquares;
        this.clicked = false;
        this.selected = false;
        this.shape = this.createShapes(shape, coord, this.player);
        this.bounds = this.calcBounds();
        this.centerPoint = this.calcCenterPoint();
        this.hovering = false;
        this.hovMoveAllowed = false;
        this.played = false;
    }

    hovAllowed() {
        this.hovMoveAllowed = true;
    }

    hovNotAllowed() {
        this.hovMoveAllowed = false;
    }

    playPiece() {
        this.played = true;
    }

    hoveringPiece() {
        this.hovering = true;
    }

    stopHoveringPiece() {
        this.hovering = false;
        this.hovMoveAllowed = false;
    }

    calcBounds() {
        let xMax = null;
        let xMin = null;
        let yMax = null;
        let yMin = null;

        for (let i = 0; i < this.shape.length; i++) {
            if (xMax === null || this.shape[i].bounds[1] > xMax) {
                xMax = this.shape[i].bounds[1];
            }
            if (xMin === null || this.shape[i].bounds[1] < xMin) {
                xMin = this.shape[i].bounds[0];
            }
            if (yMax === null || this.shape[i].bounds[3] > yMax) {
                yMax = this.shape[i].bounds[3];
            }
            if (yMin === null || this.shape[i].bounds[2] < yMin) {
                yMin = this.shape[i].bounds[2];
            }
        }

        return [xMin, xMax, yMin, yMax];
    }

    updatePiece() {
        this.updateBounds();
        this.updateCenterPoint();
    }

    updateCenterPoint() {
        this.centerPoint = this.calcCenterPoint();
    }

    updateBounds() {
        this.bounds = this.calcBounds();
    }

    moveOnCenterPoint(point) {
        this.updatePiece();
        let diffX = point[0] - this.centerPoint[0];
        let diffY = point[1] - this.centerPoint[1];
        this.moveDistance(diffX, diffY);
        this.updatePiece();
        if (this.centerPoint[0] !== point[0] || this.centerPoint[1] !== point[1]) {
            this.moveOnCenterPoint(point);
        }
    }

    calcCenterPoint() {
        let x = (this.bounds[0] + this.bounds[1]) / 2;
        let y = (this.bounds[2] + this.bounds[3]) / 2;
        return [x, y];
    }

    clickPiece() {
        this.clicked = true;
    }

    unclickPiece() {
        this.clicked = false;
    }

    selectPiece() {
        this.selected = true;
        this.moveOnCenterPoint(SELECTEDPIECELOCATION);
    }

    unselectPiece() {
        this.selected = false;
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].shapeCoords = this.shape[i].startingCoords;
        }
    }

    movePiece(location) {
        var diffX = location[0] - this.shape[0].shapeCoords[0];
        var diffY = location[1] - this.shape[0].shapeCoords[1];
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].moveShape(diffX, diffY);
        }
        this.updatePiece();
    }

    createShapes(shape, coord) {
        var shapes = [];
        for (var i = 0; i < shape.length; i++) {
            shapes.push(new PieceShape(shape[i], coord, this.player));
        }
        return shapes;
    }

    flip(direction) {
        let base = this.shape[0].shapeCoords;
        for (let i = 0; i < this.shape.length; i++) {
            let x = this.shape[i].shapeCoords[0] - base[0];
            let y = this.shape[i].shapeCoords[1] - base[1];
            if (direction) {
                this.shape[i].shapeCoords = [base[0] + x, base[1] - y];
                this.shape[i].selectedLocation = [base[0] + x, base[1] - y];
            } else {
                this.shape[i].shapeCoords = [base[0] - x, base[1] + y];
                this.shape[i].selectedLocation = [base[0] - x, base[1] + y];
            }
        }
        this.updatePiece();
        this.moveOnCenterPoint(SELECTEDPIECELOCATION);
    }


    rotate(direction) {
        let base = this.shape[0].shapeCoords;
        for (let i = 0; i < this.shape.length; i++) {
            let x = this.shape[i].shapeCoords[0] - base[0];
            let y = this.shape[i].shapeCoords[1] - base[1];
            if (direction) {
                this.shape[i].shapeCoords = [base[0] - y, base[1] + x];
            } else {
                this.shape[i].shapeCoords = [base[0] + y, base[1] - x];
            }
        }
        this.updatePiece();
        this.moveOnCenterPoint(SELECTEDPIECELOCATION);
    }

    moveDistance(diffX, diffY) {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].moveShape(diffX, diffY);
        }
        this.updatePiece();
    }
    
}

export class PieceShape {
    constructor(shape, coord, player) {
        this.shape = shape;
        this.player = player;
        this.playerPiecesLocation = null;
        if (this.player === 0) {
            this.playerPiecesLocation = PLAYER1;
        } else if (this.player === 1) {
            this.playerPiecesLocation = PLAYER2;
        } else if (this.player === 2) {
            this.playerPiecesLocation = PLAYER3;
        } else if (this.player === 3) {
            this.playerPiecesLocation = PLAYER4;
        }
        this.startingCoords = this.calcShapeCoords(coord);
        this.shapeCoords = this.calcShapeCoords(coord);
        this.shapeSize = BOXSIZE;
        this.bounds = this.calcShapeBounds();
        this.clicked = false;
    }

    updateShape() {
        this.updateBounds();
    }

    updateShapeCoords(coord) {
        this.shapeCoords = this.calcShapeCoords(coord);
    }

    updateBounds() {
        this.bounds = this.calcShapeBounds();
    }

    calcShapeBounds() {
        let xLeft = this.shapeCoords[0] - (this.shapeSize / 2);
        let xRight = this.shapeCoords[0] + (this.shapeSize / 2);
        let yTop = this.shapeCoords[1] - (this.shapeSize / 2);
        let yBottom = this.shapeCoords[1] + (this.shapeSize / 2);

        return [xLeft, xRight, yTop, yBottom];
    }

    calcShapeCoords(coord) {
        let coords = [];
        coords.push(this.playerPiecesLocation[0] + (this.shape[0] + coord[0]) * SPACING, this.playerPiecesLocation[1] +  (this.shape[1] + coord[1]) * SPACING);
        return coords;
    }

    contains(x, y) {
        return ((x + 5 >= this.bounds[0] && x - 5 <= this.bounds[1]) && (y + 5 >= this.bounds[2] && y - 5 <= this.bounds[3]));
    }

    clickShape(x, y) {
        if (this.contains(x, y)) {
            this.clicked = true;
            return true;
        } else {
            this.clicked = false;
            return false;
        }
    }

    moveShape(diffX, diffY) {
        this.shapeCoords = [this.shapeCoords[0] + diffX, this.shapeCoords[1] + diffY];
        this.updateShape();
    }
}



