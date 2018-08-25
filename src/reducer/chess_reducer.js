export default function chess(state = {
  lineup: ['R@a1', 'N@b1', 'B@c1', 'Q@d1', 'K@e1', 'B@f1', 'N@g1', 'R@h1',
    'P@a2', 'P@b2', 'P@c2', 'P@d2', 'P@e2', 'P@f2', 'P@g2', 'P@h2',
    'r@a8', 'n@b8', 'b@c8', 'q@d8', 'k@e8', 'b@f8', 'n@g8', 'r@h8',
    'p@a7', 'p@b7', 'p@c7', 'p@d7', 'p@e7', 'p@f7', 'p@g7', 'p@h7'
  ],
  color: 'W',
  gameId:''
}, action) {
  switch (action.type) {
    case 'UPDATE_PIECES':
      return {
        ...state,
        type: 'piece_update',
        lineup: action.piecesInArray
      };
    case 'SET_COLOR_ORIENTED':
      return {
        ...state,
        type: 'set_color_oriented',
        color: action.pieceColor
      };
    case 'CHESS_DOC_ID':
    return {
      ...state,
      type: 'chess_doc_id',
      gameId: action.ChessDocId
    };
    default:
      return state;
  }
}