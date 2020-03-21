import { RECEIVE_LOBBY_ERRORS, RECEIVE_LOBBY } from '../actions/lobby_actions';

const lobbyErrorsReducer = (state= [], action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_LOBBY_ERRORS:
            return action.errors;

        case RECEIVE_LOBBY:
            return [];

        default:
            return state;
    }
};

export default lobbyErrorsReducer;