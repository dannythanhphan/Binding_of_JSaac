import {
    RECEIVE_LOBBY,
    REMOVE_LOBBY
} from '../actions/lobby_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_LOBBY:
            action.payload.users.forEach(user => {
                newState[user.id] = user
            });
            return newState;
    
        case REMOVE_LOBBY:
            return {};
            
        default:
            break;
    }
}