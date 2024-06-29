import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { roleUpgrader } from "./roleUpgrader";

export const roleBuilder = function(creep) {

    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }
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
    var structureNeedRepaired = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax;
        }
    })

    if (creep.memory.harvesting) {
        creep.say("干活需要能量")
            // 先到storage中去能量
        if (storage && (structureNeedRepaired || constructure)) {
            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        } else {
            // 如果storage不能用,去找可用的矿
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else {
                // 目前没有可用能源
                creep.say("等待可用能量")
            }
        }
    } else {
        if (structureNeedRepaired) {
            creep.say("修路")
            if (creep.repair(structureNeedRepaired) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structureNeedRepaired)
            }
        }
        // 如果满能量去干活
        else if (constructure) {

            creep.say("干活 ")
            if (creep.build(constructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructure)
            }
        } else {

            // 没活干去升级
            roleUpgrader(creep)
        }
    }
    // else {
    //     // 在获取能量和释放能量期间

    //     // 在获取storage能量
    //     if (storage && creep.withdraw(storage, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE) {
    //         creep.withdraw(storage, RESOURCE_ENERGY)
    //     } else if (source && creep.harvest(source) != ERR_NOT_IN_RANGE) {
    //         creep.harvest(source)
    //     } else if (constructure && creep.build(constructure) != ERR_NOT_IN_RANGE) {
    //         creep.build(constructure)
    //     } else {
    //         // 没活干去升级
    //         if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    //             creep.upgradeController(creep.room.controller)
    //         }
    //     }
    // }
};