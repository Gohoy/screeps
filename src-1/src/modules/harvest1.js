export const harvest1 = function(creep, source0,link0 , source1, container0 , container1) {
    var sources = creep.room.find(FIND_SOURCES)
        // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) < 5) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }

    if (creep.memory.source == '1') {
        if (creep.room.name == 'E33N53') {
            creep.moveTo(25, 8)
        }
        if (creep.memory.harvesting) {
            if (creep.harvest(source0) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source0)
            }
        } else {
            if (creep.transfer(container0, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container0)
            } else {
                creep.transfer(container0, RESOURCE_ENERGY)
                creep.harvest(source0)
            }
        }

    } else if (creep.memory.source == '2') {
        if (creep.room.name == 'E33N53') {
            creep.moveTo(12, 12)
        }
        if (creep.memory.harvesting) {
            if (creep.harvest(source1) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source1)
            }
        } else {
            if (creep.transfer(link0, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link0)
            } else {
                creep.transfer(link0, RESOURCE_ENERGY)
                creep.harvest(source1)
            }
        }
    } else if (creep.memory.source == '3') {
        creep.moveTo(container1)
        var mineral = creep.room.find(FIND_MINERALS)
        if (creep.memory.harvesting) {
            if (creep.harvest(mineral[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mineral[0])
            }
        } else if (container1) {
            if (creep.transfer(container1, RESOURCES_ALL) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container1)
            } else {
                creep.transfer(container1, RESOURCES_ALL)
                creep.harvest(mineral)
            }
        }
    }

}