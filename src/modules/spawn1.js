import { roleBuilder } from "./roleBuilder";
import { roleUpgrader } from "./roleUpgrader";
import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { rolerLength } from "./utils/rolerLength";
export const spawn1 = function (spawnName) {


    var harvesters = rolerLength('harvester', 'E32N52');

    var builders = rolerLength('builder', 'E32N52');

    var upgraders = rolerLength('upgrader', 'E32N52');

    var harvesterForContainers = rolerLength('harvesterForContainer', 'E32N52');

    // var travellers = rolerLength('traveller', 'E32N52');

    // var claimers = rolerLength('claimer', 'E32N52');

    // var carriers = rolerLength('carrier', 'E32N52')

    // var constructionSites = Game.rooms['E32N52'].find(FIND_CONSTRUCTION_SITES)


    if (upgraders.length < 3 && harvesters.length >= 2) {
        var newName = 'upgrader' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new upgrader: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
    }

    if (builders.length < 0 && harvesters.length >= 2) {
        var newName = 'Builder' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new builder: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    }

    // if (claimers.length < 1 && harvesters.length >= 2 && travellers.length >= 2 && defenders.length > 1) {
    //     var newName = 'Claimer' + Game.time
    //     console.log('ROOM2 Spawning new Claimer' + newName)
    //     Game.spawns[spawnName].spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'claimer', flag: 'Flag2' } })
    // }

    if (harvesters.length < 0) {
        var newName = 'Harvester' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new harvester: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvester', harvesting: true, help: '0' } });
    }


    if (harvesterForContainers.length < 3 && harvesters.length == 0) {
        var newName = 'HarvesterForContainer' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new harvesterForContainer: ' + newName);
        }
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
    }

    // if (healers.length < 0 && harvesters.length >= 2) {
    //     var newName = 'healer' + Game.time;
    //     console.log('ROOM2 Spawning new healer: ' + newName);
    //     Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, MOVE, MOVE, CARRY, MOVE], newName, { memory: { role: 'healer', harvesting: true, help: '0' } });
    // }

    // if (travellers.length < 2 && harvesters.length >= 2 && upgraders.length >= 1 && builders.length >= 1) {
    //     // var flag1s = _.filter(Game.creeps, (creep) => creep.memory.flag == 'Flag1' && creep.memory.role == 'traveller')
    //     // var flag2s = _.filter(Game.creeps, (creep) => creep.memory.flag == 'Flag2' && creep.memory.role == 'traveller')
    //     // var flag3s = _.filter(Game.creeps, (creep) => creep.memory.flag == 'Flag3' && creep.memory.role == 'traveller')
    //     // if (flag3s.length <= flag1s.length && flag3s.length < flag2s.length) {
    //     //     var flag = "Flag3"
    //     // } else 
    //     // if (flag1s.length < flag2s.length) {
    //     //     var flag = "Flag1"
    //     // } else {
    //     //     var flag = "Flag2"
    //     // }
    //     var flag = "Flag2"
    //     var newName = 'traveller' + Game.time;
    //     console.log('ROOM2 Spawning new traveller: ' + newName);
    //     Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'traveller', harvesting: true, flag: flag, help: '0' } });
    // }



    // if (defenders.length < 2 && harvesters.length >= 2 && travellers.length >= 2 && upgraders.length >= 1) {
    //     var newName = 'defender' + Game.time;
    //     console.log('ROOM2 Spawning new defender: ' + newName);
    //     Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //         TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //         TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE,
    //         MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK
    //     ], newName, { memory: { role: 'defender', harvesting: true, help: '0' } })
    // }

    // if (carriers.length < 2 && harvesters.length >= 2 && travellers.length >= 2 && upgraders.length >= 1 && builders.length >= 1 && defenders.length > 1) {
    //     var container1 = _.filter(Game.creeps, (creep) => creep.memory.to == '2,19' && creep.memory.role == 'carrier')
    //     var container2 = _.filter(Game.creeps, (creep) => creep.memory.to == '34,26' && creep.memory.role == 'carrier')
    //     var container3 = _.filter(Game.creeps, (creep) => creep.memory.to == '39,30' && creep.memory.role == 'carrier')
    //     var newName = 'carrier' + Game.time;
    //     console.log('ROOM2 Spawning new carrier: ' + newName);
    //     Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'carrier', harvesting: true, help: '0', to: '2,19' } });
    // }






    // if (harvesters.length >= 3 && travellers.length >= 2 && upgraders.length >= 1 && defenders.length > 1 && carriers.length >= 2) {

    //     // 给1级spawn援助
    //     if (_.filter(Room.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.help == '1').length == 0) {
    //         var newName = 'HelperUpgrader' + Game.time;
    //         Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE,WORK,WORK,MOVE], newName, { memory: { role: 'upgrader', harvesting: true, help: '1' } });
    //     }
    //     if (_.filter(Room.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.help == '1').length == 0) {
    //         var newName = 'HelperBuilder' + Game.time;
    //         Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE,WORK,WORK,MOVE], newName, { memory: { role: 'builder', harvesting: true, help: '1' } });
    //     }
    //     console.log(_.filter(Room.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.help == '1').length)
    //     if (_.filter(Room.creeps, (creep) => creep.memory.role == 'defender' && creep.memory.help == '1').length == 0) {
    //         var newName = 'HelperDefender' + Game.time;
    //         Game.spawns[spawnName].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //             TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
    //             TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE,
    //             MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK
    //         ], newName, { memory: { role: 'defender', harvesting: true, help: '1' } })
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
        if (Game.creeps[name].room.name == 'E32N52') {
            var creep = Game.creeps[name];
            if (creep.memory.role == 'harvester') {
                roleHarvesterForContainer(creep);
            }
            if (creep.memory.role == 'upgrader') {
                roleUpgrader(creep)
            }
            if (creep.memory.role == 'builder') {
                roleBuilder(creep)
            }
            if (creep.memory.role == 'harvesterForContainer') {
                roleHarvesterForContainer(creep);
            }
        }
    }


    // // STRUCTURES

    // var structures = Game.structures
    // var towers = _.filter(structures, { 'structureType': 'tower' })

    // towerRepair(towers[0])
    // towerRepair(towers[1])
}