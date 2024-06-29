import { addCreep } from './addCreep';

//在这里手动配置需要生成的creeps，放到待生成队列中，等待spawn
export const initCrepp = function (roomName) {
    if (!Game.rooms[roomName].memory.creepToSpawn) {
        Game.rooms[roomName].memory.creepToSpawn = {}
    }
    // console.log(Memory.rooms[roomName].creepToSpawn)
    var roomMemory = Memory.rooms[roomName]
    var specificStructures = roomMemory.specificStructures
    var harvester0 = {
        role: "harvester0",
        room: roomName,
        name: "harvester0",
        from: specificStructures["source0"],
        to: specificStructures["source0Link"] || specificStructures["source0Container"] || specificStructures[`${roomName}Spawn`],
        bodyParts: [MOVE, CARRY, WORK]
    }

    var harvester1 = {
        role: "harvester1",
        room: roomName,
        name: "harvester1",
        from: specificStructures["source1"],
        to: specificStructures["source1Link"] || specificStructures["source1Container"] || specificStructures[`${roomName}Spawn`],
        bodyParts: [MOVE, CARRY, WORK]
    }

    var upgrader = {
        role: "upgrader",
        room: roomName,
        name: "upgrader",
        from: specificStructures[`${roomName}ControllerLink`] || specificStructures[`${roomName}ControllerContainer`] || specificStructures["source0"],
        to: specificStructures[`${roomName}Controller`],
        bodyParts: [MOVE, CARRY, WORK]
    }



    console.log("addcrepp")
    addCreep(harvester0)
    addCreep(harvester1)
    addCreep(upgrader)
}