import * as APIUtil from '../util/lobby_api_util';

export const RECEIVE_LOBBY = "RECEIVE_LOBBY";
export const REMOVE_LOBBY = "REMOVE_LOBBY";
export const RECEIVE_LOBBY_ERRORS = "RECEIVE_LOBBY_ERRORS";

export const leaveLobby = () => ({
    type: REMOVE_LOBBY
});

export const receiveLobby = payload => {
    return {
    type: RECEIVE_LOBBY,
    payload
}};

export const receiveErrors = errors => ({
    type: RECEIVE_LOBBY_ERRORS,
    errors
});

export const leave = (id) => dispatch => {
    APIUtil.leave(id)
        .then(
            res => {
                window.socket.emit('leave', res.data.lobbykey);
                dispatch(leaveLobby());
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};

export const join = (id, charId) => dispatch => {
    return APIUtil.join(id, charId)
        .then(
            res => { 
                window.socket.emit('room', res.data.lobby.lobbykey);
                // window.lobbykey = res.data.lobbykey


                window.socket.on('changeLobbyData', (data) => {
                    return dispatch(retrieve(data.lobbykey));
                })
                return dispatch(receiveLobby(res.data));
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};

export const create = (charId) => dispatch => {
    return APIUtil.create(charId)
        .then(
            res => { 
                window.socket.emit('room', res.data.lobby.lobbykey);
                // window.lobbykey = res.data.lobby.lobbykey

                window.socket.on('changeLobbyData', (data) => {
                    console.log("socket receives signal to retrieve")
                    return dispatch(retrieve(data.lobbykey));
                })
                return dispatch(receiveLobby(res.data));
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};

export const retrieve = key => dispatch => {
    return APIUtil.getLobby(key)
    .then(payload => {
        console.log(payload.data.lobby)
        return dispatch(receiveLobby(payload.data))
    })
    .catch(err => dispatch(receiveErrors(err.response.data)))
};
