export const repair0 = function (creep) {
    if (!creep.memory) {
        return
    }
    var structures = Memory.rooms[creep.room.name].objects
    var rampartTargetHits = structures.rampartTargetHits;
    var ramparts = structures.rampart.filter(rampart => {
        return Game.getObjectById(rampart).hits < rampartTargetHits
    })
    if (ramparts.length == 0) {
        structures.rampartTargetHits = rampartTargetHits + 10000000
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] <= 5) {
        creep.memory.harvesting = true
    }


    creep.memory.from = creep.room.storage.id
    creep.memory.to = ramparts[0]

    if (creep.memory.harvesting) {
        creep.say("粉刷本领强🥰")
        if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from))
        }
    } else {

        creep.say("我是小小粉刷匠🥰")
        var res = creep.repair(Game.getObjectById(creep.memory.to))
        if (res == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.to))
        }
    }

}