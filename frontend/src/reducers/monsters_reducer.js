import { RECEIVE_LOBBY, REMOVE_LOBBY } from "../actions/lobby_actions";

const monstersReducer = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.payload.monsters;

        case REMOVE_LOBBY:
            return state;

        default:
            return state;
  }
};

export default monstersReducer;
