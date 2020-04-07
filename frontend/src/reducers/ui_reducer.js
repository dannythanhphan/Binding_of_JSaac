import { RECEIVE_LOBBY, RECEIVE_LOBBY_ERRORS, REMOVE_LOBBY,
    START_LOADING_LOBBY, START_REMOVING_LOBBY } from '../actions/lobby_actions';
<<<<<<< HEAD
=======
import { UPDATE_LOCATION } from '../actions/room_actions';
>>>>>>> 8219f2b2998cb0c794d8e51daa22e3c758524b20

const trapsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
<<<<<<< HEAD
=======

        case UPDATE_LOCATION:
            console.log("???")
            return {moving: false}

>>>>>>> 8219f2b2998cb0c794d8e51daa22e3c758524b20
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
