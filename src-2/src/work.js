import { go } from "./utils/go"

export const work = function (creep) {
    var role = creep.memory.role.replace(/\d+/g, '');
    switch (role) {
        case "harvester":
            harvest(creep)

        case "upgrader":
            upgrade(creep)

    }
}

function harvest(creep) {
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) < 5) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }
    var from = Game.getObjectById(creep.memory.from)
    var to = Game.getObjectById(creep.memory.to)
    if (creep.memory.harvesting) {
        if (creep.harvest(from) == ERR_NOT_IN_RANGE) {
            go(creep, "from")
        }
    } else {
        if (creep.transfer(to, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            go(creep, "to")
        }
    }
}
function upgrade(creep) {
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true
    }
    var from = Game.getObjectById(creep.memory.from)
    var to = Game.getObjectById(creep.memory.to)
    if (creep.memory.harvesting) {
        if (creep.memory.from == creep.room.memory.specificStructures["source0"]) {
            if (creep.harvest(from) == ERR_NOT_IN_RANGE) {
                go(creep, "from")
            }
        } else {
            if (creep.withdraw(from, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                go(creep, "from")
            }
        }

    } else {
        if (creep.upgradeController(to) == ERR_NOT_IN_RANGE) {
            go(creep, "to")
        }
    }
}