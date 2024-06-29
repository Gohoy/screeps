//如果这个creep不存在或者ticksToLive < 100 则生成
export const addCreep = function (memory) {
    var room = Memory.rooms[memory.room]
    if (Game.creeps[`${memory.name}`] && Game.creeps[`${memory.name}`].ticksToLive > 100) {
        return
    }
    room.creepToSpawn[memory.name] = memory
}