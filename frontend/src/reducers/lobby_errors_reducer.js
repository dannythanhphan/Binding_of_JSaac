import { RECEIVE_LOBBY_ERRORS, RECEIVE_LOBBY } from '../actions/lobby_actions';
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const lobbyErrorsReducer = (state= [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LOBBY_ERRORS:
            return action.errors;

        case RECEIVE_LOBBY:
            return [];

        case RECEIVE_USER_LOGOUT:
            return [];

        default:
            return state;
    }
};

export default lobbyErrorsReducer;