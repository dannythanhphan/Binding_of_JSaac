const express = require("express");
const Lobby = require('../../models/Lobby');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.patch("/:lobbykey/:characterId/:floor/:room", (req, res) => {
    Lobby.update({
        "lobbykey": req.params.lobbykey
    },
    {
        $set: {
            "locations.$[char].floor": req.params.floor,
            "locations.$[char].room": req.params.room
        }
    },
    { 
        arrayFilters: [{ "char.character": new ObjectId(req.params.characterId) }]
    })
    .then(() => res.json({ positionUpdate: "Position updated" }))
    .catch(err => { res.status(404), json("Position update failed") })
});

module.exports = router;