import { combineReducers } from 'redux';

import charactersReducer from './characters_reducer';
import lobbyReducer from './lobby_reducer';
import usersReducer from './users_reducer';
import floorsReducer from "./floors_reducer";
import roomsReducer from "./rooms_reducer";
import monstersReducer from "./monsters_reducer";
import trapsReducer from "./traps_reducer";
import locationsReducer from "./locations_reducer";
import exitsReducer from "./exits_reducer";
import scoreReducer from "./score_reducer";

export default combineReducers({
    users: usersReducer,
    characters: charactersReducer,
    lobby: lobbyReducer,
    floors: floorsReducer,
    rooms: roomsReducer,
    monsters: monstersReducer,
    traps: trapsReducer,
    locations: locationsReducer,
    exits: exitsReducer,
    score: scoreReducer
});
