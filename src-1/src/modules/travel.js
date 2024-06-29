export const travel = function (spawnName, targetId) {
    var target = Game.getObjectById(targetId);
    if (!Game.creeps["travellerE30N50"]) {
        Game.spawns[spawnName].spawnCreep([MOVE, MOVE, MOVE, MOVE], "travellerE30N50");
    } else {
        Game.creeps["travellerE30N50"].moveTo(target);
    }

    Game.creeps["travellerundefined"].moveTo(target);

    var curRoom = Game.creeps["travellerE30N50"].room.name;
    console.log(curRoom)

}