import * as APIUtil from '../util/character_api_util';

export const RECEIVE_NEW_CHARACTER = 'RECEIVE_NEW_CHARACTER';
export const RECEIVE_MY_CHARACTERS = 'RECEIVE_MY_CHARACTERS';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const RECEIVE_GAME_CHARACTERS = "RECEIVE_GAME_CHARACTERS";

export const receiveCharacter = character => ({
    type: RECEIVE_NEW_CHARACTER,
    character
});

export const receiveMyCharacters = characters => ({
    type: RECEIVE_MY_CHARACTERS,
    characters
});

export const receiveGameCharacters = characters => ({
    type: RECEIVE_GAME_CHARACTERS,
    characters
});

export const removeCharacter = id => ({
    type: REMOVE_CHARACTER,
    id
});

export const fetchMyCharacters = userId => dispatch => (
    APIUtil.getMyCharacters(userId)
    .then(characters => dispatch(receiveMyCharacters(characters)))
);

export const fetchGameCharacters = lobbyId => dispatch => (
    APIUtil.getGameCharacters(lobbyId)
    .then(characters => dispatch(receiveGameCharacters(characters)))
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