const User = require('../../models/User');

const buildLobbyJson = lobby => {
    const payload = { users: {}, characters: {}, lobby };
    User.find({ "characters.id": { $in: [lobby.player1, lobby.player2] } })
    .then(users => {
        users = users.filter(user => user.characters.length > 0);
        users.forEach(user => {
            payload.users[user.id] = {
                username: user.username,
                id: user.id
            };
            user.characters.forEach(character => {
                payload.characters[character.id] = character
            });
        })
        console.log('build', payload.users);
        return payload;
    })
    .catch(err => console.log(err))
};

module.exports = buildLobbyJson;