import axios from 'axios';

export const getCharacter = id => (
    axios.get(`/api/characters/${id}`)
);

export const getMyCharacters = userId => (
    axios.get(`/api/characters/user/${userId}`)
);

export const getGameCharacters = lobbykey => (
    axios.get(`/api/characters/lobby/${lobbykey}`)
);

export const createCharacter = data => (
    axios.post('/api/characters/create', data)
);

export const deleteCharacter = id => (
    axios.delete(`/api/characters/death/${id}`)
);