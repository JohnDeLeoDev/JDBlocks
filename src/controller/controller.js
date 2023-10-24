export const CLICKOFFSETX = 100;
export const CLICKOFFSETY = 310;

export function selectPiece(model, event) {
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    for (let i = 0; i < model.players[model.currentPlayer].pieces.length; i++) {
        for (let j = 0; j < model.players[model.currentPlayer].pieces[i].shape.length; j++) {
            if (model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y)) {
                model.players[model.currentPlayer].pieces[i].shape[j].clickShape(x, y);
                model.players[model.currentPlayer].selectPiece(i);
                break;
            } else {
                model.players[model.currentPlayer].unselectPiece(i);
            }
        }
    }
}

export function movePiece(model, event) {
    let x = event.pageX - CLICKOFFSETX;
    let y = event.pageY - CLICKOFFSETY;
    for (let i = 0; i < model.players[model.currentPlayer].selectedPiece.shape.length; i++) {
        if (model.players[model.currentPlayer].selectedPiece.shape[i].clickShape(x, y)) {
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
    let pieceMem = model.players[model.currentPlayer].selectedPiece

    let color = model.players[model.currentPlayer].selectedPiece.color;
    if (model.checkSquares(model.players[model.currentPlayer].selectedPiece) && model.checkMoveAllowed(model.players[model.currentPlayer].selectedPiece)) {
        model.setSquares(model.players[model.currentPlayer].selectedPiece, color);
        model.players[model.currentPlayer].removePiece(model.players[model.currentPlayer].selectedPiece);
        model.players[model.currentPlayer].selectedPiece = null;
        model.players[model.currentPlayer].increaseMoves();
        nextPlayer(model);
    } else {
        for (let i = 0; i < model.players[model.currentPlayer].selectedPiece.shape.length; i++) {
            model.players[model.currentPlayer].selectedPiece.shape[i].shapeCoords[0] = pieceMem.shape[i].shapeCoords[0];
            model.players[model.currentPlayer].selectedPiece.shape[i].shapeCoords[1] = pieceMem.shape[i].shapeCoords[1];
        }
        
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