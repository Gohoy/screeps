export const carry = function(creep) {
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure => {
            return structure.structureType == STRUCTURE_CONTAINER
        })
    })
    var droppedSource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (source) => {
            return (source.amount > 150 && source.resourceType == RESOURCE_ENERGY) || (source.resourceType != RESOURCE_ENERGY && source.amount > 50)
        }
    })


    var links = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == creep.room.name)
        }
    })

    var spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })

    // tower
    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 300
        }
    })
    var towerEmpty = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 700
        }
    })

    if (creep.room.name == 'E32N53') {
        if (creep.memory.to == '2') {
            var from = containers[0]
            if (from.store[RESOURCE_ENERGY] <= 500 && (spawnOrExtension || towerEmpty || links[0].store[RESOURCE_ENERGY] < 300)) {
                from = creep.room.storage
            }
            if (from.store[RESOURCE_ENERGY] <= 500 && (spawnOrExtension || towerEmpty || links[0].store[RESOURCE_ENERGY] < 300)) {
                from = containers[0]
            }
            if (droppedSource) {
                from = droppedSource
            }
            if (containers[0].store[RESOURCE_ENERGY] >= 1500) {
                from = containers[0]
            }

            if (spawnOrExtension) {
                var to = spawnOrExtension
            } else if (towerEmpty) {
                var to = towerEmpty
            } else if (tower) {
                var to = tower
            } else if (links[1].store[RESOURCE_ENERGY] < 400) {
                var to = links[2]
            } else {
                var to = creep.room.storage
            }

        }

        if (creep.memory.to == '2') {
            if (containers[1].store[RESOURCE_HYDROGEN] >= 500) {
                var from = containers[1]
                var to = creep.room.storage
            }

            if (_.sum(creep.store) > creep.store[RESOURCE_ENERGY]) {
                var to = creep.room.storage
                creep.memory.harvesting = false
                creep.moveTo(to)
            }
        }
    } else if (creep.room.name == 'E33N53') {

        if (creep.memory.to == '2') {
            var from = creep.room.storage
            if (from.store[RESOURCE_ENERGY] <= 500 && (spawnOrExtension || towerEmpty || links[0].store[RESOURCE_ENERGY] < 300)) {
                from = creep.room.storage
            }
            if (droppedSource) {
                from = droppedSource
            }
            if (containers[0].store[RESOURCE_ENERGY] >= 500) {
                from = containers[0]
            }

            if (spawnOrExtension) {
                var to = spawnOrExtension
            } else if (towerEmpty) {
                var to = towerEmpty
            } else if (tower) {
                var to = tower
            } else if (links[0].store[RESOURCE_ENERGY] < 400) {
                var to = links[2]
            } else {
                var to = creep.room.storage
            }


        }
        if (creep.memory.to == '2') {
            if (containers[1].store[RESOURCE_OXYGEN] >= 500) {
                var from = containers[1]
                var to = creep.room.storage
            }


            if (_.sum(creep.store) > creep.store[RESOURCE_ENERGY]) {
                creep.memory.harvesting = false
                creep.moveTo(to)
            }
        }
        if (creep.memory.to == '2' && droppedSource) {
            if (creep.pickup(droppedSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedSource)
            }
        }

    } else if (creep.room.name == 'E31N53') {

        if (creep.memory.to == '2') {
            var from = containers[0]
            if (from.store[RESOURCE_ENERGY] <= 500 && (spawnOrExtension || towerEmpty || links[0].store[RESOURCE_ENERGY] < 300)) {
                from = creep.room.storage
            }
            if (from.store[RESOURCE_ENERGY] <= 500 && (spawnOrExtension || towerEmpty || links[0].store[RESOURCE_ENERGY] < 300)) {
                from = containers[0]
            }

            if (droppedSource) {
                from = droppedSource
            }
            if (containers[0].store[RESOURCE_ENERGY] >= 1500) {
                from = containers[0]
            }

            if (spawnOrExtension) {
                var to = spawnOrExtension
            } else if (towerEmpty) {
                var to = towerEmpty
            } else if (tower) {
                var to = tower
            } else if (links[0].store[RESOURCE_ENERGY] < 400) {
                var to = links[2]
            } else {
                var to = creep.room.storage
            }
        }


    }


    if (creep.memory.harvesting) {
        if (creep.pickup(from, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(from)
        }
        if (creep.withdraw(from, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(from)
        }
        if (from != creep.room.storage && creep.withdraw(from, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
            creep.moveTo(from)
        }
        if (from != creep.room.storage && creep.withdraw(from, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) {
            creep.moveTo(from)
        }
    } else {
        if (creep.transfer(to, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(to)
        }
        if (_.sum(creep.store) > creep.store[RESOURCE_ENERGY] && (to == creep.room.storage) || to == creep.room.terminal) {
            creep.say("transfer")
            for (const resourceType in creep.carry) {
                creep.transfer(to, resourceType)
            }
        }
    }


}