import { createContainers } from "./utils/createContainers";
import { harvest } from "./actions/harvest";
import { spawnCreep300 } from "./spawnCreep300";
import { spawnCreep550 } from "./spawnCreep550";
import {rolerLength} from "./utils/rolerLength";
import { upgrade } from "./actions/upgrade";
import { build } from "./actions/build";
import { carry } from "./actions/carry";
import { buildExtensions } from "./utils/buildExtensions";

export const spawnFinal = function (roomName) {

    var harvesters = rolerLength('harvester', roomName);

    var builders = rolerLength('builder', roomName);

    var upgraders = rolerLength('upgrader', roomName);

    var harvesterForContainers = rolerLength('harvesterForContainer', roomName);

    var travellers = rolerLength('traveller', roomName);

    var claimers = rolerLength('claimer', roomName);

    var carriers = rolerLength('carrier', roomName)

    var room = Game.rooms[roomName]

    var terrain = room.getTerrain()

    var structures = room.find(FIND_STRUCTURES)

    var sources = room.find(FIND_SOURCES)

    var spawns = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_SPAWN
        }
    })

    var constructionSites = room.find(FIND_CONSTRUCTION_SITES)
    // 常量区开始
    var upgradersLength = 2;
    // 常量区结束

    // 确定用来生产的spawn
    var spawn1 = spawns[0];
    if (spawns.length >= 2) {
        var spawn2 = spawns[1];
    }
    if (spawns.length >= 3) {
        var spawn3 = spawns[2];
    }

    var spawn = spawn1;
    if (spawn.spawning && spawn2 && !spawn2.spawning) {
        spawn = spawn2
    } else if (spawn3 && !spawn3.spawning) {
        spawn = spawn3
    }

    // 计算房间可用能量
    var roomTotalEnergy = room.energyCapacityAvailable;
    if(harvesters.length ==0 && room.controller.level == 1){
        createContainers(roomName,terrain,sources)
    }
    if (roomTotalEnergy <=550) {
        if (harvesters.length < sources.length) {
            spawnCreep300(spawn, 'harvester',harvesters)
        } else if(structures.filter((structure)=>structure.structureType==STRUCTURE_CONTAINER).length>0 &&  carriers.length <2){
            spawnCreep300(spawn,'carrier',carriers)
        }
        else if (upgraders.length < upgradersLength) {
            spawnCreep300(spawn, 'upgrader',upgraders)
        } else if (constructionSites.length>0 && builders.length < 3) {
            spawnCreep300(spawn, 'builder',builders)
        }

    } 
if(roomTotalEnergy == 300 &&room.createConstructionSite(room.controller.pos.x,room.controller.pos.y,STRUCTURE_EXTENSION) !=  ERR_RCL_NOT_ENOUGH ){
    buildExtensions(roomName,terrain)
}


    // 执行区
    for (var name in Game.creeps) {
        if (Game.creeps[name].room.name == roomName) {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                harvest(creep);
            }
            if(creep.memory.role == 'upgrader'){
                upgrade(creep)
            }
            if(creep.memory.role == 'builder'){
                build(creep)
            }
            if(creep.memory.role == 'carrier'){
                carry(creep)
            }
        }
    }
}