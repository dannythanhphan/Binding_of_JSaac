class Room {
    constructor(selfId, leftId, rightId, topId, bottomId, numMonsters ) {
        const TILE_SIZE = 100;
        const NUM_TILES_WIDTH = 17;
        const NUM_TILES_HEIGHT = 11;
        const ROOM_WIDTH = TILE_SIZE * NUM_TILE_WIDTH;
        const ROOM_HEIGHT = TILE_SIZE * NUM_TILE_HEIGHT;


        this.roomWidth = ROOM_WIDTH;
        this.roomHeight = ROOM_HEIGHT;
        this.id = selfId;
        this.leftId = leftId;
        this.rightId = rightId;
        this.topId = topId;
        this.bottomId = bottomId;




    }

}