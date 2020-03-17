import axios from 'axios';

export const getCharacter = id => (
    axios.get(`/api/characters/${id}`)
);

export const getCharacters = userId => (
    axios.get(`/api/characters/${userId}`)
);

export const createCharacter = data => (
    axios.post('/api/characters/create', data)
);

export const deleteCharacter = id => (
    axios.delete(`/api/characters/death/${id}`)
);