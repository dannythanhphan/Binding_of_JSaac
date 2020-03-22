import * as APIUtil from '../util/character_api_util';

export const RECEIVE_NEW_CHARACTER = 'RECEIVE_NEW_CHARACTER';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const RECEIVE_GAME_CHARACTER = 'RECEIVE_GAME_CHARACTER';

export const receiveCharacter = character => ({
    type: RECEIVE_NEW_CHARACTER,
    character
});

export const removeCharacter = id => ({
    type: REMOVE_CHARACTER,
    id
});

export const receiveGameCharacter = character => ({
    type: RECEIVE_GAME_CHARACTER,
    character
});

export const createCharacter = character => dispatch => (
    APIUtil.createCharacter(character)
    .then(character => dispatch(receiveCharacter(character)))
);

export const deleteCharacter = id => dispatch => (
    APIUtil.deleteCharacter(id)
    .then(() => dispatch(removeCharacter(id)))
);