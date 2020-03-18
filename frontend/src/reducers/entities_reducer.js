import { combineReducers } from 'redux';

import charactersReducer from './characters_reducer';
import lobbyReducer from './lobby_reducer';

export default combineReducers({
    characters: charactersReducer,
    lobby: lobbyReducer
});