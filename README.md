# Binding of JSaac
![](intro.jpg)
## Background
Binding of Jsaac is a co-op roguelike game. Roguelike is defined as a subgenre of role-playing video game characterized by a dungeon crawl through procedurally generated levels, tile-based graphics, and permanent death of the player character. (Roguelike wikipedia). The players will be able to save and reload all of their data such as gears, dungeon level, and character stats. Binding of Jsaac will use the following technology stack: MongoDB, Express, React, and Node.js.

## How to Play
When the user connects to the website, they are prompted to either log-in or create an account. Once they are authenticated, they can either choose an existing character or make a new character at level 1. Once they have selected a character, they will be prompted to either create a new lobby, join a lobby with a code or join from a previous session. Lobbies are limited to 2 players max. The player can then choose to either start the game solo or wait until the lobby is full, then start the game.

Inside the game, the player and their partner are placed in a room in the first floor of a procedurally generated dungeon. The win condition would be to travel through each room on the floor and killing all of the monsters.

Each character starts off with 100 hit points (HP). Once they take more than 100 points of damage, their character dies and they must restart the game. Characters take damage if they get hit by a monster or run into a floor trap. If a character kills a monster, they gain experience points.

## Technologies
* Frontend
  * React.js
  * Redux.js
  * React Konva
* Backend
  * Express.js
  * MongoDB
  * Node.js
  
## Features

### 2D Sprite and Rendering
All of the 2D sprite and rendering was done using a library called React Konva. We were able to modify the sprites frame by frame by using React Konva's Sprite class in conjunction with keypress movement to change the animation of the sprites.

### Lobby Creation
Our lobby creation uses an API call with Express to generate a key and create the lobby and dungeon in the database.
```javascript
router.post("/create/:characterId", 
  passport.authenticate('jwt', { session: false }), (req, res) => {
    let lobbykey = generateKey(6);
    Lobby.findOne({ lobbykey: lobbykey }).then(lobby => {
      if (lobby) {
        lobbykey = generateKey(6);
      }
      const newLobby = new Lobby({
        lobbykey: lobbykey,
        player1: req.params.characterId,
        active: true,
        dungeon: generateDungeon()
      });
      newLobby.locations.push({character: req.params.characterId});
      newLobby.save()
        .then(lobby => buildLobbyJson(lobby, res))
        .catch(err => console.log(err));
      });
    }
  );
```

### Joining Lobbies
The game uses Socket.IO's rooms to allow other players to join into the same lobby to play in the same dungeon
```javascript
export const join = (id, charId) => dispatch => {
  dispatch(startLoadingLobby());
  return APIUtil.join(id, charId)
    .then(
      res => { 
        window.socket = socket;
        socket.emit('room', res.data.lobby.lobbykey);
        localStorage.setItem('lobbykey', res.data.lobby.lobbykey);
        localStorage.setItem('lobbycharacter', charId)

        socket.on('changeLobbyData', (data) => {
          return dispatch(retrieve(data.lobbykey));
        })
        return dispatch(receiveLobby(res.data));
      }
    )
    .catch(
      err => dispatch(receiveErrors(err.response.data))
    )
};
```
### Multiplayer
The game state of both players are synchronized by utilizing Socket.IO's broadcasting and React's local state.
```javascript
this.interval = setInterval(() => {
  window.socket.emit("dungeonRefresh", 
    {
      room: localStorage.lobbykey, 
      char: this.state.currentCharacter,
      monsters: this.state.monsters
    });
}, 1000 / 30)
```


## Planned Changes for the future
* Removal of MongoDB Change Streams and only use Socket.IO
* Modify lobbies to be an owner and guest instead of player1 and player2 for better synchronization
* Add more floors to dungeon

