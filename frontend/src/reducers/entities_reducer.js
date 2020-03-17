import { combineReducers } from 'redux';

import charactersReducer from './characters_reducer';
import lobbiesReducer from './lobbies_reducer';

export default combineReducers({
    characters: charactersReducer,
    lobbies: lobbiesReducer
});