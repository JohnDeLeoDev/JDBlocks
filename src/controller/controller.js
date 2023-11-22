import {DRAGBOUNDS, PLAYERBOUNDS} from '../boundary/boundary.js';


export function clickPiece(model, coords) {
    model.players[model.currentPlayer].unclickPieces();
    let x = coords[0];
    let y = coords[1];

    if (!dragBounds(model, [x, y])) {
        for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
            for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
                if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                    model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                    model.players[model.currentPlayer].clickPiece(i);
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

export function selectPiece(model, coords) {
    let x = coords[0];
    let y = coords[1];
    if (!dragBounds(model, [x, y])) {
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
                    if (!dragBounds(model, [x, y])) {
                        model.players[model.currentPlayer].unselectPieces();
                    }
                }
            }
        }
        model.players[model.currentPlayer].unclickPieces();
        return false;
    }
}

export function movePiece(model, coords) {
    model.unHoverPieces();
    let x = coords[0];
    let y = coords[1];
    if (model.players[model.currentPlayer].clickedPiece !== null) {
        for (let i = 0; i < model.players[model.currentPlayer].selectedPiece.shape.length; i++) {
            model.hoverPiece(model.players[model.currentPlayer].selectedPiece);
            model.players[model.currentPlayer].selectedPiece.hoveringPiece();
            model.players[model.currentPlayer].selectedPiece.movePiece([x, y]);
            if (model.checkSquares(model.players[model.currentPlayer].selectedPiece) && model.checkMoveAllowed(model.players[model.currentPlayer].selectedPiece)) {
                model.hovMoveAllowed(model.players[model.currentPlayer].selectedPiece);
                model.players[model.currentPlayer].selectedPiece.hovAllowed();
            } else {
                model.hovNotAllowed(model.players[model.currentPlayer].selectedPiece);
                model.players[model.currentPlayer].selectedPiece.hovNotAllowed();
            }
        }
    } else {
        model.unHoverPieces();
    }

}

export function dragBounds(model, coords) {
    let x = coords[0];
    let y = coords[1];
    if (x > DRAGBOUNDS[0] && x < DRAGBOUNDS[1] && y > DRAGBOUNDS[2] && y < DRAGBOUNDS[3]) {
        return true;
    } else {
        return false;
    }
}

export function playerBounds(model, coords) {
    let x = coords[0];
    let y = coords[1];
    if (model.currentPlayer === 0) {
        if (x > PLAYERBOUNDS[0][0] && x < PLAYERBOUNDS[0][1] && y > PLAYERBOUNDS[0][2] && y < PLAYERBOUNDS[0][3]) {
            return true;
        }
    } else if (model.currentPlayer === 1) {
        if (x > PLAYERBOUNDS[1][0] && x < PLAYERBOUNDS[1][1] && y > PLAYERBOUNDS[1][2] && y < PLAYERBOUNDS[1][3]) {
            return true;
        }
    } else if (model.currentPlayer === 2) {
        if (x > PLAYERBOUNDS[2][0] && x < PLAYERBOUNDS[2][1] && y > PLAYERBOUNDS[2][2] && y < PLAYERBOUNDS[2][3]) {
            return true;
        }
    } else if (model.currentPlayer === 3) {
        if (x > PLAYERBOUNDS[3][0] && x < PLAYERBOUNDS[3][1] && y > PLAYERBOUNDS[3][2] && y < PLAYERBOUNDS[3][3]) {
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
        model.players[model.currentPlayer].playPiece(model.players[model.currentPlayer].selectedPiece);
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


