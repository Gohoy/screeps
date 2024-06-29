export const heal = function(creep) {
    var flags = Game.flags
    var targetHurted = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: (creep) => {
            return creep.memory.role1 == 'army' && creep.hits < creep.hitsMax
        }
    })
    var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: (creep) => {
            return creep.memory.role == 'armyAttacker'
        }
    })

    if (targetHurted) {
        if (creep.heal(targetHurted) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targetHurted)
        }
    } else if (target) {
        // console.log(JSON.stringify(target.pos))
        creep.say(creep.moveTo(target))
        creep.moveTo(target)

    } else {
        creep.moveTo(flags['Flag8'])
    }

}