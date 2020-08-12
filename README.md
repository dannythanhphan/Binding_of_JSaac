# Binding of JSaac
## Technologies
* Frontend
  * React.js
  * Redux.js
  * React Konva
* Backend
  * Express.js
  * MongoDB
  * Node.js
### First Iteration
* Usage of Change Streams causes unintended glitches in game when saving to database
* Currently unable to save game state
### Planned Changes for second iteration
* Removal of MongoDB Change Streams and only use Socket.IO
* Modify lobbies to be an owner and guest instead of player1 and player2
