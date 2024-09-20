export const claim = function toFlag1(creep) {

    // 获取旗帜
    var flags = Game.flags
    var flag = creep.memory.flag
    if (creep.room.name != "E32N52") {
        if (flag == 'Flag2') {
            creep.moveTo(flags["Flag6"])
        }

    } else {
        var controller = creep.room.controller
        if (creep.claimController(controller) != ERR_GCL_NOT_ENOUGH) {
            if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller)
            }
        } else {

            if (creep.reserveController(controller) == ERR_GCL_NOT_ENOUGH) {
                creep.say("ERR_GCL_NOT_ENOUGH")
            }
            if (creep.reserveController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller)
            }
        }
    }
}