import { RECEIVE_LOBBY, REMOVE_LOBBY } from "../actions/lobby_actions";
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';
import { UPDATE_LOCATION } from '../actions/room_actions';

const locationsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.payload.locations;
<<<<<<< HEAD
=======

        case UPDATE_LOCATION:
            return action.payload.locations;

>>>>>>> 7191b322f219cd191fdc86c0be686079b607649f
        case REMOVE_LOBBY:
            return {};

        case RECEIVE_USER_LOGOUT:
            return {};
        case UPDATE_LOCATION:
            nextState[action.charId].room = action.room
            return nextState;
        default:
            return state;
  }
};

export default locationsReducer;
