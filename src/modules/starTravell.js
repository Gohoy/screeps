export const starTravell = function (creep) {
    var observer = Game.getObjectById("6347c9d22f000b649d857d74")
    observer.observeRoom("E30N50");
    if (creep.room.name == "E31N53") {
        creep.moveTo(0, 11)
    } else if (creep.room.name == "E30N53") {
        // console.log('move')
        creep.moveTo(29, 49)
        // creep.moveByPath(creep.memory.path)
    } else if (creep.room.name == "E30N52") {
        creep.moveTo(29, 49)
    } else if (creep.room.name == "E30N51") {
        creep.moveTo(29, 49)
    } else if (creep.room.name == "E30N50") {
        creep.moveTo(30, 23)
    } else if (creep.room.name == "shard2/E30N50") {
        console.log(true)



    }

    // Game.creeps[""]
    Game.rooms["shard2/E30N50"].createConstructionSite(9, 7, STRUCTURE_CONTAINER)
    Game.rooms["shard2/E30N50"].createConstructionSite(47, 9, STRUCTURE_CONTAINER)
    Game.rooms["shard2/E30N50"].createConstructionSite(7, 38, STRUCTURE_CONTAINER)
    // console.log(JSON.stringify(Game.rooms))
    // // creep.moveTo(creep.memory.path[1])
    // creep.say(creep.moveByPath(creep.memory.path))
}