export const spawnCreep = function (spawn) {
    // // 增加新生成的 creep 的缓存
    const room = spawn.room;

    var creepToSpawns = room.memory.creepToSpawn

    var creepName = Object.keys(creepToSpawns)[0]
    // console.log(creepName)
    // var creepName = null
    if (creepName && room.energyAvailable >= 300) {
        var creepMemory = creepToSpawns[creepName]
        var newName = creepMemory.name + Game.time
        var result = spawn.spawnCreep(creepMemory.bodyParts, newName, { memory: creepMemory })
        if (result == 0) {
            console.log("spawn" + newName + " success" + result)
            delete creepToSpawns[creepName]
        } else {
            console.log("spawn" + newName + " error" + result)
        }
    }

};