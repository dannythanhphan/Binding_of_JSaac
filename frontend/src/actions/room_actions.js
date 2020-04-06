import * as APIUtil from '../util/room_api_util';

export const RECEIVE_LOBBY = "RECEIVE_LOBBY";

export const receiveLobby = payload => {
    return {
    type: RECEIVE_LOBBY,
    payload
}};

export const moveRoom = (key, charId, floor, room) => (dispatch) => {(
    APIUtil.changeLocation(key, charId, floor, room)
        .then(payload => dispatch(receiveLobby(payload.data)))
)};
