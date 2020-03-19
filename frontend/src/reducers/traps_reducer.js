import { RECEIVE_LOBBY, REMOVE_LOBBY } from "../actions/lobby_actions";

const trapsReducer = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.traps;

        case REMOVE_LOBBY:
            return state;

        default:
            return state;
  }
};

export default trapsReducer;
