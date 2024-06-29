export const towerRepair = function(tower) {
    var structureNeedRepairedDanger = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax;
        }
    })
    var structureNeedRepaired = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax;
        }
    })
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        tower.attack(target)
    } else if (structureNeedRepairedDanger) {
        tower.repair(structureNeedRepairedDanger);
    } else {
        tower.repair(structureNeedRepaired)
    }
}