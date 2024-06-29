import { cacheObjects } from './utils/cacheObjects'
import { spawn } from './spawn'
import { work } from './work'
module.exports.loop = function () {

    for (var name in Memory.creeps) {
        if (Game.creeps[name] && Game.creeps[name].ticksToLive == 100) {
            Game.rooms[Memory.creeps[name].room].memory.creepToSpawn[name] = Memory.creeps[name];
        }

        if (!Game.creeps[name]) {
            //维护一个memory.creeps.roomName.role的队列
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);

        } else {
            console.log("Work")
            work(Game.creeps[name])
        }

    }

    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName]
        if (!room.memory.specificStructures) {
            cacheObjects(roomName)
            console.log(roomName + " cached ")
        }
        spawn(roomName)
    }


}




