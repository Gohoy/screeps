import { repair } from "./repair";

export const build = function (creep, link) {


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
            return energy.amount > 150
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
    // console.log(creep.room.name)
    var flags = Game.flags

    if (constructure) {
        if (creep.memory.harvesting) {
            creep.say("干活需要能量")
            if (storage && (constructure)) {
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
            // 如果满能量去干活
            creep.say("干活 ")
            if (creep.build(constructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructure)
            }

        }
    } else {
        creep.say("repair")
        repair(creep)
    }

};