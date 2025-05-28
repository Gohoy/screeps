import { init } from "./modules/static/init";
import { spawn0 } from "./modules/spawn0";
import { travel } from "./modules/travel";
import { cacheObjects } from "./modules/utils/cacheObjects";
import { sendResources } from "./modules/utils/sendResources";
module.exports.loop = function () {
  // 这几行代码用来更新预制静态数据，比如

  for (var room in Game.rooms) {
    if (["E31N53", "E32N53", "E33N53", "E32N52"].includes(room)) {
      if (!Game.rooms[room].memory.objects) {
        cacheObjects();
      }
    }
  }

  init();
  var shard2HasCreep = false;
  var shard2HasConstructsite = false;
  // 获取所有建筑基地，获取在E30N50的

  if (!Game.rooms["E32N53"]) {
    if (Game.creeps["travellerE30N50"]) {
      shard2HasCreep = true;
      Game.creeps["travellerE30N50"].room.createConstructionSite(
        4,
        39,
        STRUCTURE_CONTAINER
      );
      shard2HasConstructsite = true;
    }

    console.log(Game.cpu.bucket);
    if (Game.cpu.bucket == 10000) {
      Game.cpu.generatePixel();
    }
    return;
  }
  if (Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
  }
  // 死亡creep 的memory清理
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  sendResources([
    {
      from: "E32N53",
      to: "E33N55",
      resource: RESOURCE_ENERGY,
      amount: 10000,
      storageMoreThan: 400000,
    },
    {
      from: "E31N53",
      to: "E31N54",
      resource: RESOURCE_ENERGY,
      amount: 10000,
      storageMoreThan: 400000,
    },
  ]);
  for (var room in Memory.rooms) {
    if (["E31N53", "E32N53", "E33N53", "E32N52"].includes(room)) {
      spawn0(room);
    }
  }
  // if (!shard2HasConstructsite && !shard2HasCreep) {
  //   travel("Spawn11", "5c0e406c504e0a34e3d61d68");
  // }
};
