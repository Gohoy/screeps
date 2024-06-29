import { roleUpgrader } from './roleUpgrader';
import { roleBuilder } from './roleBuilder';
import { roleHarvesterForContainer } from './roleHarvesterForContainer';
import { roleHealer } from './roleHealer';
import { roleTraveller } from './roleTraveller';
import { roleDefender } from './roleDefender';
// import { roleHarvester } from './roleHarvester';
import { towerRepair } from './towerRepair';
import { roleCarrier } from './roleCarrier';
import { roleClaimer } from './roleClaimer';
export const spawn = function(spawnName) {

    for (var name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }


    // 死亡creep 的memory清理
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // 获取各种role对应的数目
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builders: ' + builders.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('upgraders: ' + upgraders.length);

    var harvesterForContainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterForContainer');
    console.log('harvesterForContainers: ' + harvesterForContainers.length);

    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    console.log('healers: ' + healers.length);

    var travellers = _.filter(Game.creeps, (creep) => creep.memory.role == 'traveller');
    console.log('travellers: ' + travellers.length);

    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    console.log('claimers: ' + claimers.length);

    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    console.log('defenders:' + defenders.length)

    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    console.log('carriers:' + carriers.length)

    // 设置各种role的数量和组件
    if (upgraders.length < 3 && harvesters.length >= 2) {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
    }

    if (builders.length < 3 && harvesters.length >= 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    }

    // if (claimers.length < 1 && harvesters.length >= 2 && travellers.length >= 2 && defenders.length > 1) {
    //     var newName = 'Claimer' + Game.time
    //     console.log('Spawning new Claimer' + newName)
    //     Game.spawns[spawnName].spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'claimer', flag: 'Flag2' } })
    // }

    if (harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester', harvesting: true, help: '0' } });
    }


    if (harvesterForContainers.length < 2 && harvesters.length == 0) {
        var newName = 'HarvesterForContainer' + Game.time;
        console.log('Spawning new harvesterForContainer: ' + newName);
        Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
    }

    // if (healers.length < 0 && harvesters.length >= 2) {
    //     var newName = 'healer' + Game.time;
    //     console.log('Spawning new healer: ' + newName);
    //     Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, MOVE, MOVE, CARRY, MOVE], newName, { memory: { role: 'healer', harvesting: true, help: '0' } });
    // }

    if (travellers.length < 2 && harvesters.length >= 2 && upgraders.length >= 1 && builders.length >= 1) {
        // var flag1s = _.filter(Game.creeps, (creep) => creep.memory.flag == 'Flag1' && creep.memory.role == 'traveller')
        // var flag2s = _.filter(Game.creeps, (creep) => creep.memory.flag == 'Flag2' && creep.memory.role == 'traveller')
        // var flag3s = _.filter(Game.creeps, (creep) => creep.memory.flag == 'Flag3' && creep.memory.role == 'traveller')
        // if (flag3s.length <= flag1s.length && flag3s.length < flag2s.length) {
        //     var flag = "Flag3"
        // } else 
        // if (flag1s.length < flag2s.length) {
        //     var flag = "Flag1"
        // } else {
        //     var flag = "Flag2"
        // }
        var flag = "Flag2"
        var newName = 'traveller' + Game.time;
        console.log('Spawning new traveller: ' + newName);
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'traveller', harvesting: true, flag: flag, help: '0' } });
    }



    // if (defenders.length < 2 && harvesters.length >= 2 && travellers.length >= 2 && upgraders.length >= 1) {
    //     var newName = 'defender' + Game.time;
    //     console.log('Spawning new defender: ' + newName);
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
    //     console.log('Spawning new carrier: ' + newName);
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
        if (creep.memory.role == 'healer') {
            roleHarvesterForContainer(creep);
        }
        if (creep.memory.role == 'traveller') {
            roleTraveller(creep);
        }
        if (creep.memory.role == 'claimer') {
            roleClaimer(creep);
        }
        if (creep.memory.role == 'defender') {
            roleDefender(creep)
        }

        if (creep.memory.role == 'carrier') {
            roleCarrier(creep)
        }
    }



    // STRUCTURES

    var structures = Game.structures
    var towers = _.filter(structures, { 'structureType': 'tower' })

    towerRepair(towers[0])
    towerRepair(towers[1])
}