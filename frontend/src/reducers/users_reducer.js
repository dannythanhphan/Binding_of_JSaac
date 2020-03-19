import {
    RECEIVE_LOBBY,
    REMOVE_LOBBY
} from '../actions/lobby_actions';
import { RECIEVE_USER } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECIEVE_USER:
            newState[action.payload.user.id] = action.payload.user;
            return newState;
            
        case RECEIVE_LOBBY:
            action.payload.users.forEach(user => {
                newState[user.id] = user
            });
            return newState;
    
        case REMOVE_LOBBY:
            return {};

        default:
            return state;
    }
};

export default usersReducer;