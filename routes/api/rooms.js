const express = require("express");
const Lobby = require('../../models/Lobby');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const buildLocationJson = require('../../util/room_change_util');


router.patch("/:lobbykey/:characterId/:floor/:room", (req, res) => {
    Lobby.findOneAndUpdate({
        "lobbykey": req.params.lobbykey
    },
    {
        $set: {
            "locations.$[char].floor": req.params.floor,
            "locations.$[char].room": req.params.room
        }
    },
    { 
        new: true,
        useFindAndModify: false,
        arrayFilters: [{ "char.character": new ObjectId(req.params.characterId) }]
    })
    .then(lobby => buildLocationJson(lobby, res))
    .catch(err => { res.status(404), json("Position update failed") })
});

module.exports = router;