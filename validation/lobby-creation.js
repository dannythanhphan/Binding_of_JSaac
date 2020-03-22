const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLobbyCreationInput(data) {
    let errors = {};

    data.lobbyname = validText(data.lobbyname) ? data.lobbyname : "";

    if (!Validator.isLength(data.lobbyname, { min: 2, max: 30 })) {
        errors.handle = "lobbyname must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(data.lobbyname)) {
        errors.lobbyname = "lobbyname field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
