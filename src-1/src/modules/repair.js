export const repair = function (creep, link) {
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] <= 5) {
        creep.memory.harvesting = true
    }


    creep.memory.from = creep.room.storage.id


    // var ramparts = creep.room.find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return structure.structureType == STRUCTURE_RAMPART
    //     }
    // })
    // var newRam = ramparts.filter(ram => ram.hits < 10000)[0]
    var newRam = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_RAMPART && structure.hits < 10000
        }
    })


    if (newRam) {
        creep.memory.to1 = newRam.id
    } else {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_RAMPART && structure.hits < 3000000
            }
        })
        // var target = ramparts.filter(ram => ram.hits < 3000000)[0]
        if (target) {

            creep.memory.to1 = target.id
        } else {
            var target1 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_RAMPART && structure.hits < 100000000
                }
            })
            // var target1 = ramparts.filter(ram => ram.hits < 30000000)[0]
            if (target1) {
                creep.memory.to1 = target1.id
            } else {
                var target2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_RAMPART && structure.hits < 160000000
                    }

                })
                if (target2) {
                    creep.memory.to1 = target2.id
                } else {
                    var target3 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType == STRUCTURE_RAMPART && structure.hits < 230000000
                        }
                    })
                    if (target3) {
                        creep.memory.to1 = target3.id
                    }
                }
            }
        }
    }



    if (creep.memory.harvesting) {
        if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from))
        }
    } else {
        var res = creep.repair(Game.getObjectById(creep.memory.to1))
        if (res == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.to1))
        }

        creep.say(res)
    }


}