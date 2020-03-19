const express = require("express");
const Lobby = require('../../models/Lobby');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.delete("/death/:id", (req, res) => {
    Lobby.update({
        "dungeon.floors.rooms.monsters._id": new ObjectId(req.params.id)}, 
        {$pull : {
            "dungeon.floors.$[].rooms.$[].monsters": 
            { "_id": new ObjectId(req.params.id)} } } )
    .then(() => res.json({ dedMonster: "Monster has died." }))
    .catch(err => {res.status(404), json("Monster deletion failed")})
});

router.get("/:id", (req, res) => {
    Lobby.find({
        "dungeon.floors.rooms.monsters._id": new ObjectId(req.params.id)})
    .then((monster) => res.json(monster))
    .catch(err => {
        return res.status(400).json("Error getting monster");
    })
});

module.exports = router;