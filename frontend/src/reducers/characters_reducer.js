import {
    RECEIVE_NEW_CHARACTER,
    RECEIVE_MY_CHARACTERS,
    RECEIVE_GAME_CHARACTERS,
    REMOVE_CHARACTER
} from '../actions/character_actions';

const initialState = {
    myCharacters: {},
    gameCharacters: {}
};

const charactersReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_MY_CHARACTERS:
            newState['myCharacters'] = {};
            action.characters.data.forEach(character => (
                newState['myCharacters'][character._id] = character
            ))
            return newState;

        case RECEIVE_GAME_CHARACTERS:
            newState['gameCharacters'] = {};
            action.characters.data.forEach( character => (
                newState['gameCharacters'][character._id] = character
            ));
            return newState;

        case RECEIVE_NEW_CHARACTER:
            if (!newState['myCharacters'][action.character.data._id]) {
                newState['myCharacters'][action.character.data] = action.character;
            } 

            return newState;

        case REMOVE_CHARACTER:
            delete newState['myCharacters'][action.id]
            return newState;
    
        default:
            return state;
    }
};

export default charactersReducer;