export const chessAction = {
    updatePieces,
    setColorOriented,
    updateGmaeId
};
 
function updatePieces(piecesInArray) {
    return { type: 'UPDATE_PIECES', piecesInArray };
}
 
function setColorOriented(pieceColor) {
    return { type: 'SET_COLOR_ORIENTED', pieceColor };
}

function updateGmaeId(ChessDocId) {
    return { type: 'CHESS_DOC_ID', ChessDocId };
}