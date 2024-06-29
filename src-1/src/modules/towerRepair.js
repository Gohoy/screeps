export const towerRepair = function (tower) {
    var structureNeedRepairedDanger = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax && (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER);
        }
    })
    var structureNeedRepaired = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART);
        }
    })
    // var rampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return ((structure.structureType == STRUCTURE_RAMPART && structure.hits < 1000000) || (structure.structureType == STRUCTURE_WALL && structure.hits < 1000000))
    //     }
    // })
    var invader = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner.username == 'Invader'
        }
    });
    // var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
    //     filter: (creep) => {
    //         return creep.owner.username != 'Invader'
    //     }
    // });
    if (invader) {
        tower.attack(invader)
    }
    // else if (target) {
    //     // tower.repair(rampart)
    // } 
    else if (structureNeedRepairedDanger) {
        tower.repair(structureNeedRepairedDanger);
    } else if (tower.store[RESOURCE_ENERGY] > 400) {
        if (structureNeedRepaired) {
            tower.repair(structureNeedRepaired)
        }
        // else if (rampart) {
        //     tower.repair(rampart)
        // }
    }
}