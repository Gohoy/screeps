export const roleClaimer = function toFlag1(creep) {

    // 获取旗帜
    var flags = Game.flags
    var flag = creep.memory.flag
    if (creep.room.name == "W58N26") {
        if (flag == 'Flag1') {
            creep.moveTo(flags["Flag1"])
        } else {
            creep.moveTo(flags["Flag2"])
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