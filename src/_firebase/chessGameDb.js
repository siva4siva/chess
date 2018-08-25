import { auth, db } from './firebase';
import { chessAction } from '../action/chess_action';



export const insertNewGame = (chessgame, dispatch) => {
    var currentUser = auth.currentUser;
    var dateTime = new Date();
    var game = {
        game_paired: false,
        game_over: false,
        pieces: chessgame.lineUp,
        white: currentUser.uid,
        black: '',
        turn: 'W',
        moved_piece: chessgame.piece,
        from_square: chessgame.fromSquare,
        to_square: chessgame.toSquare,
        started_at: dateTime.toDateString(),
        date: dateTime
    };
    return new Promise((resolve, reject) => {
        db.collection("chess").add(game)
            .then(function (docRef) {
                dispatch(chessAction.updateGmaeId(docRef.id));
                resolve(docRef);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const getAvailable = (dispatch) => {
    var dateTime = new Date();
    var availableGame = [];
    return new Promise((resolve, reject) => {
        db.collection("chess")
            .where("game_paired", "==", false)
            .where("started_at", "==", dateTime.toDateString())
            .get().then((querySnapshot) => {
                if(querySnapshot.empty){ 
                    resolve(false);
                }
                var i = 0;
                querySnapshot.forEach(function (doc) {
                    if(i === 0){
                        addBlackPlayer(doc.id,dispatch)
                    }
                    i++;
                    availableGame[doc.id] = doc.data();
                });
                resolve(availableGame);
            }).catch(function (error) {
                reject(error);
            });
    });
};

export const addBlackPlayer = (docId,dispatch)=>{
    var currentUser = auth.currentUser;
    db.collection("chess").doc(docId).update({
        game_paired: true,
        black: currentUser.uid
    }).then(function() {
        dispatch(chessAction.updateGmaeId(docId));
        dispatch(chessAction.setColorOriented('B'));
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
    
};