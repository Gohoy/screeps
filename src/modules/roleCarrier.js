import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
export const roleCarrier = function(creep) {
    var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_LINK && structure.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity(RESOURCE_ENERGY);
        }
    });


    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 10;
        }
    })

    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }
    // console.log(JSON.stringify(tower))
    if (creep.memory.harvesting) {
        if (link) {
            if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link)
            }
        } else
        if (source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            }
        }

    } else if (!creep.memory.harvesting && tower) {
        creep.say('carrying')
        if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(tower)
        }
    } else {
        creep.say("carrier error")
        roleHarvesterForContainer(creep)
    }

}