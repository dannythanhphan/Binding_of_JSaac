import * as APIUtil from '../util/room_api_util';

export const UPDATE_LOCATION = "UPDATE_LOCATION";

export const updateLocation = (room, floor, charId) => {
    return {
    type: UPDATE_LOCATION,
    room,
    floor,
    charId
}};



export const moveRoom = (key, charId, floor, room) => (dispatch) => {
    APIUtil.changeLocation(key, charId, floor, room);
    dispatch(updateLocation(room, floor, charId));
};
