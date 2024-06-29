import { createContainers } from "../utils/createContainers"
import { flashMemory } from "../utils/flashMemory"
import { harvestingOrNot } from "../utils/harvestingOrNot"
import { setCreepTo } from "../utils/setCreepTo"

export const harvest = function (creep) {
    harvestingOrNot(creep)

    var from = Game.getObjectById(creep.memory.from)
    var to = Game.getObjectById(creep.memory.to)

    creep.moveTo(to)
    if (creep.memory.harvesting) {
        if (creep.harvest(from) == ERR_NOT_IN_RANGE) {
            creep.moveTo(from)
        }
    } else {
        if (to != null) {
            if (creep.transfer(to, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(to)
            }else if(creep.transfer(to,RESOURCE_ENERGY) == OK){
                creep.transfer(to,RESOURCE_ENERGY)
                creep.harvest(from)
            } 
            else if (to.progress < to.progressTotal) {
                if (creep.build(to) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(to)
                } else {
                    creep.harvest(from)
                    creep.build(to)
                }

            } else {
                creep.say("err")
            }
        } else {
            flashMemory(creep.room.name)
        }
    }
}