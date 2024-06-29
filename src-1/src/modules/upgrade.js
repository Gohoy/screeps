export const upgrade = function (creep) {
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }

    var links = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == creep.room.name)
        }
    })
    // container
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER
        }
    })
    // 有能量的矿
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

    if (creep.store[RESOURCE_ENERGY] <= 11) {
        // creep.say("升级需要能量")
        // 先到storage中去能量
        if (creep.room.name == 'E32N53') {
            if (links[1]) {
                creep.moveTo(links[1])
                if (creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[1]);
                } else {
                    creep.upgradeController(creep.room.controller)
                }
            }

        } else if (creep.room.name == 'E33N53') {
            if (links[2]) {
                if (creep.withdraw(links[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[2]);
                } else {
                    creep.upgradeController(creep.room.controller)
                }
            }
        } else if (creep.room.name == 'E31N53') {
            if (links[0]) {
                creep.moveTo(links[0])
                if (creep.withdraw(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[0]);
                } else {
                    creep.upgradeController(creep.room.controller)
                }
            } else if (containers[2]) {
                if (creep.withdraw(containers[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[2]);
                } else {
                    creep.upgradeController(creep.room.controller)
                }
            }
        } else if (creep.room.name == 'E32N52') {
            creep.moveTo(links[0])
            var from = links[0]
            if (links[0].store[RESOURCE_ENERGY] == 0) {
                from = containers[1]
            }
            if (creep.withdraw(from, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(from)
            } else {
                creep.upgradeController(creep.room.controller)
            }
        }

    } else {
        // 如果满能量去升级
        // creep.say("升级升级UP! ")
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);

        }
    }

};