export const carry0 = function (creep) {
    if(!creep.memory){
        return
    }

    
    var structures = Memory.rooms[creep.room.name].objects
    var target = creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner != '{"username":"Invader"}'
        }
    });
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store.getUsedCapacity() == 0) {
        creep.memory.harvesting = true
        creep.memory.harvestingFlag = 1
    }
    var spawns = structures.spawn
    var extensions = structures.extension
    // tower
    var towers = structures.tower.filter(tower => {
        return Game.getObjectById(tower).store.getFreeCapacity(RESOURCE_ENERGY) > 300;
    })


    var transferCost = 14000
    var storage = creep.room.storage
    var terminal = creep.room.terminal

    var droppedSource = creep.room.find(FIND_DROPPED_RESOURCES)
    //  ----------------------------------------------------------------


    var sourceContainer = Game.getObjectById(structures.sourceContainer)
    var storageLink = Game.getObjectById(structures.storageLink)
    if (( towers || terminal.store[RESOURCE_ENERGY] < transferCost  || droppedSource || sourceContainer.store[RESOURCE_ENERGY] >= 500)) {

        creep.memory.from = storage.id

        if (storageLink && storageLink.store[RESOURCE_ENERGY] >= 500) {
            creep.memory.from = storageLink.id
        } else if (sourceContainer && sourceContainer.store[RESOURCE_ENERGY] >= 500) {
            creep.memory.from = sourceContainer.id
        } else if (sourceContainer && storage.store[RESOURCE_ENERGY] < 500 && sourceContainer.store[RESOURCE_ENERGY] < 500 && !droppedSource) {
            creep.memory.from = terminal.id
        } else if (terminal.store[RESOURCE_ENERGY] > 20000) {
            creep.memory.from = terminal.id
        } else {
            creep.memory.from = storage.id
        }

        var toList = creep.memory.tolist
        var to0 = toList[0].filter((to)=>{
                return Game.getObjectById(to).store.getFreeCapacity(RESOURCE_ENERGY) > 0
            })
        var to1 = toList[1].filter((to)=>{
            return Game.getObjectById(to).store.getFreeCapacity(RESOURCE_ENERGY) > 300
        })
        if (to0.length > 0) {
            creep.memory.to = to0[0]
        } else if (to1.length > 0) {
            creep.memory.to = to1[0]
        }  else if (terminal.store[RESOURCE_ENERGY] < transferCost) {
            creep.memory.to = terminal.id
        }else {
            creep.memory.to = storage.id
        }

        if (_.sum(creep.store) > creep.store[RESOURCE_ENERGY]) {
            creep.memory.to = storage.id
            creep.memory.harvesting = false
            creep.moveTo(Game.getObjectById(creep.memory.to))
        }

    }
    if(creep.memory.from == creep.memory.to) {
        var spawn = Game.getObjectById(spawns[0])
        creep.moveTo(spawn)
        creep.say("啊，歇一会✌️")
        spawn.renewCreep(creep)
    }else if (creep.memory.harvesting) {
        creep.say("脏累活都交给帕鲁😵")
        if (creep.pickup(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from))
        }
        if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from))
        }
    } else {

        if (creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity()) {
            for (const resourceType in creep.carry) {
                creep.transfer(storage, resourceType);
            }
        } else {
            if (creep.transfer(Game.getObjectById(creep.memory.to), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.to))
            }
        }
    }

}
