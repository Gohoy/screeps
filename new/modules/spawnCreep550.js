export const spawnCreep550 = function (spawn, roleName , fromId) {
    if (roleName == 'harvester') {
        var newName = roleName + Game.time
       spawn.spawnCreep([WORK, WORK, WORK, WORK,WORK,MOVE], newName, { memory: { role: roleName ,from: fromId, harvesting:true} })
    }else if(roleName == 'upgrader'){
        var newName = roleName + Game.time
        spawn.spawnCreep([WORK, WORK, WORK,WORK,CARRY,MOVE], newName, { memory: { role: roleName ,from: fromId, harvesting:true} })
    }

}