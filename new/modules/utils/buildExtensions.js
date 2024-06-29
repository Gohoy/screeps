export const buildExtensions = function (roomName, terrain) {
    var xNice = 0;
    var yNice = -1;
    var room = Game.rooms[roomName];
    var spwans = room.find(FIND_MY_SPAWNS);
    if (!Memory.pos) {
        var pos = spwans[0].pos;
    } else {
        var pos = Memory.pos
    }
    var pos1 = {
        x: pos.x + xNice,
        y: pos.y + yNice
    };

    for (var j = 0; j < 50; j++) {
        if (room.createConstructionSite(pos1.x - 1, pos1.y, STRUCTURE_EXTENSION) == ERR_RCL_NOT_ENOUGH) {
            return
        }
        var count = 0;
        for (var i = 0; i < 50; i++) {
            if (terrain.get(pos1.x, pos1.y) != 0) {
                break;
            }
            count++;
            console.log(pos1.x + " " + pos1.y)
            room.createConstructionSite(pos1.x, pos1.y, STRUCTURE_ROAD);
            room.createConstructionSite(pos1.x - 1, pos1.y, STRUCTURE_EXTENSION);
            xNice -= 1;
            yNice -= 1;
            var pos1 = {
                x: pos.x + xNice,
                y: pos.y + yNice
            };
            if (count == 5) {
                break;
            }
            if ((new RoomPosition(pos1.x, pos1.y, roomName).look().length != 1)) {
                break
            }
        }

        xNice = 0 - j;
        yNice = -1 - j;
        pos1 = {
            x: pos.x + xNice - 1,
            y: pos.y + yNice + 1
        };
    }
    Memory.pos = pos1
}
