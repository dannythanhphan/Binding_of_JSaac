const express = require("express");
const Character = require("../../models/Character");
const User = require("../../models/User");
const validateCharacterCreation = require("../../validation/character_creation");
const router = express.Router();
const passport = require('passport');

router.post("/create", 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const { errors, isValid } = validateCharacterCreation(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        };

        const newCharacter = {
            name: req.body.name,
            characterSprite: req.body.characterSprite
        }

        User.findById(req.user.id).then(user => {
            user.characters.push(newCharacter)
            user.save().then(user => res.json(user))
        }).catch(err => res.json("Something went wrong"));
});

router.delete("/death/:id", 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findById(req.user.id).then(user => {
            user.characters = user.characters.filter(character => (
                character._id != req.params.id
            ));
            user.save().then(user => res.json(user))
        }).catch(err => res.json("Something went wrong"));
});

module.exports = router;