import * as APIUtil from '../util/room_api_util';

export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const MOVING_ROOMS = "MOVING_ROOMS";
export const updateLocation = payload => {
    return {
    type: UPDATE_LOCATION,
    payload
}};

export const movingRooms = () => ({
    type: MOVING_ROOMS
})

export const moveRoom = (key, charId, floor, room) => (dispatch) => {
    dispatch(movingRooms());
    APIUtil.changeLocation(key, charId, floor, room)
        .then(payload => dispatch(updateLocation(payload.data)))
};
