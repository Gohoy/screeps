import { init } from "./modules/static/init";
import { spawn0 } from "./modules/spawn0";
import { travel } from "./modules/travel";
 import { cacheObjects } from "./modules/utils/cacheObjects";
module.exports.loop = function () {
    // 这几行代码用来更新预制静态数据，比如
    // for(var room in Game.rooms){
    //     cacheObjects(room)
    // }
    // init()

    if (!Game.rooms["E32N53"]) {
        console.log(Game.cpu.bucket)
        if (Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel()
        }
        return
    }
    if (Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel()
    }
    // 死亡creep 的memory清理
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (var room in Memory.rooms) {
        spawn0(room);
    }

}