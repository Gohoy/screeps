import { build } from "./build";
import { carry1 } from "./carry1";
import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { towerRepair } from "./towerRepair";
import { upgrade } from "./upgrade";
import { harvest1 } from "./harvest1";
import { claim } from "./claim";
import { rolerLength } from './utils/rolerLength';
import { repair } from "./repair";
export const spawn3 = function (spawnName) {

    // 死亡creep 的memory清理

    var harvesters = rolerLength('harvester', 'E32N52');

    var builders = rolerLength('builder', 'E32N52');

    var upgraders = rolerLength('upgrader', 'E32N52');

    var harvesterForContainers = rolerLength('harvesterForContainer', 'E32N52');

    // var travellers = rolerLength('traveller', 'E32N52');

    // var claimers = rolerLength('claimer', 'E32N52');

    var carriers = rolerLength('carrier', 'E32N52')

    var constructionSites = Game.rooms['E32N52'].find(FIND_CONSTRUCTION_SITES)

    // var structures = Game.rooms['E32N52'].find(FIND_STRUCTURES)

    // var armyAttackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'armyAttacker' && creep.ticksToLive >= 150)

    var repairers = rolerLength('repairer', 'E32N52')
    var links = Game.rooms['E32N52'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == 'E32N52')
        }
    })
    // var labs = Game.rooms['E32N52'].find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_LAB && structure.room.name == 'E32N52')
    //     }
    // })
    var containers = Game.rooms['E32N52'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER && structure.room.name == 'E32N52')
        }
    })

    var sources = Game.rooms['E32N52'].find(FIND_SOURCES)

    if (Game.time % 10 == 0) {
        console.log('ROOM3: harvester: ' + harvesters.length + ' builder:' + builders.length + ' upgrader:' + upgraders.length + ' carrier:' + carriers.length + ' harvesterForContainer:' + harvesterForContainers.length)
    }
    // 设置各种role的数量和组件
    if (upgraders.length < 1 && harvesters.length >= 2) {
        var newName = 'upgrader' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM3 Spawning new upgrader: ' + newName);
        }
        // Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,WORK,WORK,WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        Game.spawns[spawnName].spawnCreep([WORK, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });

    }

    if (builders.length < 1 && harvesters.length >= 2 && Object.keys(constructionSites).length != 0) {
        var newName = 'Builder' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM3 Spawning new builder: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    }

    if (repairers.length < 1 && links[0].room.storage.store[RESOURCE_ENERGY] >= 100000) {
        var newName = 'Repairer' + Game.time
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new repairer: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'repairer', harvesting: true, help: '0' } });
        // Game.spawns[spawnName].spawning.setDirections([BOTTOM_RIGHT, BOTTOM_LEFT, LEFT])
    }

    if (harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM3 Spawning new harvester: ' + newName);
        }
        var harvesters1 = harvesters.filter((harvester) => { return harvester.memory.source == '1' })
        var harvesters2 = harvesters.filter((harvester) => { return harvester.memory.source == '2' })
        var harvesters3 = harvesters.filter((harvester) => { return harvester.memory.source == '3' })
        if (harvesters2.length == 0) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '2' } });
        } else
            if (harvesters1.length == 0) {
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '1' } });
            } else
                if (harvesters3.length == 0 && Game.rooms['E32N52'].find(FIND_MINERALS, {
                    filter: (mineral) => {
                        return mineral.mineralAmount > 0
                    }
                }).length > 0) {
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '3' } });
                }
    }

    if (harvesterForContainers.length < 4 && harvesters.length < 2 && carriers.length < 1) {
        var newName = 'HarvesterForContainer' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM3 Spawning new harvesterForContainer: ' + newName);
        }
        if (harvesterForContainers.length >= 2) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        } else {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        }

    }



    if (carriers.length < 2) {
        var newName = 'carrier' + Game.time;
        var container1 = _.filter(Game.creeps, (creep) => creep.memory.to == '2' && creep.memory.role == 'carrier' && creep.ticksToLive >= 70 && creep.room.name == 'E32N52')
        // var container2 = _.filter(Game.creeps, (creep) => creep.memory.to == '2' && creep.memory.role == 'carrier' && creep.ticksToLive >= 70 && creep.room.name == 'E32N52')
        if (container1.length == 0) {
            // Game.spawns[spawnName].spawnCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'carrier', harvesting: 'true', to: '2', id: '1' } })
            Game.spawns[spawnName].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'carrier', harvesting: 'true', to: '2' } })

        } else {
            // Game.spawns[spawnName].spawnCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'carrier', harvesting: 'true', to: '2', id: '0' } })
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: 'true', to: '1' } })

        }

        if (Game.time % 10 == 0) {
            console.log('ROOM4 Spawning new carrier: ' + newName);
        }
    }
    //     if (container2.length == 0) {
    //         Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: true, to: '2' } });
    //     } else
    //     // if (container1.length == 0 && Game.rooms['E32N52'].find(FIND_MINERALS, {
    //     //         filter: (mineral) => {
    //     //             return mineral.mineralAmount > 0
    //     //         }
    //     //     }).length > 0)
    //     {
    //         Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: true, to: '1' } });
    //     }


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
        if (creep.room.name == 'E32N52') {

            if (creep.memory.role == 'harvester') {
                harvest1(creep, sources[0], links[1], sources[1], containers[0], containers[1])
            }
            if (creep.memory.role == 'carrier') {
                carry1(creep, links[2], links[0])
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

            if (creep.memory.role == 'carrier') {
                carry1(creep, links[2])

            }
            if (creep.memory.role == 'repaier') {
                repair(creep)
            }
        }

    }

    // STRUCTURES
    // var towers = _.filter(structures, { 'structureType': 'tower' })
    // if (towers[0]) { towerRepair(towers[0]) }
    // if (towers[1]) { towerRepair(towers[1]) }
    // if (towers[2]) { towerRepair(towers[2]) }
    // if (towers[3]) { towerRepair(towers[3]) }
    // if (towers[4]) { towerRepair(towers[4]) }
    // if (towers[5]) { towerRepair(towers[5]) }


    if (links[0].store[RESOURCE_ENERGY] < 500) {
        links[1].transferEnergy(links[0])
    } else {
        links[1].transferEnergy(links[2])
    }

    // if (links[0].room.terminal.store[RESOURCE_ENERGY] > 12000) {
    //     links[0].room.terminal.send(RESOURCE_ENERGY, 10000, 'E33N53')
    // }

    // if (sources[0].room.terminal.store[RESOURCE_ENERGY] >= 12000) {
    //     sources[0].room.terminal.send(RESOURCE_ENERGY, 10000, 'E33N53')
    // }

    // links[2].transferEnergy(links[0])

    // if (labs[1].store.getUsedCapacity() > 10 && labs[0].store.getUsedCapacity() > 10) {
    //     labs[2].runReaction(labs[0], labs[1])
    // }
    // labs[2].runReaction(labs[0], labs[1])

    // towerRepair(towers[1])
    // if (links[0].room.terminal.store[RESOURCE_ENERGY] > 12000 && links[0].room.storage.store[RESOURCE_ENERGY] > 200000) {

    //     links[0].room.terminal.send(RESOURCE_ENERGY, 10000, 'E31N53');
    // }
}