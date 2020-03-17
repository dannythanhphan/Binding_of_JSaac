import * as APIUtil from '../util/character_api_util';

export const RECEIVE_CHARACTER = 'RECEIVE_CHARACTER';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';

export const receiveCharacter = character => ({
    type: RECEIVE_CHARACTER,
    character
});

export const receiveCharacters = characters => ({
    type: RECEIVE_CHARACTERS,
    characters
});

export const removeCharacter = id => ({
    type: REMOVE_CHARACTER,
    id
});

export const fetchCharacters = userId => dispatch => (
    APIUtil.getCharacters(userId)
    .then(characters => dispatch(receiveCharacters(characters)))
);

export const fetchCharacter = id => dispatch => (
    APIUtil.getCharacter(id)
    .then(character => dispatch(receiveCharacter(character)))
);

export const createCharacter = character => dispatch => (
    APIUtil.createCharacter(character)
    .then(character => dispatch(receiveCharacter(character)))
);

export const deleteCharacter = id => dispatch => (
    APIUtil.deleteCharacter(id)
    .then(() => dispatch(removeCharacter(id)))
);