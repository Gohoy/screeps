import { spawn } from './modules/spawn';

module.exports.loop = function() {
    // for (var spawnName in spawns) {
    spawn('Spawn1');
    // }
    // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.help == '1');
    // if (Game.spawns['Spawn2'].room.energyAvailable == 300) {
    //     if (builders.length >= 1) {
    //         var newName = 'Upgrader' + Game.time;
    //         Game.spawns['Spawn2'].spawnCreep([WORK, MOVE, MOVE, CARRY, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '1' } })
    //     } else {
    //         var newName = 'Builder' + Game.time;
    //         Game.spawns['Spawn2'].spawnCreep([WORK, MOVE, MOVE, CARRY, CARRY], newName, { memory: { role: 'builder', harvesting: true, help: '1' } })
    //     }

    // }
    var structures = Game.structures;
    var links = _.filter(structures, { 'structureType': 'link' });
    // links[0].transferEnergy(links[1])
    // console.log(JSON.stringify(links[0]))
}