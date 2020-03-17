import { combineReducers } from 'redux';

import charactersReducer from './characters_reducer';

export default combineReducers({
    characters: charactersReducer,
});