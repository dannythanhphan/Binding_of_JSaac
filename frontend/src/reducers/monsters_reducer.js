import { RECEIVE_LOBBY, REMOVE_LOBBY } from "../actions/lobby_actions";
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const monstersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.payload.monsters;

        case REMOVE_LOBBY:
            return {};

        case RECEIVE_USER_LOGOUT:
            return {}; 

        default:
            return state;
  }
};

export default monstersReducer;
