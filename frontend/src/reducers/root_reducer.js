import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import lobbiesReducer from './lobbies_reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    lobbies: lobbiesReducer,
    errors: errorsReducer
});


export default rootReducer;