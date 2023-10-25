export const CLICKOFFSETX = 15;
export const CLICKOFFSETY = 315;


export function clickPiece(model, event) {
    model.players[model.currentPlayer].unclickPieces();
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
        for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
            if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                model.players[model.currentPlayer].clickPiece(i);
                return true;
            } else {
                model.players[model.currentPlayer].unclickPiece(i);
            }
        }
    }
    model.players[model.currentPlayer].unclickPieces();
    return false;
}

export function selectPiece(model, event) {
    model.players[model.currentPlayer].unselectPieces();
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
        for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
            if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                if (model.players[model.currentPlayer].clickedPiece === model.players[model.currentPlayer].pieces[i]) {
                    model.players[model.currentPlayer].selectPiece(i);
                    return true;
                }
            } else {
                model.players[model.currentPlayer].unselectPieces();
            }
        }
    }
    return false;
}

export function movePiece(model, event) {
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    if (event.buttons === 1) {
        for (let i = 0; i < model.players[model.currentPlayer].selectedPiece.shape.length; i++) {
            model.players[model.currentPlayer].selectedPiece.movePiece([x, y]);
        }
    }
}

export function rotatePiece(model, direction) {
    if (model.players[model.currentPlayer].selectedPiece !== null) {
        model.players[model.currentPlayer].selectedPiece.rotate(direction)
    }
    return model;
}

export function movePieceToBoard(model) {
    if (model.players[model.currentPlayer].selectedPiece === null) {
        return;
    }
    let color = model.players[model.currentPlayer].selectedPiece.color;
    if (model.checkSquares(model.players[model.currentPlayer].selectedPiece) && model.checkMoveAllowed(model.players[model.currentPlayer].selectedPiece)) {
        model.setSquares(model.players[model.currentPlayer].selectedPiece, color);
        model.players[model.currentPlayer].removePiece(model.players[model.currentPlayer].selectedPiece);
        model.players[model.currentPlayer].unclickPieces();
        model.players[model.currentPlayer].unselectPieces();
        model.players[model.currentPlayer].increaseMoves();

        nextPlayer(model);
        return true;
    } else {
        model.players[model.currentPlayer].selectedPiece.selectPiece();
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

export function prevPlayer(model) {
    if (model.currentPlayer === 0) {
        model.currentPlayer = model.players.length - 1;
    } else {
        model.currentPlayer--;
    }
}