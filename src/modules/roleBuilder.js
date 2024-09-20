import { roleUpgrader } from "./roleUpgrader";

export const roleBuilder = function(creep) {

    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }

    var droppedSource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (source) => {
            return (source.amount > 150 && source.resourceType == RESOURCE_ENERGY) || (source.resourceType != RESOURCE_ENERGY && source.amount > 50)
        }
    })


    // 有能量的storage
    var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > creep.store.getCapacity(RESOURCE_ENERGY);
            }
        })
        // 有能量的矿
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        // 工地
    var constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)

    if (creep.memory.harvesting) {
        creep.say("pre-work")
            // 先到storage中去能量
        if (droppedSource) {
            if (creep.pickup(droppedSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedSource)
            }
        } else if (storage && (constructure)) {
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                creep.say("等待可用能量")
            }
        }
    } else {

        if (constructure) {

            creep.say("work")
            if (creep.build(constructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructure)
            }
        } else {
            roleUpgrader(creep)
        }
    }

};