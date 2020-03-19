import { RECEIVE_LOBBY, REMOVE_LOBBY } from "../actions/lobby_actions";

const floorsReducer = (state = {}, action) => {

    switch (action.type) {
        case RECEIVE_LOBBY:
            return action.floors;

        case REMOVE_LOBBY:
            return state;

        default:
            return state;
  }
};

export default floorsReducer;
