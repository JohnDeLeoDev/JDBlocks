import { config } from "./config.js";

export var Config = config;

export default class Model {
    constructor(config) {
        this.config = config;
        this.init(this.config);
    }

    init(config) {
        this.config = config;
        this.board = this.createBoard();
        this.pieces = this.createPieces();
        this.currentPiece = this.pieces[0];
        this.currentPlayer = 0;
        this.currentPieceIndex = 0;
        this.currentPiecePosition = [0,0];
        this.currentPieceOrientation = 0;
        this.currentPieceColor = this.config.playerColors[this.currentPlayer];
        this.gameOver = false;
    }

    createBoard() {
        return new Board(this.config.numRows, this.config.numCols);
    }

    createPieces() {
        var pieces = [];
        for (var i = 0; i < this.config.totalPieces; i++) {
            var piece = new Piece(
                "type" + (i + 1),
                this.config.playerColors[i % this.config.playerColors.length],
                this.config.pieceTypes["type" + (i + 1)].shape,
                this.config.pieceTypes["type" + (i + 1)].numSquares
            );
            pieces.push(piece);
        }
        return pieces;
    }

    getBoard() {
        return this.board.getBoard();
    }

    getCurrentPiece() {
        return this.currentPiece;
    }

    getCurrentPiecePosition() {
        return this.currentPiecePosition;
    }

    getCurrentPieceOrientation() {
        return this.currentPieceOrientation;
    }

    getCurrentPieceColor() {
        return this.currentPieceColor;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    isGameOver() {
        return this.gameOver;
    }

    rotateCurrentPiece() {
        this.currentPiece.rotate();
        this.currentPieceOrientation = (this.currentPieceOrientation + 1) % 4;
    }

    moveCurrentPieceLeft() {
        this.currentPiecePosition[1] -= 1;
    }

    moveCurrentPieceRight() {
        this.currentPiecePosition[1] += 1;
    }

    moveCurrentPieceDown() {
        this.currentPiecePosition[0] += 1;
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
            var row = [];
            for (var j = 0; j < this.numCols; j++) {
                row.push({row: i, col: j, size: 1, color: "white"});
            }
            this.boardSquares.push(row);
        }
    }

    getBoard() {
        return this.board;
    }
}

export class Piece {
    constructor(type, color, shape, numSquares) {
        this.type = type;
        this.color = color;
        this.shape = shape;
        this.numSquares = numSquares;
    }

    getShape() {
        return this.shape;
    }

    getType() {
        return this.type;
    }

    getColor() {
        return this.color;
    }

    getNumSquares() {
        return this.numSquares;
    }

    rotate() {
        var newShape = [];
        for (var i = 0; i < this.numSquares; i++) {
            newShape.push([this.shape[i][1], -this.shape[i][0]]);
        }
        this.shape = newShape;
    }
}




