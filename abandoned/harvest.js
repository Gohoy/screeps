export const harvest = function(creep) {
    var sources = creep.room.find(FIND_SOURCES)
        // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) < 5) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }

    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER
        }
    })
    var links = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == creep.room.name)
        }
    })
    var storage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_STORAGE
        }
    })
    if (creep.room.name == 'E32N53') {
        if (creep.memory.source == '1') {
            if (creep.memory.harvesting) {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0])
                }
            } else if (containers[0]) {
                if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0])
                } else {
                    creep.transfer(containers[0], RESOURCE_ENERGY)
                    creep.harvest(sources[0])
                }
            }

        } else if (creep.memory.source == '2') {
            if (creep.memory.harvesting) {
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1])
                }
            } else {
                if (creep.transfer(links[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[0])
                } else {
                    creep.transfer(links[0], RESOURCE_ENERGY)
                    creep.harvest(sources[1])
                }
            }
        } else if (creep.memory.source == '3') {
            creep.say("3")
            creep.moveTo(containers[1])
            var mineral = creep.room.find(FIND_MINERALS)
            if (creep.memory.harvesting) {
                if (creep.harvest(mineral[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral[0])
                }
            } else if (containers[1]) {
                if (creep.transfer(containers[1], RESOURCES_ALL) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[1])
                } else {
                    creep.transfer(containers[1], RESOURCES_ALL)
                    creep.harvest(mineral)
                }
            }
        }
    } else if (creep.room.name == 'E33N53') {
        if (creep.memory.source == '1') {
            if (creep.memory.harvesting) {
                creep.moveTo(25, 8)
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0])
                }
            } else {
                if (creep.transfer(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(links[1])
                } else {
                    creep.transfer(links[1], RESOURCE_ENERGY)
                    creep.harvest(sources[0])
                }
            }
        } else if (creep.memory.source == '2') {
            creep.moveTo(containers[2])
            if (creep.memory.harvesting) {
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1])
                }
            } else {
                if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0])
                } else {
                    creep.transfer(containers[0], RESOURCE_ENERGY)
                    creep.harvest(sources[1])
                }
            }
        } else if (creep.memory.source == '3') {
            creep.say("3")
            creep.moveTo(containers[1])
            var mineral = creep.room.find(FIND_MINERALS)
            if (creep.memory.harvesting) {
                if (creep.harvest(mineral[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral[0])
                }
            } else if (containers[1]) {
                if (creep.transfer(containers[1], RESOURCES_ALL) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[1])
                } else {
                    creep.transfer(containers[1], RESOURCES_ALL)
                    creep.harvest(mineral)
                }
            }
        }
    } else if (creep.room.name == 'E31N53') {
        if (creep.memory.source == '1') {
            if (creep.memory.harvesting) {
                creep.moveTo(41, 22)
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0])
                }
            } else {
                if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0])
                } else {
                    creep.transfer(containers[0], RESOURCE_ENERGY)
                    creep.harvest(sources[0])
                }
            }
        } else if (creep.memory.source == '2') {
            creep.moveTo(27, 44)
            if (creep.memory.harvesting) {
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1])
                }
            } else {
                if (creep.transfer(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(27, 44)
                } else {
                    creep.transfer(links[1], RESOURCE_ENERGY)
                    creep.harvest(sources[1])
                }
            }
        }
    }
}