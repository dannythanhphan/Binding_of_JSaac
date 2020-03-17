import {
    RECEIVE_CHARACTER,
    RECEIVE_CHARACTERS,
    REMOVE_CHARACTER
} from '../actions/character_actions';

const initialState = {};

const charactersReducer = (state = initialState, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CHARACTERS:
            Object.keys(action.characters)
            .forEach(character => (
                newState[character._id] = character
            ))
            return newState;

        case RECEIVE_CHARACTER:
            newState[action.character._id] = action.character;
            return newState;

        case REMOVE_CHARACTER:
            delete newState[action.id]
            return newState;
    
        default:
            return state;
    }
};

export default charactersReducer;