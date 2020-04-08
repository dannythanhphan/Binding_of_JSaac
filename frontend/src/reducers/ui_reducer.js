import { RECEIVE_LOBBY, RECEIVE_LOBBY_ERRORS, REMOVE_LOBBY,
    START_LOADING_LOBBY, START_REMOVING_LOBBY } from '../actions/lobby_actions';

const trapsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {

        case RECEIVE_LOBBY:
            return {loading: false};

        case RECEIVE_LOBBY_ERRORS:
            return {loading: false};

        case REMOVE_LOBBY: 
            return {leaving: false};

        case START_REMOVING_LOBBY:
            return {leaving: true};

        case START_LOADING_LOBBY:
            return {loading: true};

        default:
            return state;
    }
};

export default trapsReducer;
