import { findPlainNearTarget } from "./findPlainNearTarget";
import { flashMemory } from "./flashMemory";

export const createContainers = function (roomName, terrain, sources) {

    var room = Game.rooms[roomName]

    var containersPos = []


    for (var i = 0; i < sources.length; i++) {
        containersPos.push(findPlainNearTarget(terrain, sources[i]))
    }
    for (var i = 0; i < containersPos.length; i++) {
        room.createConstructionSite(containersPos[i].x, containersPos[i].y, STRUCTURE_CONTAINER)
    }

    room.createConstructionSite(findPlainNearTarget(terrain, room.controller).x, findPlainNearTarget(terrain, room.controller).y, STRUCTURE_CONTAINER)
console.log("create")
    // 以下是修路
    for (var i = 0; i < sources.length; i++) {
        var path = room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES,{
            filter:(site)=>{
                return site.structureType == STRUCTURE_CONTAINER
            }
        }).pos.findPathTo(sources[i].pos.findClosestByRange(FIND_CONSTRUCTION_SITES,{
            filter:(site)=>{
                return site.structureType == STRUCTURE_CONTAINER
            }
        }))
        for (var j = 0; j < path.length; j++) {
                console.log(path[j].x, path[j].y)
                room.createConstructionSite(path[j].x, path[j].y, STRUCTURE_ROAD)
            
        }
    }

    flashMemory(roomName)
}