import React, { Component } from 'react';
import { coreChess } from '../_coreChess/coreChess';
import { connect } from 'react-redux';
import Chess from 'react-chess';

class ChessGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instialLineup: this.props.lineUp,
            instialColor: this.props.color,
            gameMessage: 'white should start'
        };
    }

    handleMovePiece = (piece, fromSquare, toSquare) => {
        if (this.props.chess.color === 'B') {
            var pcsNotation = piece.notation.split(/([0-9]+)/);
            var pcsPosition = piece.position.split(/([0-9]+)/);

            var from = fromSquare.split(/([0-9]+)/);
            var to = toSquare.split(/([0-9]+)/);
            fromSquare = from[0].concat(this.swapBoardNum(from[1]));
            toSquare = to[0].concat(this.swapBoardNum(to[1]));
            piece.notation = pcsNotation[0].concat(this.swapBoardNum(pcsNotation[1]));
            piece.position = pcsPosition[0].concat(this.swapBoardNum(pcsPosition[1]));
        }
        var isLegalMove = coreChess.move({ from: fromSquare, to: toSquare, promotion: 'q' });
        var pieceFromPostion = piece.name + '@' + fromSquare;
        var pieceToPostion = piece.name + '@' + toSquare;
        this.setState({ instialLineup: this.chessBoardPutPiece(pieceFromPostion, pieceToPostion) });
        if (isLegalMove) {
            var changePiece = this.state.instialLineup;
            switch (isLegalMove.flags) {
                case 'c':
                    changePiece.filter((item) => {
                        if (item.indexOf(toSquare) !== -1 && pieceToPostion !== item) {
                            changePiece = this.chessBoardReplacePiece(item, pieceToPostion);
                        }
                        return true;
                    });
                    break;
                case 'e':
                    var toSquareArray = toSquare.split(/([0-9]+)/);
                    var posNum = parseInt(toSquareArray[1], 10);
                    var pos = isLegalMove.color === 'b' ? posNum + 1 : posNum - 1;
                    var clearPos = toSquareArray[0].concat(pos);
                    changePiece.filter((item) => {
                        if (item.indexOf(clearPos) !== -1) {
                            changePiece.splice(this.state.instialLineup.indexOf(item), 1);
                        }
                        return true;
                    });
                    break;
                case 'np':
                    var newQueen = isLegalMove.san.split('=');
                    changePiece = changePiece.map((item) => {
                        return item === pieceToPostion ? newQueen[1] + '@' + newQueen[0] : item;
                    });
                    break;
                case 'cp':
                    changePiece.filter((item) => {
                        if (item.indexOf(toSquare) !== -1 && pieceToPostion !== item) {
                            changePiece = this.chessBoardReplacePiece(item, pieceToPostion);
                        }
                        return true;
                    });
                    var newQueenC = isLegalMove.san.split('=');
                    changePiece = changePiece.map((item) => {
                        return item === pieceToPostion ? newQueenC[1] + '@' + isLegalMove.to : item;
                    });
                    break;
                case 'k':
                    var kingPos = isLegalMove.to.split(/([0-9]+)/);
                    var rook = isLegalMove.color === 'w' ? 'R@' : 'r@';
                    var removeRookPos = rook + 'h' + kingPos[1];
                    var changeRookPos = rook + 'f' + kingPos[1];
                    changePiece = changePiece.map((item) => {
                        return item === removeRookPos ? changeRookPos : item;
                    });
                    break;
                case 'q':
                    var qKingPos = isLegalMove.to.split(/([0-9]+)/);
                    var qRook = isLegalMove.color === 'w' ? 'R@' : 'r@';
                    var qRemoveRookPos = qRook + 'a' + qKingPos[1];
                    var qChangeRookPos = qRook + 'd' + qKingPos[1];
                    changePiece = changePiece.map((item) => {
                        return item === qRemoveRookPos ? qChangeRookPos : item;
                    });
                    break;
                default:
                    console.log('flag ' + isLegalMove.flags);
            }
            console.log('flag ' + isLegalMove.flags);

            this.setState({ instialLineup: changePiece });
            this.props.updatePieces(changePiece);
        } else {
            var illegalMove = this.state.instialLineup.map((item) => {
                return item === pieceToPostion ? pieceFromPostion : item;
            });
            this.setState({ instialLineup: illegalMove });
        }
    }

    getPieceNotation = (position) => {
        var notation = false;
        this.state.instialLineup.filter((item) => {
            if (item.includes(position)) {
                notation = item;
            }
            return true;
        });
        return notation;
    }

    chessBoardRemovePiece = (pieceNotation) => {
        var remove = this.state.instialLineup;
        remove.splice(remove.indexOf(pieceNotation), 1);
        return remove;
    };

    chessBoardReplacePiece = (removePiece, replacePiece) => {
        var replace = this.state.instialLineup.map((item) => {
            return item === removePiece ? replacePiece : item;
        });
        //remove duplicate 
        replace.splice(replace.indexOf(replacePiece), 1);
        return replace;
    };

    chessBoardPutPiece = (pieceFromPostion, pieceToPostion) => {
        var currentMove = this.state.instialLineup.map((item) => {
            return item === pieceFromPostion ? pieceToPostion : item;
        });
        return currentMove;
    };

    swapBoardNum = (currnum) => {
        if (currnum > 4) {
            return (8 - currnum) + 1;
        } else {
            return (8 - currnum) + 1;
        }
    };

    onDragStart = (piece, fromSquare, toSquare)=>{
        if(coreChess.turn().toUpperCase() !== this.props.chess.color){
            return false;
        }
        if(coreChess.game_over()){
            this.setState({gameMessage: 'game over'});
            return false;
        }

        if(coreChess.in_draw()){
            this.setState({gameMessage: 'Draw'});
            return true;
        }

        if(coreChess.in_checkmate()){
            this.setState({gameMessage: 'Checkmate!'});
            return true;
        }

        if(coreChess.in_check()){
            this.setState({gameMessage: 'Check!'});
            return true;
        }

        if(coreChess.in_stalemate()){
            this.setState({gameMessage: 'Stalemate'});
            return true;
        }
        return false;
    }

    render() {
        console.log(coreChess.ascii());
        var lineUp = this.state.instialLineup;
        if (this.props.chess.color === 'B') {
            lineUp = lineUp.map((item) => {
                var currnPos = item.split(/([0-9]+)/);
                var currnum = parseInt(currnPos[1], 10)
                if (currnum > 4) {
                    return currnPos[0].concat((8 - currnum) + 1);
                } else {
                    return currnPos[0].concat((8 - currnum) + 1);
                }
            });
        }
        return (
            <center>
                <div>
                    <p>{this.state.gameMessage}</p>
                </div>
                <div style={{ width: '300px' }}>
                    <Chess
                        pieces={lineUp}
                        onMovePiece={this.handleMovePiece}
                        highlightTarget 
                        lightSquareColor = '#eef1f3'
                        darkSquareColor = '#799bbd'
                        onDragStart ={this.onDragStart}
                        />
                </div>
            </center>
        );
    }
}

function mapStateToProps(state) {
    const { chess } = state;
    return { chess };
}
export default connect(mapStateToProps)(ChessGame);