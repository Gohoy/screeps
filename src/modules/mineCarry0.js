export const mineCarry0 = function (creep) {
    if (!creep.memory) {
        return
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store.getUsedCapacity() == 0) {
        creep.memory.harvesting = true
    }

    if (!creep.memory.frombase) {
        creep.memory.frombase = Memory.rooms[creep.room.name].objects.mineralContainer;
    }
    if (!creep.memory.resourceType) {
        creep.memory.resourceType = Memory.rooms[creep.room.name].objects.mineral0;
    }
    var resourceType = creep.memory.resourceType;
    var mineralContainer = Game.getObjectById(creep.memory.frombase)
    if (mineralContainer.store.getUsedCapacity() > 0) {
        if (creep.memory.harvesting) {
            if (creep.withdraw(mineralContainer, resourceType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mineralContainer);
                creep.withdraw(mineralContainer, resourceType);
            }
        } else {
            if (creep.room.terminal.store.getFreeCapacity() > 0) {
                creep.memory.to = creep.room.terminal.id;
            } else {
                creep.memory.to = creep.room.storage.id;
            }
            var to = Game.getObjectById(creep.memory.to);
            if (creep.transfer(to, resourceType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(to);
                creep.transfer(to, resourceType);
            }
        }
    } else {
        creep.say("好闲啊");
    }
}
