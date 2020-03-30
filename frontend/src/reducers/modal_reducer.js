import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
    modal: null
};

const modalReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case OPEN_MODAL:
            newState.modal = action.modal;
            return newState;

        case CLOSE_MODAL:
            return initialState;

        case RECEIVE_USER_LOGOUT:
            return {};
    
        default:
            return state;
    };
};
