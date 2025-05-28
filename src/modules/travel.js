export const travel = function (spawnName, targetId) {
  var observer = Game.getObjectById("6347c9d22f000b649d857d74");
  observer.observeRoom("E30N50");
  var target = Game.getObjectById(targetId);
  if (!Game.creeps["travellerE30N50"]) {
    Game.spawns[spawnName].spawnCreep(
      [MOVE, MOVE, MOVE, MOVE],
      "travellerE30N50"
    );
  } else {
    console.log(Game.creeps["travellerE30N50"].pos);
    Game.creeps["travellerE30N50"].moveTo(target);
  }
};
