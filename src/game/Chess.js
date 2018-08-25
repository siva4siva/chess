import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chessAction } from '../action/chess_action';
import ChessGame from './ChessGame';
import { insertNewGame, getAvailable } from '../_firebase/chessGameDb';

class Chess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineUp: this.props.chess.lineup,
            color: this.props.chess.color,
            startGame: false
        };
    }

    updatePieces = (lineUp) => {
        this.props.dispatch(chessAction.updatePieces(lineUp));
    }

    changeColor = () => {
        var changeColor = this.props.chess.color === 'W' ? 'B' : 'W';
        this.props.dispatch(chessAction.setColorOriented(changeColor));
    }

    startGame = () => {
        getAvailable(this.props.dispatch).then((availableGame) => {
            console.log(availableGame);
            if(availableGame){
                this.setState({ startGame: true });
            }else{
                var chessgame = {
                    lineUp: this.state.lineUp,
                    piece: '',
                    fromSquare: '',
                    toSquare: ''
                }
                insertNewGame(chessgame, this.props.dispatch).then((docRef) => {
                    console.log(docRef.id);
                    this.setState({ startGame: true });
                }).catch((error) => {
                    console.log(error);
                });
            }
        }).catch();
    }

        render() {
            return (
                <div>
                    {!this.state.startGame ?
                        (<input type="button" value="start" onClick={this.startGame} />)
                        :
                        (<ChessGame
                            lineUp={this.state.lineUp}
                            color={this.state.color}
                            updatePieces={(lineUp) => { this.updatePieces(lineUp) }}
                            changeColor={this.changeColor}
                        />)
                    }
                </div>);
        }
    }

function mapStateToProps(state) {
    const { alert, chess } = state;
    return { alert, chess };
}

export default connect(mapStateToProps)(Chess);