import {
    RECEIVE_NEW_CHARACTER,
    REMOVE_CHARACTER
} from '../actions/character_actions';
import {
    RECEIVE_LOBBY,
    REMOVE_LOBBY
} from '../actions/lobby_actions';
import { RECIEVE_USER } from '../actions/user_actions';
import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
    myCharacters: {},
    gameCharacters: {}
};

const charactersReducer = (state = initialState, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECIEVE_USER:
            newState['myCharacters'] = action.payload.characters;
            return newState;

        case RECEIVE_NEW_CHARACTER:
            newState['myCharacters'][action.character._id] = action.character;
            return newState;

        case REMOVE_CHARACTER:
            delete newState['myCharacters'][action.id]
            return newState;

        case RECEIVE_LOBBY:
            action.payload.characters.forEach(character => {
                newState['gameCharacters'][character.id] = character;
            });
            return newState;

        case REMOVE_LOBBY:
            newState['gameCharacters'] = {};
            return newState;

        case RECEIVE_USER_LOGOUT:
            return initialState;
    
        default:
            return state;
    }
};

export default charactersReducer;