import { controller } from './modules/controller';
import {spawnFinal} from './modules/spawnFinal'

module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var rooms = Object.keys(Game.rooms);
    for (var i = 0; i < rooms.length; i++) {
        controller(rooms[i])
       spawnFinal(rooms[i])
    }

}