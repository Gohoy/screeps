export const go = function (creep, opt, reloadPath) {
    if (opt == "from") {
        if (!creep.memory.fromPath || reloadPath || creep.moveByPath(creep.memory.fromPath) != 0) {
            creep.memory.fromPath = creep.room.findPath(creep.pos, Game.getObjectById(creep.memory.from).pos);
        }
        creep.moveByPath(creep.memory.fromPath)
    }
    if (opt == "to") {
        if (!creep.memory.toPath || reloadPath || creep.moveByPath(creep.memory.toPath) != 0) {
            creep.memory.toPath = creep.room.findPath(creep.pos, Game.getObjectById(creep.memory.to).pos);
        }
    }
}