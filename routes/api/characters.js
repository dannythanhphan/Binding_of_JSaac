const express = require("express");
const Character = require("../../models/Character");
const validateCharactcerCreation = require("../../validation/character_creation");
const router = express.Router();
const passport = require('passport');

router.get('/user/:id', (req, res) => {
    Character.find({user: req.params.id})
    .then(characters => res.json(characters))
    .catch(err => res.status(404).json({ noCharacters: "No characters found." }));
});

router.get('/:id', (req, res) => {
    Character.findById(req.params.id)
    .then(character => res.json(character))
    .catch(err => res.status(404).json({ noCharacter: "No character found."}))
})

router.post("/create", 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const { errors, isValid } = validateCharactcerCreation(req.body);

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
        dedCharacter = Chracter.findById(req.params.id);
        dedCharacter.destroy()
        .then(() => res.json({ dedCharacter: "Character has died." }))
        .catch(err => {
            errors.creation = "Something went wrong.";
            return res.status(400).json(errors);
        })
});

module.exports = router;