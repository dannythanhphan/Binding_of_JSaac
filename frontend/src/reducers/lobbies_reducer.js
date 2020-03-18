import {
    RECEIVE_LOBBY,
    REMOVE_LOBBY
} from '../actions/lobby_actions';

const initialState = {};

const lobbiesReducer = (state = initialState, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        // case RECEIVE_LOBBY:

        // case REMOVE_CHARACTER:
    
        default:
            return state;
    }
};

export default lobbiesReducer;