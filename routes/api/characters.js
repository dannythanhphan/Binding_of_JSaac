const express = require("express");
const Character = require("../../models/Character");
const Lobby = require('../../models/Lobby');
const validateCharacterCreation = require("../../validation/character_creation");
const router = express.Router();
const passport = require('passport');

router.get('/user/:userId', (req, res) => {
    Character.find({user: req.params.userId})
    .then(characters => res.json(characters))
    .catch(err => res.status(404).json({ noCharacters: "No characters found." }));
});

router.get('/:id', (req, res) => {
    Character.findById(req.params.id)
    .then(character => res.json(character))
    .catch(err => res.status(404).json({ noCharacter: "No character found."}))
});

router.get('/lobby/:lobbyId', (req, res) => {
    Lobby.findById(req.params.lobbyId)
    .then(lobby =>
        Character.find({ _id: { $in: [lobby.player1, lobby.player2] } })
        .then(characters => res.json(characters))
        .catch(err => res.status(404).json("No characters in this lobby."))
    ).catch(err => res.status(404),json("Lobby does not exist"));
});

router.post("/create", 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const { errors, isValid } = validateCharacterCreation(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        };

        const newCharacter = new Character({
            name: req.body.name,
            user: req.user.id
        })

        newCharacter.save()
        .then(character => res.json(character))
        .catch(err => {
            errors.creation = "Something went wrong.";
            return res.status(400).json(errors);
        })
});

router.delete("/death/:id", 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        dedCharacter = Character.findById(req.params.id);
        dedCharacter.deleteOne()
        .then(() => res.json({ dedCharacter: "Character has died." }))
        .catch(err => {
            errors.creation = "Something went wrong.";
            return res.status(400).json(errors);
        })
});

module.exports = router;