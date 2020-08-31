import { UPDATE_SCORE } from "../actions/score_actions";

const initialState = {
  value: 0
};

const scoreReducer = (state = initialState, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case UPDATE_SCORE:
          nextState.value = nextState.value + action.amount
          return nextState;
        default:
          return state;
  }
};

export default scoreReducer;
