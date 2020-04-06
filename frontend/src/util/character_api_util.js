import axios from 'axios';

export const createCharacter = data => (
    axios.post('/api/characters/create', data)
);

export const deleteCharacter = id => (
    axios.delete(`/api/characters/death/${id}`)
);

export const updateCharacter = character => (
    axios.patch(`/api/characters/update/${character.id}`, character)
)