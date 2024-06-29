import { setCreepTo } from "./setCreepTo"

export const flashMemory = function (roomName) {


    console.log("flash")

    var room = Game.rooms[roomName];
    var sources = room.find(FIND_SOURCES);
    var roomStructuresId = [];
    var constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    var constructionSitesId = [];
    for (var i = 0; i < constructionSites.length; i++) {
        constructionSitesId.push(constructionSites[i].id);
    }
    var containers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000
        }
    });
    if (room.storage && room.storage.store[RESOURCE_ENERGY] > 1000) {
        var builderFrom = storage;
    } else if (containers[0]) {
        var builderFrom = containers[0];
    } else {
        var builderFrom = sources[0];
    }


    var energyAmount = 0;
    
    var range = 1;
    for (var i = 0; i < sources.length; i++) {
        while (range < 3) {
    
            var sourceContainer = sources[i].pos.findInRange(FIND_STRUCTURES, range, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER
                }
            })[0];

            if (sourceContainer == null) {
                sourceContainer = sources[i].pos.findInRange(FIND_CONSTRUCTION_SITES, range)[0];
            }
            if(sourceContainer != null){
                break
            }
        range++;
        }

        var carrierFrom ={
            id:'1'
        }
        if ("store" in sourceContainer && sourceContainer.store[RESOURCE_ENERGY] > energyAmount) {
            var carrierFrom = sourceContainer;
            energyAmount = sourceContainer.store[RESOURCE_ENERGY];
        }
        var tmp = {
            [sources[i].id]: sourceContainer.id
        };
        roomStructuresId.push(tmp);
    }

    var upgraderFrom = room.controller.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER
        }
    });

    if (upgraderFrom == null) {
        upgraderFrom = builderFrom;
    }

    var spawns = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    });

    if (spawns.length > 0) {
        var carrierTo = spawns[0];
    } else if (carrierFrom !=upgraderFrom && "store" in upgraderFrom && upgraderFrom.store[RESOURCE_ENERGY] < 1500) {
        var carrierTo = upgraderFrom;
    } else if (room.storage && carrierFrom !=room.storage) {
        var carrierTo = room.storage;
    } else {
        var carrierTo = upgraderFrom
    }
    Memory.roomStructuresId = {
        [roomName]: {
            controller: { [room.controller.id]: upgraderFrom.id },
            source: roomStructuresId,
            constructionSites: constructionSitesId,
            builderFrom: builderFrom.id,
            carrierFrom: carrierFrom.id,
            carrierTo: carrierTo.id,
        }
    };

    for (var creep in Game.creeps) {
        if (Game.creeps[creep].room.name == roomName) {
            setCreepTo(Game.creeps[creep]);
        }
    }
}