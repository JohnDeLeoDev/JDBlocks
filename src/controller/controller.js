import {DRAGBOUNDS, PLAYERBOUNDS} from '../boundary/boundary.js';


export const CLICKOFFSETX = 15;
export const CLICKOFFSETY = 285;

export function clickPiece(model, event) {
    model.players[model.currentPlayer].unclickPieces();
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    if (!dragBounds(model, event)) {
        for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
            for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
                if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                    model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                    model.players[model.currentPlayer].clickPiece(i);
                    console.log("piece clicked")
                    return true;
                }
            }
        }
    } else {
        for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
            for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
                if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                    model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                    model.players[model.currentPlayer].clickPiece(i);
                    return true;
                }
            }
        }
    }
    return false;
}

export function selectPiece(model, event) {
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    console.log(dragBounds(model, event));
    if (!dragBounds(model, event)) {
        for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
            for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
                if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                    model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                    if (model.players[model.currentPlayer].clickedPiece === model.players[model.currentPlayer].pieces[i]) {
                        model.players[model.currentPlayer].selectPiece(i);
                        model.players[model.currentPlayer].unclickPieces();
                        return true;
                    }
                } else {
                    if (!dragBounds(model, event)) {
                        model.players[model.currentPlayer].unselectPieces();
                    }
                }
            }
        }
        model.players[model.currentPlayer].unclickPieces();
        return false;
    }
}

export function movePiece(model, event) {
    model.unHoverPieces();
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    if (model.players[model.currentPlayer].clickedPiece !== null) {
        for (let i = 0; i < model.players[model.currentPlayer].selectedPiece.shape.length; i++) {
            model.players[model.currentPlayer].selectedPiece.movePiece([x, y]);
            if (model.checkSquares(model.players[model.currentPlayer].selectedPiece) && model.checkMoveAllowed(model.players[model.currentPlayer].selectedPiece)) {
                model.hoverPiece(model.players[model.currentPlayer].selectedPiece);
            }
        }
    }
}

export function dragBounds(model, event) {
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    if (x > DRAGBOUNDS[0] && x < DRAGBOUNDS[1] && y > DRAGBOUNDS[2] && y < DRAGBOUNDS[3]) {
        return true;
    } else {
        return false;
    }
}

export function playerBounds(model, event) {
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    if (model.currentPlayer === 0) {
        if (x > PLAYERBOUNDS[0][0] && x < PLAYERBOUNDS[0][1] && y > PLAYERBOUNDS[0][2] && y < PLAYERBOUNDS[0][3]) {
            console.log("player bounds 1");
            return true;
        }
    } else if (model.currentPlayer === 1) {
        if (x > PLAYERBOUNDS[1][0] && x < PLAYERBOUNDS[1][1] && y > PLAYERBOUNDS[1][2] && y < PLAYERBOUNDS[1][3]) {
            console.log("player bounds 2");
            return true;
        }
    } else if (model.currentPlayer === 2) {
        if (x > PLAYERBOUNDS[2][0] && x < PLAYERBOUNDS[2][1] && y > PLAYERBOUNDS[2][2] && y < PLAYERBOUNDS[2][3]) {
            console.log("player bounds 3");
            return true;
        }
    } else if (model.currentPlayer === 3) {
        if (x > PLAYERBOUNDS[3][0] && x < PLAYERBOUNDS[3][1] && y > PLAYERBOUNDS[3][2] && y < PLAYERBOUNDS[3][3]) {
            console.log("player bounds 4");
            return true;
        }
    }
    return false;
}



export function rotatePiece(model, direction) {
    if (model.players[model.currentPlayer].selectedPiece !== null) {
        model.players[model.currentPlayer].selectedPiece.rotate(direction)
    }
    return model;
}

export function flipPiece(model, direction) {
    if (model.players[model.currentPlayer].selectedPiece !== null) {
        model.players[model.currentPlayer].selectedPiece.flip(direction)
    }
    return model;
}

export function movePieceToBoard(model) {
    if (model.players[model.currentPlayer].selectedPiece === null) {
        return false;
    }
    let color = model.players[model.currentPlayer].selectedPiece.color;
    if (model.checkSquares(model.players[model.currentPlayer].selectedPiece) && model.checkMoveAllowed(model.players[model.currentPlayer].selectedPiece)) {
        model.unHoverPieces();
        model.setSquares(model.players[model.currentPlayer].selectedPiece, color);
        model.players[model.currentPlayer].removePiece(model.players[model.currentPlayer].selectedPiece);
        model.players[model.currentPlayer].unclickPieces();
        model.players[model.currentPlayer].unselectPieces();
        model.players[model.currentPlayer].increaseMoves();
        nextPlayer(model);
        return true;
    } else {
        model.unHoverPieces();
        model.players[model.currentPlayer].selectedPiece.selectPiece();
        model.players[model.currentPlayer].unclickPieces();
        
        return false;
    }
}

export function nextPlayer(model) {
    if (model.currentPlayer === model.players.length - 1) {
        model.players[model.currentPlayer].increaseMoves();
        model.currentPlayer = 0;
    } else {
        model.players[model.currentPlayer].increaseMoves();
        model.currentPlayer++;
    }
}


