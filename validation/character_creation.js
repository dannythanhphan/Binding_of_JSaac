const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateCharacterCreation(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : '';

    if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = "Character name must be between 3 and 30 characters";
    };

    if (Validator.isEmpty(data.name)) {
        errors.name = "Character name is required";
    };

    return {
        errors,
        isValid: Object.kets(errors).length === 0
    };
};