import { spawnCreep } from "./utils/spawnCreep";
import { initCrepp } from "./utils/initCreep";
export const spawn = function (roomName) {

    //spawn
    var room = Game.rooms[roomName];
    var spawns = Game.spawns;
    var spawn0 = spawns['Spawn1'];
    var specificStructures = room.memory.specificStructures;

    //event

    console.log(JSON.stringify(room.getEventLog()));

    //creep
    // room.memory.creeps;
    // if (!Memory.creeps[`${roomName}`]) {
    //     Memory.creeps[`${roomName}`] = {}
    // }
    // if (!Memory.creeps[`${roomName}`]['harvester']) {
    //     Memory.creeps[`${roomName}`]['harvester'] = {};
    //     // var bodyParts = [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY]
    //     var bodyParts = [WORK, MOVE, CARRY];

    //     for (var i = 0; i < 2; i++) {
    //         var creepMemory$i = {
    //             room: roomName,
    //             role: "harvester",
    //             harvesting: true,
    //             bodyParts: bodyParts
    //         };
    //         creepMemory$i.name = `${roomName}harvester${i}`;
    //         creepMemory$i.from = specificStructures[`source${i}`];
    // creepMemory$i.to = specificStructures[`source${i}Link`] || specificStructures[`source${i}Container`];
    // if (!creepMemory$i.to && room.storage) {
    //     creepMemory$i.to = room.storage.id;
    // }
    // if (!creepMemory$i.to) {
    //     creepMemory$i.to = spawn0.id;
    // }
    // if (!room.memory.creepToSpawn) {
    //     room.memory.creepToSpawn = {}
    // }
    //         room.memory.creepToSpawn[`${creepMemory$i.name}`] = creepMemory$i;

    //     }
    // }


    // var creepToDead = room.memory.creepDeadTimeline[0]
    // //todo 创建需要生成的creep队列
    // if (creepToDead && Game.time + 100 >= creepToDead.deadTime) {
    //     room.memory.creepToSpawn[`${creepToDead.name}`] = creepToDead
    //     delete room.memory.creepDeadTimeline[0]
    //     console.log(`add dead ${creepToDead.name} to spawn`)
    //     console.log("                          " + JSON.stringify(room.memory.creepToSpawn["W2N7harvester0"]))
    // }
    if (!room.memory.creepToSpawn) {
        initCrepp(roomName)
    }
    spawnCreep(spawn0);

};