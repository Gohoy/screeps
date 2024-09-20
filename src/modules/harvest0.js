export const harvest0 = function(creep) {
    if(!creep.memory){
        return
    }
    var source = Game.getObjectById(creep.memory.source)
    var resourceType = creep.memory.resourceType
        // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(resourceType) < 5) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[resourceType] == 0) {
        creep.memory.harvesting = true
    }
    var target = Game.getObjectById(creep.memory.target);
    if (creep.memory.harvesting) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source)
        }
    } else  {
        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
        } else {
            creep.transfer(target, resourceType)
            creep.harvest(source)
        }
    }
    creep.say("😎")

}