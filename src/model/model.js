import { BOXSIZE, SPACING, PLAYER1, PLAYER2, PLAYER3, PLAYER4, BOARDINDENTX, BOARDINDENTY, SELECTEDPIECELOCATION, DRAGBOUNDS } from "../boundary/boundary.js";

export default class Model {
    constructor(config) {
        this.config = config;
        this.board = this.createBoard();
        this.playerColors = this.config.playerColors;
        this.playerColorsFaded = this.config.playerColorsFaded;
        this.numPlayers = this.config.numPlayers;
        this.players = []
        for (let i = 0; i < this.numPlayers; i++) {
            this.players.push(new Player(i, this.playerColors[i], this.playerColorsFaded[i], this.createPieces(i, this.playerColors[i])));
        }
        this.currentPlayer = 0;
        this.gameOver = false;
    }

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

    checkSquaresByCoord(coord, shape) {
        let checkEach = [];
        let tempShape = shape;
        
        for (let i = 0; i < tempShape.length; i++) {
            for (let j = 0; j < this.board.boardSquares.length; j++) {
                if (this.board.boardSquares[j].contains(tempShape[i].testShapeCoords[0], tempShape[i].testShapeCoords[1])) {
                    checkEach.push(this.board.boardSquares[j].checkOpen());
                }
            }
        }
        if (checkEach.length === 0 || checkEach.length !== tempShape.length) {
            return false;
        }
        for (let i = 0; i < checkEach.length; i++) {
            if (checkEach[i] === false) {
                return false;
            } 
        }

        return true;
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

    unHoverPieces() {
        for (let i = 0; i < this.board.boardSquares.length; i++) {
            this.board.boardSquares[i].hovered = false;
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
            for (let j = 0; j < this.players[i].pieces.length; j++) {
                for (let k = BOARDINDENTX; k < BOARDINDENTX + (this.board.numCols * SPACING); k += SPACING) {
                    for (let l = BOARDINDENTY; l < BOARDINDENTY + (this.board.numRows * SPACING); l += SPACING) {
                        if (this.checkSquaresByCoord([k, l], this.players[i].pieces[j].shape)) {
                            console.log(k, l, this.players[i].pieces[j])
                            return false;
                        }
                    }
                }
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
                this.boardSquares.push(new BoardSquare(i, j, BOXSIZE, "white"));
            }
        }
    }    
}

export class BoardSquare {
    constructor(row, col, size, color) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.color = color;
        this.isOpen = true;
        this.hovered = false;
        this.coord = this.calcSquareCoords();
        this.bounds = this.calcSquareBounds();
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
        this.centerPoint = this.calcCenterPoint();
    }



    changeCenterPoint() {
        this.centerPoint = this.calcCenterPoint();
    }


    calcCenterPoint() {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.shape.length; i++) {
            x += this.shape[i].shapeCoords[0];
            y += this.shape[i].shapeCoords[1];
        }
        return [x / this.shape.length, y / this.shape.length];
    }

    sendToSelectArea() {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].sendToSelectArea();
        }
    }

    clickPiece() {
        this.clicked = true;
    }

    unclickPiece() {
        this.clicked = false;
    }

    selectPiece() {
        this.selected = true;
        this.moveWholePiece(SELECTEDPIECELOCATION);
    }

    unselectPiece() {
        this.selected = false;
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].shapeCoords = this.shape[i].startingCoords;
        }
    }

    moveWholePiece(location) {
        this.coord = location;
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].shapeCoords = this.shape[i].calcShapeCoordsSelected(this.coord);
            this.shape[i].bounds = this.shape[i].calcShapeBounds();
        }
        this.calcCenterPoint();
    }

    movePiece(location) {
        var diffX = location[0] - this.shape[0].shapeCoords[0];
        var diffY = location[1] - this.shape[0].shapeCoords[1];
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].moveShape(diffX, diffY);
        }
        this.calcCenterPoint();

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
                this.shape[i].calcShapeBounds();
            } else {
                this.shape[i].shapeCoords = [base[0] - x, base[1] + y];
                this.shape[i].selectedLocation = [base[0] - x, base[1] + y];
                this.shape[i].calcShapeBounds();
            }
        }
    }


    rotate(direction) {
        let base = this.shape[0].shapeCoords;
        for (let i = 0; i < this.shape.length; i++) {
            let x = this.shape[i].shapeCoords[0] - base[0];
            let y = this.shape[i].shapeCoords[1] - base[1];
            if (direction) {
                this.shape[i].shapeCoords = [base[0] - y, base[1] + x];
                this.shape[i].selectedLocation = [base[0] - y, base[1] + x];
            } else {
                this.shape[i].shapeCoords = [base[0] + y, base[1] - x];
                this.shape[i].selectedLocation = [base[0] + y, base[1] - x];

            }
        }
    }

    moveDistance(diffX, diffY) {
        for (let i = 0; i < this.shape.length; i++) {
            this.shape[i].moveShape(diffX, diffY);
        }
        this.calcCenterPoint();
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
        this.testShapeCoords = this.calcTestShapeCoords();
        this.shapeSize = BOXSIZE;
        this.bounds = this.calcShapeBounds();
        this.selectedLocation = this.calcSelectedLocation();
        this.clicked = false;
    }

    sendToSelectArea() {
        this.shapeCoords = this.selectedLocation;
        this.calcShapeBounds();
    }

    calcSelectedLocation() {
        let coords = [];
        coords.push(SELECTEDPIECELOCATION[0] + (this.shape[0] * SPACING), SELECTEDPIECELOCATION[1] +  (this.shape[1]) * SPACING);
        return coords;
    }

    calcShapeBounds() {
        let xLeft = this.shapeCoords[0] - (this.shapeSize / 2);
        let xRight = this.shapeCoords[0] + (this.shapeSize / 2);
        let yTop = this.shapeCoords[1] - (this.shapeSize / 2);
        let yBottom = this.shapeCoords[1] + (this.shapeSize / 2);

        return [xLeft, xRight, yTop, yBottom];
    }

    updateShape(coord) {
        this.shapeCoords = this.calcShapeCoords(coord);
    }

    calcShapeCoordsSelected(coord) {
        let coords = [];
        coords.push(coord[0] + (this.shape[0] * SPACING), coord[1] +  (this.shape[1]) * SPACING);
        return coords;
    }

    calcTestShapeCoords() {
        let coords = [];
        for (let i = BOARDINDENTX; i < BOARDINDENTX + (20 * SPACING); i += SPACING) {
            for (let j = BOARDINDENTY; j < BOARDINDENTY + (20 * SPACING); j += SPACING) {
                coords.push([i, j]);
            }
        }
        return coords;
    }

    calcCenterShapeCoords(coord) {
        let coords = [];
        coords.push(coord[0] + (this.shape[0] * SPACING), coord[1] +  (this.shape[1]) * SPACING);
        return coords;
    }

    calcShapeCoords(coord) {
        let coords = [];
        coords.push(this.playerPiecesLocation[0] + (this.shape[0] + coord[0]) * SPACING, this.playerPiecesLocation[1] +  (this.shape[1] + coord[1]) * SPACING);
        return coords;
    }

    contains(x, y) {
        return ((x + 1 >= this.bounds[0] && x - 1 <= this.bounds[1]) && (y + 1 >= this.bounds[2] && y - 1 <= this.bounds[3]));
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
        this.calcShapeBounds();
    }
}



