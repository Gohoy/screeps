export const harvestingOrNot = function(creep){
    if(creep.memory.role == 'harvester'){
        if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) < 5) {
            creep.memory.harvesting = false
        }
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true
        }
    }else{
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }}
}