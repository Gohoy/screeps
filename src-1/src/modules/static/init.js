export const init = function () {
    // 预置数
    const rooms = Memory.rooms;
    for (var roomName in rooms) {
        var structures = Memory.rooms[roomName].objects
        var room = Game.rooms[roomName]
        var minerals = room.find(FIND_MINERALS);
        structures.mineral0 = minerals[0].mineralType;
        if (!structures.source0) {
            var sources = room.find(FIND_SOURCES);
            structures.source0 = room.storage.pos.findClosestByRange(FIND_SOURCES).id;
            if (sources[1] && sources[1].id == structures.source0) {
                structures.source1 = sources[0].id;
            } else if (sources[1]) {
                structures.source1 = sources[1].id;
            }
        }
        // if (!structures.sourceContainer) {
            if (Memory.rooms[roomName].objects.container) {

                var containers = Memory.rooms[roomName].objects.container
                for (var index in containers) {
                    var container = containers[index];
                    if (Game.getObjectById(container).pos.inRangeTo(Game.getObjectById(structures.source0), 3)) {
                        structures.sourceContainer = container;
                    } else {
                        structures.mineralContainer = container;
                    }
                }
            }else{
                structures.sourceContainer = room.storage.id;
                structures.mineralContainer = room.storage.id
            }
        // }
        // if (!structures.sourceLink) {
            if (Memory.rooms[roomName].objects.link) {
                var links = Memory.rooms[roomName].objects.link
                for (var index in links) {
                    var link = links[index]
                    if (Game.getObjectById(link).pos.inRangeTo(Game.getObjectById(structures.source1), 3)) {
                        structures.sourceLink = link;
                    } else if (Game.getObjectById(link).pos.inRangeTo(room.controller, 3)) {
                        structures.upgradeLink = link;
                    } else if (Game.getObjectById(link).pos.inRangeTo(room.storage, 3)){
                        structures.storageLink = link;
                    }
                }
            }
        // }
        // console.log(roomName)
        // console.log(structures.sourceContainer)
        // console.log('.......')
    }
}