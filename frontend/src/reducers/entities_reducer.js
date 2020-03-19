import { combineReducers } from 'redux';

import charactersReducer from './characters_reducer';
import lobbyReducer from './lobby_reducer';
import usersReducer from './users_reducer';

export default combineReducers({
    users: usersReducer,
    characters: charactersReducer,
    lobby: lobbyReducer
});