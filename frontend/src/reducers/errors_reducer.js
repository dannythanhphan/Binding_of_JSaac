import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import lobbyErrorsReducer from './lobby_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    lobbies: lobbyErrorsReducer
});