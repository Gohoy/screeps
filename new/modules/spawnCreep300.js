
export const spawnCreep300 = function (spawn, roleName, creeps) {
    var roomName = spawn.room.name

    var sourcesId = Memory.roomStructuresId[roomName].source
    // if(roleName == 'harvester'){
    //     var harvesters0 = creeps.filter((harvester) => { return harvester.memory.source ==sourcesId[0] })
    //     var harvesters1 = creeps.filter((harvester) => { return harvester.memory.source ==sourcesId[1] })
    //     var harvesters2 = creeps.filter((harvester) => { return harvester.memory.source == sourcesId[2]})
    //     var newName = roleName + Game.time
    //     if(harvesters0.length == 0 ){
    //         var from = Object.keys(sourcesId[0])[0]
    //         var to  =   sourcesId[0][from]
    //         spawn.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: roleName ,from: from ,to:to} })
    //     }
    if (roleName == 'harvester') {
        for (var i = 0; i < sourcesId.length; i++) {
            var harvester = creeps.filter((harvester) => { return harvester.memory.from == Object.keys(sourcesId[i])[0] })
            if (harvester.length == 0 && !spawn.spawning) {
                if (Game.time % 10 == 0) {
                    console.log("harvester spawing :" + i)
                }
                var newName = roleName + i + Game.time
                var from = Object.keys(sourcesId[i])[0]
                var to = sourcesId[i][from]
                if (spawn.room.energyCapacityAvailable < 550) {
                    spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
                } else {
                    spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
                } break;
            }
        }
    }
    else if (roleName == 'upgrader') {
        var newName = roleName + creeps.length + Game.time
        var controllerId = Memory.roomStructuresId[roomName].controller
        var to = Object.keys(controllerId)[0]
        var from = controllerId[to]
        if (spawn.room.energyCapacityAvailable < 550) {
            spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
        } else {

            spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
        }
    } else if (roleName == 'builder') {
        var newName = roleName + Game.time
        var constructionSitesId = Memory.roomStructuresId[roomName].constructionSites
        var from = Memory.roomStructuresId[roomName].builderFrom
        var to = constructionSitesId[0]
        if (spawn.room.energyCapacityAvailable < 550) {
            spawn.spawnCreep([WORK, WORK, CARRY, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
        } else {

            spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
        }
    } else if (roleName == 'carrier') {
        var newName = roleName + Game.time
        var from = Memory.roomStructuresId[roomName].carrierFrom
        var to = Memory.roomStructuresId[roomName].carrierTo
        if (spawn.room.energyCapacityAvailable < 550) {
            spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
        } else {

            spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: roleName, from: from, to: to } })
        }
    }
}
