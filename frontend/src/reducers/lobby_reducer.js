import {
    RECEIVE_LOBBY,
    REMOVE_LOBBY
} from '../actions/lobby_actions';

const initialState = {};

const lobbyReducer = (state = initialState, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.lobby;

        case REMOVE_LOBBY:
            return initialState;
    
        default:
            return state;
    }
};

export default lobbyReducer;