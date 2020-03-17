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
                    owner: req.user.id,
                    active: true
                });
                newLobby.save().then(lobby => res.json(lobby)).catch(err=>console.log(err));
            }
        });
    }
);


// router.post("/join", (req, res) => {
//     const { errors, isValid } = validateLoginInput(req.body);

//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const username = req.body.username;
//     const password = req.body.password;

//     User.findOne({ username }).then(user => {
//         if (!user) {
//             errors.username = "User not found";
//             return res.status(404).json(errors);
//         }

//         bcrypt.compare(password, user.password).then(isMatch => {
//             if (isMatch) {
//                 const payload = { id: user.id, handle: user.handle };
//                 jwt.sign(
//                     payload,
//                     keys.secretOrKey,
//                     { expiresIn: 3600 },
//                     (err, token) => {
//                         res.json({
//                             success: true,
//                             token: "Bearer " + token
//                         });
//                     }
//                 );
//             } else {
//                 errors.password = "Incorrect password";
//                 return res.status(400).json(errors);
//             }
//         });
//     });
// });

// router.get("/current", passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         res.json({
//             id: req.user.id,
//             username: req.user.username,
//         });
//     }
// );

module.exports = router;
