import * as APIUtil from '../util/character_api_util';

export const RECEIVE_CHARACTER = 'RECEIVE_NEW_CHARACTER';
export const RECEIVE_CHARACTERS = 'RECEIVE_CHARACTERS';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const RECEIVE_GAME_CHARACTER = 'RECEIVE_GAME_CHARACTER';
export const UPDATE_HP = "UPDATE_HP";

export const receiveCharacter = payload => ({
    type: RECEIVE_CHARACTER,
    payload
});

export const updateHP = (charId, hp) => ({
    type: UPDATE_HP,
    charId,
    hp
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
    .then(payload => dispatch(receiveCharacter(payload.data)))
);

export const updateCharacter = character => dispatch => (
    APIUtil.updateCharacter(character)
    .then(payload => dispatch(receiveCharacter(payload.data)))
);

export const deleteCharacter = id => dispatch => (
    APIUtil.deleteCharacter(id)
    .then(() => dispatch(removeCharacter(id)))
);