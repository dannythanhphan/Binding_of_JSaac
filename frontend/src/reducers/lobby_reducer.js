import {
    RECEIVE_LOBBY,
    REMOVE_LOBBY
} from '../actions/lobby_actions';


const lobbyReducer = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.payload.lobby;

        case REMOVE_LOBBY:
            return state;
    
        default:
            return state;
    }
};

export default lobbyReducer;