import { combineReducers } from 'redux';
import alert from './alert_reducer';
import chess from './chess_reducer';

export default combineReducers({
  alert,
  chess
});