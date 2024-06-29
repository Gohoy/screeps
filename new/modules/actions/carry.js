import { harvestingOrNot } from "../utils/harvestingOrNot"

export const carry = function(creep){
    harvestingOrNot(creep)
    var from = Game.getObjectById(creep.memory.from)
    var to = Game.getObjectById(creep.memory.to)
    if(creep.memory.harvesting){
        if(creep.withdraw(from,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(from)
        }
    }else{
        if(creep.transfer(to,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            creep.moveTo(to)
        }
    }
}