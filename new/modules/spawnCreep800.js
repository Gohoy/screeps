export const spawnCreep800 = function (spawn, roleName) {

    if (roleName == 'harvester') {
        var newName = roleName + Game.time
        spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], newName, { memory: { role: roleName } })
    }
}