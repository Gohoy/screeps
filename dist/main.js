'use strict';

const init = function () {
    // 预置数
    const rooms = Memory.rooms;
    for (var roomName in rooms) {
        var structures = Memory.rooms[roomName].objects;
        var room = Game.rooms[roomName];
        var minerals = room.find(FIND_MINERALS);
        structures.mineral0 = minerals[0].mineralType;
        if (!structures.source0) {
            var sources = room.find(FIND_SOURCES);
            structures.source0 = room.storage.pos.findClosestByRange(FIND_SOURCES).id;
            if (sources[1] && sources[1].id == structures.source0) {
                structures.source1 = sources[0].id;
            } else if (sources[1]) {
                structures.source1 = sources[1].id;
            }
        }
        // if (!structures.sourceContainer) {
            if (Memory.rooms[roomName].objects.container) {

                var containers = Memory.rooms[roomName].objects.container;
                for (var index in containers) {
                    var container = containers[index];
                    if (Game.getObjectById(container).pos.inRangeTo(Game.getObjectById(structures.source0), 3)) {
                        structures.sourceContainer = container;
                    } else {
                        structures.mineralContainer = container;
                    }
                }
            }else {
                structures.sourceContainer = room.storage.id;
                structures.mineralContainer = room.storage.id;
            }
        // }
        // if (!structures.sourceLink) {
            if (Memory.rooms[roomName].objects.link) {
                var links = Memory.rooms[roomName].objects.link;
                for (var index in links) {
                    var link = links[index];
                    if (Game.getObjectById(link).pos.inRangeTo(Game.getObjectById(structures.source1), 3)) {
                        structures.sourceLink = link;
                    } else if (Game.getObjectById(link).pos.inRangeTo(room.controller, 3)) {
                        structures.upgradeLink = link;
                    } else if (Game.getObjectById(link).pos.inRangeTo(room.storage, 3)){
                        structures.storageLink = link;
                    }
                }
            }
        // }
        // console.log(roomName)
        // console.log(structures.sourceContainer)
        // console.log('.......')
    }
};

const repair0 = function (creep) {
    if (!creep.memory) {
        return
    }
    var structures = Memory.rooms[creep.room.name].objects;
    var rampartTargetHits = structures.rampartTargetHits;
    var ramparts = structures.rampart.filter(rampart => {
        return Game.getObjectById(rampart).hits < rampartTargetHits
    });
    if (ramparts.length == 0) {
        structures.rampartTargetHits = rampartTargetHits + 10000000;
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] <= 5) {
        creep.memory.harvesting = true;
    }


    creep.memory.from = creep.room.storage.id;
    creep.memory.to = ramparts[0];

    if (creep.memory.harvesting) {
        creep.say("粉刷本领强🥰");
        if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from));
        }
    } else {

        creep.say("我是小小粉刷匠🥰");
        var res = creep.repair(Game.getObjectById(creep.memory.to));
        if (res == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.to));
        }
    }

};

const build0 = function (creep, link) {
    if (!creep.memory) {
        return
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true;
    }

    // 有能量的storage
    var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > creep.store.getCapacity(RESOURCE_ENERGY);
        }
    });
    // 工地
    var constructure = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    // console.log(creep.room.name)
    Game.flags;

    if (constructure) {
        if (creep.memory.harvesting) {
            creep.say("干活要成本的");
            if (storage && (constructure)) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            } else {
                // 有能量的矿
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // 如果storage不能用,去找可用的矿
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                } else {
                    // 目前没有可用能源
                    creep.say("等待可用能量");
                }
            }
        } else {
            // 如果满能量去干活
            creep.say("干活 ");
            if (creep.build(constructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructure);
            }

        }
    } else {
        creep.say("repair");
        repair0(creep);
    }

};

const carry0 = function (creep) {
    if(!creep.memory){
        return
    }

    
    var structures = Memory.rooms[creep.room.name].objects;
    creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner != '{"username":"Invader"}'
        }
    });
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store.getUsedCapacity() == 0) {
        creep.memory.harvesting = true;
        creep.memory.harvestingFlag = 1;
    }
    var spawns = structures.spawn;
    structures.extension;
    // tower
    var towers = structures.tower.filter(tower => {
        return Game.getObjectById(tower).store.getFreeCapacity(RESOURCE_ENERGY) > 300;
    });


    var transferCost = 14000;
    var storage = creep.room.storage;
    var terminal = creep.room.terminal;

    var droppedSource = creep.room.find(FIND_DROPPED_RESOURCES);
    //  ----------------------------------------------------------------


    var sourceContainer = Game.getObjectById(structures.sourceContainer);
    var storageLink = Game.getObjectById(structures.storageLink);
    if (( towers || terminal.store[RESOURCE_ENERGY] < transferCost  || droppedSource || sourceContainer.store[RESOURCE_ENERGY] >= 500)) {

        creep.memory.from = storage.id;

        if (storageLink && storageLink.store[RESOURCE_ENERGY] >= 500) {
            creep.memory.from = storageLink.id;
        } else if (sourceContainer && sourceContainer.store[RESOURCE_ENERGY] >= 500) {
            creep.memory.from = sourceContainer.id;
        } else if (sourceContainer && storage.store[RESOURCE_ENERGY] < 500 && sourceContainer.store[RESOURCE_ENERGY] < 500 && !droppedSource) {
            creep.memory.from = terminal.id;
        } else if (terminal.store[RESOURCE_ENERGY] > 20000) {
            creep.memory.from = terminal.id;
        } else {
            creep.memory.from = storage.id;
        }

        var toList = creep.memory.tolist;
        var to0 = toList[0].filter((to)=>{
                return Game.getObjectById(to) && Game.getObjectById(to).store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
        var to1 = toList[1].filter((to)=>{
            return Game.getObjectById(to) && Game.getObjectById(to).store.getFreeCapacity(RESOURCE_ENERGY) > 300
        });
        if (to0.length > 0) {
            creep.memory.to = to0[0];
        } else if (to1.length > 0) {
            creep.memory.to = to1[0];
        }  else if (terminal.store[RESOURCE_ENERGY] < transferCost) {
            creep.memory.to = terminal.id;
        }else {
            creep.memory.to = storage.id;
        }

        if (_.sum(creep.store) > creep.store[RESOURCE_ENERGY]) {
            creep.memory.to = storage.id;
            creep.memory.harvesting = false;
            creep.moveTo(Game.getObjectById(creep.memory.to));
        }

    }
    if(creep.memory.from == creep.memory.to) {
        var spawn = Game.getObjectById(spawns[0]);
        creep.moveTo(spawn);
        creep.say("啊，歇一会✌️");
        spawn.renewCreep(creep);
    }else if (creep.memory.harvesting) {
        creep.say("脏累活都交给帕鲁😵");
        if (creep.pickup(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from));
        }
        if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from));
        }
    } else {

        if (creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity()) {
            for (const resourceType in creep.carry) {
                creep.transfer(storage, resourceType);
            }
        } else {
            if (creep.transfer(Game.getObjectById(creep.memory.to), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.to));
            }
        }
    }

};

const harvest0 = function(creep) {
    if(!creep.memory){
        return
    }
    var source = Game.getObjectById(creep.memory.source);
    var resourceType = creep.memory.resourceType;
        // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(resourceType) < 5) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[resourceType] == 0) {
        creep.memory.harvesting = true;
    }
    var target = Game.getObjectById(creep.memory.target);
    if (creep.memory.harvesting) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    } else  {
        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            creep.transfer(target, resourceType);
            creep.harvest(source);
        }
    }
    creep.say("😎");

};

const mineCarry0 = function (creep) {
    if (!creep.memory) {
        return
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store.getUsedCapacity() == 0) {
        creep.memory.harvesting = true;
    }

    if (!creep.memory.frombase) {
        creep.memory.frombase = Memory.rooms[creep.room.name].objects.mineralContainer;
    }
    if (!creep.memory.resourceType) {
        creep.memory.resourceType = Memory.rooms[creep.room.name].objects.mineral0;
    }
    var resourceType = creep.memory.resourceType;
    var mineralContainer = Game.getObjectById(creep.memory.frombase);
    if (mineralContainer &&  mineralContainer.store.getUsedCapacity() > 0) {
        if (creep.memory.harvesting) {
            if (creep.withdraw(mineralContainer, resourceType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mineralContainer);
                creep.withdraw(mineralContainer, resourceType);
            }
        } else {
            if (creep.room.terminal.store.getFreeCapacity() > 0) {
                creep.memory.to = creep.room.terminal.id;
            } else {
                creep.memory.to = creep.room.storage.id;
            }
            var to = Game.getObjectById(creep.memory.to);
            if (creep.transfer(to, resourceType) == ERR_NOT_IN_RANGE) {
                creep.moveTo(to);
                creep.transfer(to, resourceType);
            }
        }
    } else {
        creep.say("好闲啊");
    }
};

// import { build } from "./build";
// import { upgrade } from "./upgrade";
const roleHarvesterForContainer = function (creep) {
    if(!creep.memory){
        return
    }
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true;
    }
    creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

    // 掉落的能量
    creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: (source) => {
            return source.resourceType == RESOURCE_ENERGY;
        }
    });
    // 可用的矿
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

    // 有能量的storage 或 link
    var storageFulled = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity(RESOURCE_ENERGY)
        }
    });
    // spawn 和 extension 
    var spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    });

    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 10
        }
    });
    // storage

    // var structureNeedRepaired = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return structure.hits < 50000 && structure.structureType == STRUCTURE_CONTAINER;
    //     }
    // })
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_CONTAINER
        }
    });
    if (creep.memory.harvesting) {
        // 获取掉落的能量
        // if (droppedSource) {
        //     creep.say("捡掉落")
        //     if (creep.pickup(droppedSource) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(droppedSource)
        //     }
        // } else 
        if (storageFulled) {
            creep.say("取storage");
            if (creep.withdraw(storageFulled, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageFulled);
            }
        } else if (source) {
            creep.say("开矿");
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            creep.say("等待可用能量");
        }
    } else {
        // 先存spawn 和 extension
        if (spawnOrExtension) {
            creep.say("存spwan");
            if (creep.transfer(spawnOrExtension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawnOrExtension);
            }
        } else if (tower) {
            // 再存tower
            creep.say("存tower");
            if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower);
            }
        } else {

            if (creep.repair(containers[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[1]);
            }
        }
    }

};

const towerRepair = function (tower) {
    var structureNeedRepairedDanger = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax && (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER);
        }
    });
    var structureNeedRepaired = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.hits < structure.hitsMax && (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART);
        }
    });
    var rampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_RAMPART && structure.hits < 1000) || (structure.structureType == STRUCTURE_WALL && structure.hits < 1000))
        }
    });
    var invader = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner.username == 'Invader'
        }
    });
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner.username != 'Invader'
        }
    });
    if (invader) {
        tower.attack(invader);
    }
    else if (target) {
        // tower.repair(rampart)
        tower.attack(target);
    } 
    else if (structureNeedRepairedDanger) {
        tower.repair(structureNeedRepairedDanger);
    } else if (tower.store[RESOURCE_ENERGY] > 400) {
        if (structureNeedRepaired) {
            tower.repair(structureNeedRepaired);
        }
        else if (rampart) {
            tower.repair(rampart);
        }
    }
};

const upgrade0 = function (creep) {
    if(!creep.memory){
        return
    }
    var structures = Memory.rooms[creep.room.name].objects;
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.harvesting = false;
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.harvesting = true;
    }

    if (creep.store[RESOURCE_ENERGY] <= 11) {
        // creep.say("升级需要能量")
        // 先到storage中去能量
        var upgradeLink = structures.upgradeLink;
        var target = creep.room.storage;
        if (upgradeLink) {
            target = Game.getObjectById(upgradeLink);
        }
        creep.moveTo(target);
        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            creep.upgradeController(creep.room.controller);
        }
    } else {
        // 如果满能量去升级
        // creep.say("升级升级UP! ")
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }

};

const rolerLength = function (RoleName, RoomName, ticksToLive) {
    if (ticksToLive == null) {
        ticksToLive = 70;
    }
    var res = _.filter(Game.creeps, (creep) => creep.memory.role == RoleName && creep.ticksToLive >= ticksToLive && creep.room.name == RoomName);
    return res
};

const spawn0 = function (roomName) {
    var structures = Memory.rooms[roomName].objects;
    var room = Game.rooms[roomName];
    var sourceLink = Game.getObjectById(structures.sourceLink);
    var upgradeLink = Game.getObjectById(structures.upgradeLink);
    var storageLink = Game.getObjectById(structures.storageLink);
    if(upgradeLink && upgradeLink.store[RESOURCE_ENERGY] > 700){
        sourceLink.transferEnergy(storageLink);
    }else {
        sourceLink.transferEnergy(upgradeLink);
    }


    var harvesters = rolerLength('harvester', roomName);
    var builders = rolerLength('builder', roomName);
    var upgraders = rolerLength('upgrader', roomName);
    var harvesterForContainers = rolerLength('harvesterForContainer', roomName);
    rolerLength('traveller', roomName);
    var carriers = rolerLength('carrier', roomName);
    var repairers = rolerLength('repairer', roomName);
    var miners = rolerLength('miner', roomName);
    var mineCarriers = rolerLength('mineCarrier',roomName);
    var constructionSites = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
    if (Game.time % 10 == 0) {
        console.log(roomName + ': harvester: ' + harvesters.length + ' repairers:' + repairers.length + ' upgrader:' + upgraders.length + ' carrier:' + carriers.length + ' builder:'+builders.length);
    }


    // 得到一个可用的spawn，目前仅使用唯一一个进行生产
    var spawns = structures.spawn;
    var spawn = Game.getObjectById(spawns[0]);


    // 设置各种role的数量和组件
    if (upgraders.length < 1 && harvesters.length >= 2 && carriers.length >= 1) {
        var newName = 'upgrader' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new upgrader: ' + newName);
        }
        spawn.spawnCreep([WORK, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        // 这个是全速升级的配置
        // if (Game.rooms[roomName].storage.store[RESOURCE_ENERGY] < 20000) {
        //     spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        // } else {
        //     // spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        //    spawn.spawnCreep(
        //         [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
        //             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY
        //         ], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } });
        // }
    }


    if (builders.length < 1 && harvesters.length >= 2 && Object.keys(constructionSites).length != 0 && carriers.length >= 1) {
        var newName = 'builder' + Game.time;
        if (Game.time % 10 == 0) {
            console.log(roomName + 'Spawning new builder: ' + newName);
        }
        spawn.spawnCreep([WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], newName, { memory: { role: 'builder', harvesting: true, help: '0' } });
    }


    if (harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        if (Game.time % 10 == 0) {
            console.log(roomName + 'Spawning new harvester: ' + newName);
        }
        var harvesters0 = harvesters.filter((harvester) => { return harvester.memory.source == structures.source0 });
        var harvesters1 = harvesters.filter((harvester) => { return harvester.memory.source == structures.source1 });
        if (harvesters1.length == 0) {
            spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: structures.source1, target: structures.sourceLink,resourceType: RESOURCE_ENERGY } });
        }
        if (harvesters0.length == 0) {
            spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'harvester', harvesting: true, source: structures.source0, target: structures.sourceContainer ,resourceType:RESOURCE_ENERGY} });
        }
    }

    var minerals = room.find(FIND_MINERALS, {
        filter: (mineral) => {
            return mineral.mineralAmount > 0
        }
    });

    if (miners.length < 1 && minerals.length > 0 && harvesters.length > 1) {
        var newName = 'Miner' + Game.time;
        if (Game.time % 10 == 0) {
            console.log(roomName + 'Spawning new miner: ' + newName);
        }
        spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY], newName, { memory: { role: 'miner', harvesting: true, source: minerals[0].id, target: structures.mineralContainer,resourceType: minerals[0].mineralType} });
    }

    if (carriers.length < 1 && harvesters.length < 1 && harvesterForContainers.length < 4) {
        var newName = 'HarvesterForContainer' + Game.time;
        if (Game.time % 10 == 0) {
            console.log(roomName + 'Spawning new harvesterForContainer: ' + newName);
        }
        if (harvesterForContainers.length >= 2) {
            spawn.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        } else {
            spawn.spawnCreep([WORK, CARRY, MOVE, CARRY, MOVE], newName, { memory: { role: 'harvesterForContainer', harvesting: true, help: '0' } });
        }
    }

    if (carriers.length < 1 && harvesters.length >= 2) {
         var newName = 'carrier' + Game.time;
        if (Game.time % 10 == 0) {
            console.log(roomName +' Spawning new carrier: ' + newName);
        }
        var to1 = [...structures.spawn,...structures.extension];
        var to2 = [...structures.tower];
        var to = [to1,to2];  
            spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
                newName, { memory: { role: 'carrier', harvesting: true, frombase: structures.sourceContainer,tolist:to } });
        
    }
    if( minerals.length > 0 && mineCarriers.length < 1 && miners.length > 0 ){
        
        var newName = 'mineCarrier' + Game.time;
        if (Game.time % 10 == 0) {
            console.log(roomName +' Spawning new mineCarrier: ' + newName);
        }
        // to1 为数组的数组，元素为优先顺序获取能量的顺序
        // 第一部分  spawn extension 
        // 第二部分  tower，因为节省tower能量，只使用第一个，那么就从第一个填充

        spawn.spawnCreep([CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'mineCarrier', harvesting: true, frombase: structures.mineralContainer  } });
    }

    if ((repairers.length < 1 && room.storage.store[RESOURCE_ENERGY] >= 100000) || (repairers.length < 2 && room.storage.store[RESOURCE_ENERGY] >= 600000)) {
        var newName = 'Repairer' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM2 Spawning new repairer: ' + newName);
        }
        spawn.spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, { memory: { role: 'repairer', harvesting: true, help: '0' } });
    }

    // spawn 生产creep时显示
    if (spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y, { align: 'left', opacity: 0.8 });
    }
    towerRepair( Game.getObjectById(structures.tower[2]));
    towerRepair( Game.getObjectById(structures.tower[1]));

    // 这里进行各个creep的操作,上面已经获取了各个种类的列表
    for (var index in harvesters) {
        harvest0(harvesters[index]);
    }
    for(var index in miners){
        harvest0(miners[index]);
    }
    for(var index in carriers){
        carry0(carriers[index]);
    }
    for(var index in upgraders){
        upgrade0(upgraders[index]);
    }
    for(var index in harvesterForContainers){
        roleHarvesterForContainer(harvesterForContainers[index]);
    }
    for(var index in builders){
        build0(builders[index]);
    }
    for(var index in mineCarriers){
        mineCarry0(mineCarriers[index]);
    }
    for(var index in repairers){
        repair0(repairers[index]);
    }


if(Game.time%10000 == 0){
    // 这里控制订单
    var toSellResource =[RESOURCE_KEANIUM,RESOURCE_HYDROGEN,RESOURCE_OXYGEN,RESOURCE_HYDROXIDE];
    // 我所有的order
    var myOrders = Game.market.orders;
    // 这个房间正在出售的类型
    var roomSellResourceTypes = [];
    for(var index in myOrders){
        var myOrder = myOrders[index];
        if(myOrder.active && myOrder.roomName == roomName && myOrder.type == "sell"){
            roomSellResourceTypes.push(myOrders[index].resourceType);
        } 
    }
    var terminal = room.terminal;
    // 这里把terminal中总量超过10000的都创建出售订单
    for(var index in toSellResource){
        var resource = toSellResource[index];
        if(terminal.store[resource] >= 10000 && !roomSellResourceTypes.includes(resource)){
            Game.market.createOrder(ORDER_SELL,resource,Game.market.getHistory(resource)[14].avgPrice,10000,roomName);
        }
    }
}


};

// map 应该是 { [{from: 'E32N53',to: 'E32N52',resource: 'energy',amount: 1000,storageMoreThan: 10000}] }
const sendResources = (map) => {
  for (let i = 0; i < map.length; i++) {
    const { from, to, resource, amount, storageMoreThan } = map[i];
    const fromRoom = Game.rooms[from];
    const storage = fromRoom.storage;
    console.log(
      storage.store[resource],
      storageMoreThan,
      fromRoom.terminal.store[resource],
      amount
    );
    if (
      storage.store[resource] > storageMoreThan &&
      fromRoom.terminal.store[resource] >= amount
    ) {
      const res = fromRoom.terminal.send(resource, amount, to);
      console.log(res);
    }
  }
};

module.exports.loop = function () {
  // 这几行代码用来更新预制静态数据，比如
  // for(var room in Game.rooms){
  //     cacheObjects(room)
  // }
  init();

  if (!Game.rooms["E32N53"]) {
    console.log(Game.cpu.bucket);
    if (Game.cpu.bucket == 10000) {
      Game.cpu.generatePixel();
    }
    return;
  }
  if (Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
  }
  // 死亡creep 的memory清理
  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }

  sendResources([
    {
      from: "E32N53",
      to: "E33N55",
      resource: RESOURCE_ENERGY,
      amount: 10000,
      storageMoreThan: 400000,
    },
    {
      from: "E31N53",
      to: "E31N54",
      resource: RESOURCE_ENERGY,
      amount: 10000,
      storageMoreThan: 400000,
    },
  ]);
  for (var room in Memory.rooms) {
    spawn0(room);
  }
};
//# sourceMappingURL=main.js.map
