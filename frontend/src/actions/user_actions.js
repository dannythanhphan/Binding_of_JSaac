import * as APIUtil from '../util/session_api_util';

export const RECIEVE_USER = 'RECIEVE_USER';

export const receiveUser = payload => ({
    type: RECIEVE_USER,
    payload
});

// only fetches the current user, we'll have to refactor if we want user lookup
export const fetchCurrentUser = () => dispatch => (
    APIUtil.current()
    .then(payload => dispatch(receiveUser(payload.data)))
); 