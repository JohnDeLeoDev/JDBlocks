import { BOXSIZE, SPACING, PLAYER1, PLAYER2, PLAYER3, PLAYER4, BOARDINDENTX, BOARDINDENTY, SELECTEDPIECELOCATION } from "../boundary/boundary.js";

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
        if (checkEach.length === 0) {
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
    }

    selectPiece(i) {
        this.selectedPiece = this.pieces[i];
        this.pieces[i].selectPiece();
    }

    unselectPiece(i) {
        this.pieces[i].unselectPiece();
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
        this.coord = [BOARDINDENTX + (this.col * SPACING),BOARDINDENTY + (this.row * SPACING)]
    }

    contains(x, y) {
        return ((x + 20 >= this.coord[0] && x - 20 <= this.coord[0]) && (y + 20 >= this.coord[1] && y - 20 <= this.coord[1]));
    }

    checkOpen() {
        return this.isOpen;
    }

    checkColor() {
        return this.color;
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
        this.selected = false;
        this.shape = this.createShapes(shape, coord, this.player);
    }

    selectPiece() {
        this.selected = true;
        this.movePiece(SELECTEDPIECELOCATION);
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
    }

    createShapes(shape, coord) {
        var shapes = [];
        for (var i = 0; i < shape.length; i++) {
            shapes.push(new PieceShape(shape[i], coord, this.player));
        }
        return shapes;
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
        this.clicked = false;
    }

    updateShape(coord) {
        this.shapeCoords = this.calcShapeCoords(coord);
    }

    calcShapeCoords(coord) {
        let coords = [];
        coords.push(this.playerPiecesLocation[0] + (this.shape[0] + coord[0]) * SPACING, this.playerPiecesLocation[1] +  (this.shape[1] + coord[1]) * SPACING);
        return coords;
    }

    contains(x, y) {
        return ((x + 20 >= this.shapeCoords[0] && x - 20 <= this.shapeCoords[0]) && (y + 20 >= this.shapeCoords[1] && y - 20 <= this.shapeCoords[1]));
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
    }
}



