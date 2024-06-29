// import { build } from "./build";
// import { upgrade } from "./upgrade";
export const roleHarvesterForContainer = function (creep) {
    if(!creep.memory){
        return
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }
    var constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)

    // 掉落的能量
    var droppedSource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (source) => {
            return source.resourceType == RESOURCE_ENERGY;
        }
    })
    // 可用的矿
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

    // 有能量的storage 或 link
    var storageFulled = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity(RESOURCE_ENERGY)
        }
    })
    // spawn 和 extension 
    var spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })

    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 10
        }
    })
    // storage

    // var structureNeedRepaired = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return structure.hits < 50000 && structure.structureType == STRUCTURE_CONTAINER;
    //     }
    // })
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER
        }
    })
    if (creep.memory.harvesting) {
        // 获取掉落的能量
        // if (droppedSource) {
        //     creep.say("捡掉落")
        //     if (creep.pickup(droppedSource) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(droppedSource)
        //     }
        // } else 
        if (storageFulled) {
            creep.say("取storage")
            if (creep.withdraw(storageFulled, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageFulled)
            }
        } else if (source) {
            creep.say("开矿")
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else {
            creep.say("等待可用能量")
        }
    } else {
        // 先存spawn 和 extension
        if (spawnOrExtension) {
            creep.say("存spwan")
            if (creep.transfer(spawnOrExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawnOrExtension)
            }
        } else if (tower) {
            // 再存tower
            creep.say("存tower")
            if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower)
            }
        } else if (true) {

            if (creep.repair(containers[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[1])
            }
        }
    }

}