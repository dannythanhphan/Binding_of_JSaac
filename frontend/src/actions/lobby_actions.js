import * as APIUtil from '../util/lobby_api_util';

export const RECEIVE_LOBBY = "RECEIVE_LOBBY";
export const REMOVE_LOBBY = "REMOVE_LOBBY";
export const RECEIVE_LOBBY_ERRORS = "RECEIVE_LOBBY_ERRORS";
export const START_LOADING_LOBBY = "START_LOADING_LOBBY"
export const START_REMOVING_LOBBY = "START_REMOVING_LOBBY"

export const startLoadingLobby = () => ({
    type: START_LOADING_LOBBY
});

export const startRemovingLobby = () => ({
    type: START_REMOVING_LOBBY
});

const io = require('socket.io-client');
const socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:5000');

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

export const leave = (id, charId) => dispatch => {
    window.socket.emit('leave', localStorage.lobbykey);
    localStorage.removeItem('lobbykey');
    localStorage.removeItem('lobbycharacter');
    return APIUtil.leave(id, charId)
        .then(
            res => {
                return dispatch(leaveLobby());
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};

export const join = (id, charId) => dispatch => {
    dispatch(startLoadingLobby());
    return APIUtil.join(id, charId)
        .then(
            res => { 
                console.log('emit join room')
                socket.emit('room', res.data.lobby.lobbykey);
                localStorage.setItem('lobbykey', res.data.lobby.lobbykey);
                localStorage.setItem('lobbycharacter', charId)

                socket.on('changeLobbyData', (data) => {
                    console.log('lobby data changed')
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
    dispatch(startLoadingLobby());
    return APIUtil.create(charId)
        .then(
            res => { 
                socket.emit('room', res.data.lobby.lobbykey);
                localStorage.setItem('lobbykey', res.data.lobby.lobbykey);
                localStorage.setItem('lobbycharacter', res.data.lobby.player1)

                // window.lobbykey = res.data.lobby.lobbykey

                socket.on('changeLobbyData', (data) => {
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
        return dispatch(receiveLobby(payload.data))
    })
    .catch(err => dispatch(receiveErrors(err.response.data)))
};
