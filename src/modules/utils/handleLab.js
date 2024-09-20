export const handleLab = function(creep, lab, mineralType) {
    if (creep.transfer(lab, creep.carry[0]) == ERR_INVALID_TARGET) {
        creep.memory.to = creep.room.storage.id
        creep.memory.resourceType = creep.carry[0]
    } else {
        creep.memory.to = lab.id
        creep.memory.resourceType = creep.carry[0]
    }
}