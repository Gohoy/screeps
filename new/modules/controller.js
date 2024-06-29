import { flashMemory } from "./utils/flashMemory"

export const controller = function (roomName) {
    if(!Memory.roomStructuresId){
        return
    }
     if (!Memory.roomStructuresId[roomName]) {
        return
    }
    var memory = Memory.roomStructuresId[roomName]
    var carrierTo = Game.getObjectById(memory.carrierTo)
    var room = Game.rooms[roomName]
    var constructionSites = room.find(FIND_CONSTRUCTION_SITES)
    var spawns = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })
    if(spawns.length!=0){
        console.log("spwan")
        flashMemory(roomName)
    }
   
    var constructionSite = memory.constructionSites[0]
    if (constructionSites.length>0 && !Game.getObjectById(constructionSite)) {
        
        console.log("construction")
        flashMemory(roomName)
        
        return
    }

    var upgraderFrom = Game.getObjectById(memory.controller[room.controller.id])
    if (upgraderFrom!=Game.rooms[roomName].find(FIND_SOURCES)[0] && upgraderFrom && "store" in upgraderFrom && upgraderFrom.store[RESOURCE_ENERGY] < 500 && carrierTo!=upgraderFrom) {
        
        console.log("upgrader")
        flashMemory(roomName)
        return
    }


    var builderFrom = Game.getObjectById(memory.builderFrom)
    if (builderFrom!=Game.rooms[roomName].find(FIND_SOURCES)[0] && builderFrom && "store" in builderFrom && builderFrom.store[RESOURCE_ENERGY] < 500 && carrierTo!=builderFrom) {
        
        console.log("BUILDER")
        flashMemory(roomName)
        return
    }
    var carrierFrom = Game.getObjectById(memory.carrierFrom)
    if (carrierFrom && "store" in carrierFrom && carrierFrom.store[RESOURCE_ENERGY] < 100) {
        
        console.log("carrierFrom")
        flashMemory(roomName)
        return
    }
    if (carrierTo && "store" in carrierTo && carrierTo.store.getFreeCapacity() == 0) {
        console.log("carrierto ok")
        flashMemory(roomName)
        return
    }
}