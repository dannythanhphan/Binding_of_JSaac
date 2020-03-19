const express = require("express");
const bcrypt = require("bcryptjs");
// const User = require("../../models/User");
const Lobby = require("../../models/Lobby");
const validateLobbyCreationInput = require("../../validation/lobby-creation");
const generateKey = require('../../util');

const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const router = express.Router();
const io = require('socket.io')();

router.post("/create", 
    passport.authenticate('jwt', { session: false }), (req, res) => {

        let lobbykey = generateKey(6);

        Lobby.findOne({ lobbykey: lobbykey }).then(lobby => {
            if (lobby) {
                lobbykey = generateKey(6);
            }
            else {
                const newLobby = new Lobby({
                    lobbykey: lobbykey,
                    player1: req.user.id,
                    active: true
                });
                newLobby.save().then(lobby => {
                    res.json(lobby) })
                    .catch(err => console.log(err));
            }
        });
    }
);

router.patch("/join/:id", 
    passport.authenticate('jwt', { session: false }), (req, res) => {

    Lobby.findOne({lobbykey: req.params.id})
        .then(lobby => {
            if (lobby.player1 && lobby.player2) {
                return res.status(400).json({lobbyfull: 'This lobby is full!'})
            }
            else {
                if (lobby.player1 && lobby.player1.toString() !== req.params.id) {
                    Lobby.findOneAndUpdate(
                        { lobbykey: req.params.id},
                        {
                            $set: { player2: req.user.id },
                            $currentDate: { lastModified: true }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }
                    )
                    .then( lobby => res.json(lobby) )
                    .catch( err => console.log(err) );
                }
                else if (lobby.player2 && lobby.player2.toString() !== req.params.id) {
                    Lobby.findOneAndUpdate(
                        { lobbykey: req.params.id},
                        {
                            $set: { player1: req.user.id },
                            $currentDate: { lastModified: true }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }                    )
                    .then( lobby => res.json(lobby) )
                    .catch( err => console.log(err) );
                }
            }
        })
        .catch(err => res.status(404).json({
            nolobbiesfound: 'No lobbies with this key exist!' }));
});

router.patch("/leave/:id",
    passport.authenticate('jwt', { session: false }), (req, res) => {
    
    Lobby.findOne({lobbykey: req.params.id})
        .then(lobby => {
            if (lobby.player1 && lobby.player1.toString() === req.user.id) {
                    Lobby.findOneAndUpdate(
                        { lobbykey: req.params.id},
                        {
                            $unset: { player1: "" },
                            $currentDate: { lastModified: true }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }                    )
                    .then( lobby => res.json(lobby) )
                    .catch( err => console.log(err) );
            }
            else if (lobby.player2 && lobby.player2.toString() === req.user.id) {
                    Lobby.findOneAndUpdate(
                        { lobbykey: req.params.id},
                        {
                            $unset: { player2: "" },
                            $currentDate: { lastModified: true }
                        },
                        {
                            new: true,
                            useFindAndModify: false
                        }                    )
                    .then( lobby => res.json(lobby) )
                    .catch( err => console.log(err) );
            }
            else {
                return res.status(400).json({ nothing: 'This lobby does not contain this player' })
            }
        })
        .catch(err => res.status(404).json({
            nolobbiesfound: 'No lobbies with this key exist!' }));    
});


module.exports = router;
