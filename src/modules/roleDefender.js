import { roleUpgrader } from "./roleUpgrader";
import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { roleCarrier } from "./roleCarrier";
export const roleDefender = function(creep) {

    // 寻找敌人
    const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    } else {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.help == '0');
        if (upgraders.length < 2) {
            roleUpgrader(creep)
        } else {
            roleCarrier(creep)
        }
    }

};