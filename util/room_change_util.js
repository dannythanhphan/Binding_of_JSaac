const buildLocationJson = (lobby, res) => {
    const payload = { locations: {} };
    lobby.locations.forEach(location => {
        payload.locations[location.character.toString()] = {
            character: location.character.toString(),
            floor: location.floor,
            room: location.room,
            xPos: location.xPos,
            yPos: location.yPos
        }
    });
    return res.json(payload);
}


module.exports = buildLocationJson;