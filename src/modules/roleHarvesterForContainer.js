import { roleBuilder } from "./roleBuilder"
import { roleUpgrader } from "./roleUpgrader"

export const roleHarvesterForContainer = function(creep) {
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }

    // 掉落的能量
    var droppedSource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (energy) => {
                return energy.amount <= creep.store.getFreeCapacity(RESOURCE_ENERGY)
            }
        })
        // 可用的矿
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

    // 有能量的storage 或 link
    var storageFulled = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK) && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity(RESOURCE_ENERGY)
            }
        })
        // spawn 和 extension 
    var spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        // var containers = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_CONTAINER)
        //     }
        // })
        // console.log(JSON.stringify(containers))
        // tower
    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 10
            }
        })
        // storage
    var storageEmpty = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })
    if (creep.memory.harvesting) {
        // 获取掉落的能量
        if (droppedSource) {
            creep.say("捡掉落能量")
            if (creep.pickup(droppedSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedSource)
            }
        } else if (source) {
            creep.say("开矿")
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        } else if (storageFulled) {
            creep.say("取storage的能量")
            if (creep.withdraw(storageFulled, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageFulled)
            }
        } else {
            creep.say("等待可用能量")
        }
    }
    // else if (creep.room.name != "W58N26") {
    //     creep.moveTo(Game.flags["Flag3"])
    // }
    else {
        // 先存spawn 和 extension
        if (spawnOrExtension) {
            creep.say("存spwan和extension")
            if (creep.transfer(spawnOrExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawnOrExtension)
            }
        } else
        if (tower) {
            // 再存tower
            creep.say("存tower")
            if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower)
            }
        }
        //  else if (storageEmpty) {
        //     // 再存storage
        //     creep.say("存storage")
        //     if (creep.transfer(storageEmpty, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(storageEmpty)
        //     }
        // } 
        else {
            roleBuilder(creep)
        }
    }
    //  else {
    //     // 获取和释放能量期间
    //     if (droppedSource && creep.pickup(droppedSource) != ERR_NOT_IN_RANGE) {
    //         creep.pickup(droppedSource)
    //     } else if (source && creep.harvest(source) != ERR_NOT_IN_RANGE) {
    //         creep.harvest(source)
    //     } else if (storageFulled && creep.withdraw(storageFulled != ERR_NOT_IN_RANGE)) {
    //         creep.withdraw(storageFulled, RESOURCE_ENERGY)
    //     } else if (spawnOrExtension && creep.transfer(spawnOrExtension, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE) {
    //         creep.transfer(spawnOrExtension, RESOURCE_ENERGY)
    //     } else if (storageEmpty && creep.transfer(storageEmpty, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE) {
    //         creep.transfer(storageEmpty, RESOURCE_ENERGY)
    //     } else if (tower && creep.transfer(tower, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE) {
    //         creep.transfer(tower, RESOURCE_ENERGY)
    //     } else {
    //         creep.say("出问题了")
    //         creep.moveTo(spawnOrExtension)
    //     }
    // }
}