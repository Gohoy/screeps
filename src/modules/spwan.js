// import { traveller } from "../../../abandoned/traveller";
import { upgrade } from "./upgrade";
import { towerRepair } from './towerRepair';
import { build } from './build';
import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { claim } from "./claim";
import { carry1 } from "./carry1";
import { harvest1 } from "./harvest1";
import { traveller } from "./travel";
import { heal } from "../army/heal";
import { rolerLength } from "./utils/rolerLength";
import { repair } from "./repair";
export const spawn = function (spawnName) {

    // 死亡creep 的memory清理
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var harvesters = rolerLength('harvester', 'E32N53');

    var builders = rolerLength('builder', 'E32N53');

    var upgraders = rolerLength('upgrader', 'E32N53');

    var harvesterForContainers = rolerLength('harvesterForContainer', 'E32N53');

    var travellers = rolerLength('traveller', 'E32N53');

    // var claimers = rolerLength('claimer', 'E32N53');

    var carriers = rolerLength('carrier', 'E32N53')
    var repairers = rolerLength('repairer', 'E32N53')

    // var armyAttackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'armyAttacker' && creep.ticksToLive >= 150)

    // var armyHealers = _.filter(Game.creeps, (creep) => creep.memory.role == 'armyHealer' && creep.ticksToLive >= 150)

    var constructionSites = Game.rooms['E32N53'].find(FIND_CONSTRUCTION_SITES)
    // var structures = Game.rooms['E32N53'].find(FIND_STRUCTURES)

    var links = Game.rooms['E32N53'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == 'E32N53')
        }
    })

    // var labs = Game.rooms['E32N53'].find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_LAB && structure.room.name == 'E32N53')
    //     }
    // })

    var containers = Game.rooms['E32N53'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER && structure.room.name == 'E32N53')
        }
    })

    var sources = Game.rooms['E32N53'].find(FIND_SOURCES)
    if (Game.time % 10 == 0) {
        console.log('ROOM1: harvester: ' + harvesters.length + ' builder:' + builders.length + ' upgrader:' + upgraders.length + ' carrier:' + carriers.length + ' traveller:' + travellers.length)
    }
    // 设置各种role的数量和组件
    if (upgraders.length < 1 && harvesters.length >= 2 && carriers.length >= 1) {
        var newName = 'upgrader' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new upgrader: ' + newName);
        }



        Game.spawns[spawnName].spawnCreep([WORK, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } })
        // if (Game.rooms['E32N53'].storage.store[RESOURCE_ENERGY] < 20000) {

        //     Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        // } else {
        //     // Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        //     Game.spawns[spawnName].spawnCreep(
        //         [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY
        //         ], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        // }
    }
    // && Object.keys(constructionSites).length != 0
    if (builders.length < 1 && harvesters.length >= 2 && Object.keys(constructionSites).length != 0 && carriers.length >= 1) {
        var newName = 'builder' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new builder: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    }


    if (harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new harvester: ' + newName);
        }
        var harvesters1 = harvesters.filter((harvester) => { return harvester.memory.source == '1' })
        var harvesters2 = harvesters.filter((harvester) => { return harvester.memory.source == '2' })
        var harvesters3 = harvesters.filter((harvester) => { return harvester.memory.source == '3' })
        if (harvesters2.length == 0) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '2' } });
        }
        if (harvesters1.length == 0) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '1' } });
        }
        if (harvesters3.length == 0 && Game.rooms['E32N53'].find(FIND_MINERALS, {
            filter: (mineral) => {
                return mineral.mineralAmount > 0
            }
        }).length > 0) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '3' } });
        }


    }


    // if (armyAttackers.length < 1) {
    //     var newName = 'amryAttacker' + Game.time;
    //     Game.spawns[spawnName].spawnCreep(
    //         [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //             TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //             ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
    //             ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
    //             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    //         ], newName, { memory: { role: 'armyAttacker', role1: 'army' } })

    // }
    if (harvesterForContainers.length < 4 && carriers.length < 1 && harvesters.length < 1) {
        var newName = 'HarvesterForContainer' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new harvesterForContainer: ' + newName);
        }
        if (harvesterForContainers.length >= 2) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        } else {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        }

    }


    // if (travellers.length < 0 && harvesters.length >= 2 && upgraders.length >= 1) {
    //     var flag = "Flag2"
    //     var newName = 'traveller' + Game.time;
    //     if (Game.time % 10 == 0) {
    //         console.log('ROOM1 Spawning new traveller: ' + newName);
    //     }
    //     Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
    //         CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
    //         CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
    //         CARRY, CARRY,
    //         MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
    //         MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    //     ], newName, { memory: { role: 'traveller', harvesting: true, flag: flag } });
    // }
    // if (claimers.length < 0 && harvesters.length >= 2 && upgraders.length >= 1) {
    //     var flag = "Flag2"
    //     var newName = 'claimer' + Game.time;
    //     console.log('ROOM1 Spawning new claimer: ' + newName);
    //     Game.spawns[spawnName].spawnCreep([CLAIM, MOVE], newName, { memory: { role: 'claimer', harvesting: true, flag: flag } });
    // }

    if (carriers.length < 2 && harvesters.length >= 2) {
        var container1 = _.filter(Game.creeps, (creep) => creep.memory.to == '1' && creep.memory.role == 'carrier' && creep.ticksToLive >= 150 && creep.room.name == 'E32N53')
        var container2 = _.filter(Game.creeps, (creep) => creep.memory.to == '2' && creep.memory.role == 'carrier' && creep.ticksToLive >= 50 && creep.room.name == 'E32N53')
        var newName = 'carrier' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new carrier: ' + newName);
        }

        if (container2.length == 0) {
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
                newName, { memory: { role: 'carrier', harvesting: true, to: '2' } });
        } else
            if (container1.length == 0 //&& (labs[2].store[RESOURCE_HYDROXIDE] > 300 ||
                // Game.rooms['E32N53'].find(FIND_MINERALS, {
                //     filter: (mineral) => {
                //         return mineral.mineralAmount > 0
                //     }
                // }).length > 0)
            ) {
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: true, to: '1' } });
            }
    }
    if (repairers.length < 1 && links[0].room.storage.store[RESOURCE_ENERGY] >= 100000) {
        var newName = 'Repairer' + Game.time
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new repairer: ' + newName);
        }
        Game.spawns["Spawn6"].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'repairer', harvesting: true, help: '0' } });
        // Game.spawns[spawnName].spawning.setDirections([BOTTOM_RIGHT, BOTTOM_LEFT, LEFT])
    }

    // if (armyHealers.length < 2) {
    //     var newName = 'amryHealer' + Game.time;
    //     Game.spawns[spawnName].spawnCreep(
    //         [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //             HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,
    //             HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL,
    //             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
    //         ], newName, { memory: { role: 'armyHealer', role1: 'army' } })
    // }



    // spawn 生产creep时显示
    if (Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.room.name == 'E32N53') {
            if (creep.memory.role == 'harvester') {
                harvest1(creep, sources[0], containers[0], sources[1], links[0], containers[1])
            }
            if (creep.memory.role == 'carrier') {
                carry1(creep, links[2])
            }

            if (creep.memory.role == 'upgrader') {
                upgrade(creep)
            }
            if (creep.memory.role == 'harvesterForContainer') {
                roleHarvesterForContainer(creep)
            }
            if (creep.memory.role == 'builder') {
                build(creep)
            }
        }

        if (creep.room.name == 'E32N52' && creep.memory.role == 'builder') {
            build(creep)
        }
        if (creep.memory.role == 'traveller') {
            traveller(creep)
        }
        if (creep.memory.role == 'claimer') {
            claim(creep)
        }
        if (creep.memory.role == 'armyHealer') {
            heal(creep)
        }
        if (creep.memory.role == 'armyAttacker') {
            console.log(creep.room.name)
            attack(creep)
        }
        if (creep.memory.role == 'repairer') {
            repair(creep)
        }
    }
    // STRUCTURES

    // var towers = _.filter(structures, { 'structureType': 'tower' })


    // if (labs[1].store.getUsedCapacity() > 10 && labs[0].store.getUsedCapacity() > 10) {
    //     labs[2].runReaction(labs[0], labs[1])
    // }
    // labs[2].runReaction(labs[0], labs[1])
    // labs[3].runReaction(labs[1], labs[5])
    // labs[4].runReaction(labs[3], labs[2])

    if (links[1].store[RESOURCE_ENERGY] < 500) {
        links[0].transferEnergy(links[1])
    } else {
        links[0].transferEnergy(links[2])
    }
    // if (links[0].room.terminal.store[RESOURCE_ENERGY] > 12000) {
    //     links[0].room.terminal.send(RESOURCE_ENERGY, 10000, "E33N53")
    // }
    // links[2].transferEnergy(links[1])
    var powerSpawn = Game.rooms['E32N53'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_POWER_SPAWN
        }
    })

    if (powerSpawn[0].store[RESOURCE_POWER] > 0) {
        powerSpawn[0].processPower()
    }
}