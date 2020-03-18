import * as APIUtil from '../util/lobby_api_util';
import jwt_decode from 'jwt-decode';
import openSocket from 'socket.io-client';

export const RECEIVE_LOBBY = "RECEIVE_LOBBY";
export const REMOVE_LOBBY = "REMOVE_LOBBY";
export const RECEIVE_LOBBY_ERRORS = "RECEIVE_LOBBY_ERRORS";

export const leaveLobby = () => ({
    type: REMOVE_LOBBY
});

export const receiveLobby = lobby => {
    return {
    type: RECEIVE_LOBBY,
    lobby
}};

export const receiveErrors = errors => ({
    type: RECEIVE_LOBBY_ERRORS,
    errors
});

export const leave = (id) => dispatch => {
    APIUtil.leave(id)
        .then(
            res => { 
                dispatch(leaveLobby());
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};

export const join = (id) => dispatch => {
    APIUtil.join(id)
        .then(
            res => { 
                const socket = openSocket("http://localhost:8000/lobby");
                socket.on('connect', () => {
                    socket.emit('room', res.data.lobbykey);
                })
                socket.on('changeLobbyData', (data) => {
                    console.log("Incoming message: ", data);
                })
                dispatch(receiveLobby(res));
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};

export const create = () => dispatch => {
    APIUtil.create()
        .then(
            res => { 
                const socket = openSocket("http://localhost:8000/lobby");

                socket.on('connect', () => {
                    socket.emit('room', res.data.lobbykey);
                })
                socket.on('changeLobbyData', (data) => {
                    console.log("Incoming message: ", data);
                })
                dispatch(receiveLobby(res.data));
            }
        )
        .catch(
            err => dispatch(receiveErrors(err.response.data))
        )
};
