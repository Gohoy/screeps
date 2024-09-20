import { build } from "./build";
import { carry1 } from "./carry1";
import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { attack } from "./attack";
import { upgrade } from "./upgrade";
import { harvest1 } from "./harvest1";
import { rolerLength } from "./utils/rolerLength";
import { repair } from "./repair";


export const spawn11 = function (spawnName) {

    var harvesters = rolerLength('harvester', 'E33N53');

    var builders = rolerLength('builder', 'E33N53');

    var upgraders = rolerLength('upgrader', 'E33N53');

    var harvesterForContainers = rolerLength('harvesterForContainer', 'E33N53');

    // var travellers = rolerLength('traveller', 'E33N53');

    // var claimers = rolerLength('claimer', 'E33N53');

    var carriers = rolerLength('carrier', 'E33N53')

    var attackers = rolerLength('attacker', 'E33N53')
    var constructionSites = Game.rooms['E33N53'].find(FIND_CONSTRUCTION_SITES)
    var repairers = rolerLength('repairer', 'E33N53', 110);

    // var structures = Game.rooms['E33N53'].find(FIND_STRUCTURES)

    var links = Game.rooms['E33N53'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == 'E33N53')
        }
    })
    // var labs = Game.rooms['E33N53'].find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_LAB && structure.room.name == 'E33N53')
    //     }
    // })

    var containers = Game.rooms['E33N53'].find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER && structure.room.name == 'E33N53')
        }
    })

    var target = links[0].room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner.username != 'Invader' && creep.body[10].type == "attack"
        }
    })
    if (target && target[0]) {
        target = target[0]
    }


    var sources = Game.rooms['E33N53'].find(FIND_SOURCES)
    if (Game.time % 10 == 0) {
        console.log('ROOM2: harvester: ' + harvesters.length + ' builder:' + builders.length + ' upgrader:' + upgraders.length + ' carrier:' + carriers.length + ' harvesterForContainer:' + harvesterForContainers.length)
    }
    // 设置各种role的数量和组件
    if (upgraders.length < 1 && harvesters.length >= 2 && carriers.length >= 1) {
        var newName = 'upgrader' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new upgrader: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
    }
    // if (builders.length < 1 && harvesters.length >= 2 && Object.keys(constructionSites).length != 0 && carriers.length >= 2) {
    //     var newName = 'builder' + Game.time;
    //     if (Game.time % 10 == 0) {
    //         console.log('ROOM1 Spawning new builder: ' + newName);
    //     }
    //     Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    // }
    if (builders.length < 1 && harvesters.length >= 2 && Object.keys(constructionSites).length != 0 && carriers.length >= 1) {
        var newName = 'Builder' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new builder: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    }

    if (repairers.length < 1 && links[0].room.storage.store[RESOURCE_ENERGY] >= 100000) {
        var newName = 'Repairer' + Game.time
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new repairer: ' + newName);
        }
        Game.spawns["Spawn2"].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'repairer', harvesting: true, help: '0' } });
        // Game.spawns[spawnName].spawning.setDirections([BOTTOM_RIGHT, BOTTOM_LEFT, LEFT])
    }
    if (harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new harvester: ' + newName);
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
        if (harvesters3.length == 0 && Game.rooms['E33N53'].find(FIND_MINERALS, {
            filter: (mineral) => {
                return mineral.mineralAmount > 0
            }
        }).length > 0) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: '3' } });
        }


    }
    // if (target && attackers.length < 2) {
    //     Game.spawns["Spawn8"].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
    //         ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
    //         ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
    //         ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK,
    //         ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], "attacker", { memory: { role: "attacker", to: target } })
    // }


    // if (claimers.length < 1 && harvesters.length >= 2 && travellers.length >= 2 && defenders.length > 1) {
    //     var newName = 'Claimer' + Game.time
    //     console.log('ROOM2 Spawning new Claimer' + newName)
    //     Game.spawns[spawnName].spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'claimer', flag: 'Flag2' } })
    // }


    if (harvesterForContainers.length < 4 && carriers.length < 1) {
        var newName = 'HarvesterForContainer' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new harvesterForContainer: ' + newName);
        }
        if (harvesterForContainers.length >= 2) {
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        } else {
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        }

    }


    if (carriers.length < 2 && harvesters.length >= 2) {
        // var container1 = _.filter(Game.creeps, (creep) => creep.memory.to == '1' && creep.memory.role == 'carrier' && creep.ticksToLive > 70 && creep.room.name == 'E33N53')
        var container2 = _.filter(Game.creeps, (creep) => creep.memory.to == '2' && creep.memory.role == 'carrier' && creep.ticksToLive > 70 && creep.room.name == 'E33N53')
        // console.log(container1.length == 0)
        var newName = 'carrier' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new carrier: ' + newName);
        }
        if (container2.length == 0) {
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: true, to: '2' } });
        } else
        //  if (container1.length == 0 && Game.rooms['E33N53'].find(FIND_MINERALS, {
        //         filter: (mineral) => {
        //             return mineral.mineralAmount > 0
        //         }
        //     }).length > 0)
        {
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: true, to: '1' } });
        }
    }

    // spawn 生产creep时显示
    if (Game.spawns[spawnName].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1,
            Game.spawns[spawnName].pos.y, { align: 'left', opacity: 0.8 });
    }
    for (var name in Game.creeps) {
        if (Game.creeps[name].room.name == 'E33N53') {
            var creep = Game.creeps[name];

            if (creep.memory.role == 'harvester') {
                harvest1(creep, sources[0], links[0], sources[1], containers[0], containers[1])
            }
            if (creep.memory.role == 'carrier') {
                carry1(creep, links[1])
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
            if (creep.memory.role == 'repairer' && links[3]) {
                repair(creep, links[2])
            }



        }

    }

    if (target && attackers[0]) {
        attack(attackers[0], target, 47, 9)
        if (attackers[1]) {
            attack(attackers[1], target, 47, 10)
        }
    }

    // // STRUCTURES


    // console.log(links)
    // var towers = _.filter(structures, { 'structureType': 'tower' })


    // towerRepair(towers[0])
    // towerRepair(towers[1])
    // towerRepair(towers[2])
    // towerRepair(towers[3])
    // towerRepair(towers[4])
    // towerRepair(towers[5])

    // if (labs[1].store.getUsedCapacity() > 10 && labs[0].store.getUsedCapacity() > 10) {
    //     labs[2].runReaction(labs[0], labs[1])
    // }
    // labs[2].runReaction(labs[0], labs[1])
    // if (links[3]) {
    //     links[1].transferEnergy(links[3])
    // }
    // if (links[3] && links[3].store[RESOURCE_ENERGY] < 500) {
    //     links[0].transferEnergy(links[3])
    //     // links[2].transferEnergy(links[1])
    // } else 
    if (links[2] && links[2].store[RESOURCE_ENERGY] < 750) {
        links[0].transferEnergy(links[2])
        links[1].transferEnergy(links[2])
    } else {
        links[0].transferEnergy(links[1]);
    }

    // if (links[0].room.terminal.store[RESOURCE_ENERGY] > 12000 && links[0].room.storage.store[RESOURCE_ENERGY] > 200000) {
    //     links[0].room.terminal.send(RESOURCE_ENERGY, 10000, 'E31N53')
    // }
}