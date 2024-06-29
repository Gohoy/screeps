export const upgrade0 = function (creep) {
    if(!creep.memory){
        return
    }
    var structures = Memory.rooms[creep.room.name].objects
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }

    if (creep.store[RESOURCE_ENERGY] <= 11) {
        // creep.say("升级需要能量")
        // 先到storage中去能量
        var upgradeLink = structures.upgradeLink
        var target = creep.room.storage
        if (upgradeLink) {
            target = Game.getObjectById(upgradeLink)
        }
        creep.moveTo(target)
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            creep.upgradeController(creep.room.controller)
        }
    } else {
        // 如果满能量去升级
        // creep.say("升级升级UP! ")
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }

};