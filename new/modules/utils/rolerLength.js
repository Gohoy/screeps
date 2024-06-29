export const rolerLength = function(RoleName, RoomName, ticksToLive) {
    if (ticksToLive == null) {
        ticksToLive = 70
    }
    var res = _.filter(Game.creeps, (creep) => creep.memory.role == RoleName && creep.ticksToLive >= ticksToLive && creep.room.name == RoomName)
    return res
}