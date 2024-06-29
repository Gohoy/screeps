export const carry1 = function (creep, link) {
    var target = creep.room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return creep.owner != '{"username":"Invader"}'
        }
    });
    // 修改目前creep的harvesting 判断实在采集能量还是释放能量
    if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
        creep.memory.harvesting = false
    }
    if (!creep.memory.harvesting && creep.store.getUsedCapacity() == 0) {
        creep.memory.harvesting = true
        creep.memory.harvestingFlag = 1
    }
    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure => {
            return structure.structureType == STRUCTURE_CONTAINER
        })
    })



    var links = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK && structure.room.name == creep.room.name)
        }
    })

    var spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return ((structure.structureType == STRUCTURE_SPAWN && structure.id != "6476cb04a9867f40be6c6966") || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }
    })
    // tower
    var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 300
        }
    })
    var towerEmpty = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 700
        }
    })

    var mineralType = creep.room.find(FIND_MINERALS)[0]['mineralType']

    // var labs = creep.room.find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_LAB && structure.room.name == creep.room.name)
    //     }
    // })

    var powerSpawn = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_POWER_SPAWN
        }
    })
    var transferCost = 14000
    var storage = creep.room.storage
    var terminal = creep.room.terminal

    var spwans = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_SPAWN
        }
    })

    var droppedSource = creep.room.find(FIND_DROPPED_RESOURCES)
    //  ----------------------------------------------------------------



    if (creep.memory.to == '2') {

        // if (creep.room.name == 'E32N52') {

        //     if (creep.memory.id == '1') {
        //         creep.memory.from = containers[1].id

        //     } else {
        //         creep.memory.from = containers[0].id
        //     }
        //     if (Game.getObjectById(creep.memory.from).store[RESOURCE_ENERGY] < 500 && droppedSource) {
        //         creep.memory.from = droppedSource.id
        //     }
        //     if (spawnOrExtension || towerEmpty || link.store[RESOURCE_ENERGY] < 200) {
        //         creep.memory.from = storage.id
        //     }
        //     if (spawnOrExtension) {
        //         creep.say("spawn")
        //         creep.memory.to1 = spawnOrExtension.id
        //     } else if (towerEmpty) {
        //         creep.say("tower")
        //         creep.memory.to1 = towerEmpty.id
        //     } else if (link.store[RESOURCE_ENERGY] < 500) {
        //         creep.say("link")
        //         creep.memory.to1 = link.id
        //     } else if (tower) {
        //         creep.say("tower")
        //         creep.memory.to1 = tower.id
        //     } else if (storage.store.getFreeCapacity(RESOURCE_ENERGY) > 10000) {
        //         creep.memory.to1 = storage.id
        //     } else {
        //         creep.memory.to1 = containers[1].id
        //     }
        // } else
        if ((spawnOrExtension || tower || terminal.store[RESOURCE_ENERGY] < transferCost || (link && link.store[RESOURCE_ENERGY] < 200) || droppedSource || containers[0].store[RESOURCE_ENERGY] >= 500)) {
            creep.say('2')
            // console.log(JSON.stringify(Game.getObjectById(creep.memory.to1)))
            creep.memory.from = storage.id

            if (link && link.store[RESOURCE_ENERGY] >= 500) {
                creep.memory.from = link.id
            } else if (containers[0] && containers[0].store[RESOURCE_ENERGY] >= 500) {
                creep.memory.from = containers[0].id
            } else if (containers[0] && storage.store[RESOURCE_ENERGY] < 500 && containers[0].store[RESOURCE_ENERGY] < 500 && !droppedSource) {
                creep.memory.from = terminal.id
            } else if (terminal.store[RESOURCE_ENERGY] > 20000) {
                creep.memory.from = terminal.id
            } else {
                creep.memory.from = storage.id
            }

            if (spawnOrExtension) {
                creep.memory.to1 = spawnOrExtension.id
            } else if (towerEmpty) {
                creep.memory.to1 = towerEmpty.id
            } else if (tower) {
                creep.memory.to1 = tower.id
            } else if (terminal.store[RESOURCE_ENERGY] < transferCost) {
                creep.memory.to1 = terminal.id
            }
            else if (powerSpawn[0] && powerSpawn[0].store[RESOURCE_ENERGY] < 2000) {
                creep.memory.to1 = powerSpawn[0].id
            }
            else {
                creep.memory.to1 = storage.id
            }

            if (target[0] && target[0].owner.username != 'Invader') {

                console.log(JSON.stringify(target[0].owner.username))
                console.log(target.room.name)

            }


            if (_.sum(creep.store) > creep.store[RESOURCE_ENERGY]) {
                creep.memory.to1 = storage.id
                creep.memory.harvesting = false
                creep.moveTo(Game.getObjectById(creep.memory.to1))

            }

        }
        else {
            creep.moveTo(spwans[0])
            spwans[0].renewCreep(creep)
        }

        if (creep.memory.harvesting) {
            if (creep.pickup(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.from))
            }
            if (creep.withdraw(Game.getObjectById(creep.memory.from), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.from))
            }
        } else {
            // console.log(Object.keys(creep.store)[0]);

            if (creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity()) {
                for (const resourceType in creep.carry) {
                    creep.transfer(storage, resourceType);
                }
            } else {
                if (creep.transfer(Game.getObjectById(creep.memory.to1), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.to1))
                }
            }

        }
    }
    // else if (labs[0] && labs[1] && labs[2]) {

    else if (creep.memory.to == '1' && creep.memory.harvestingFlag != -1) {
        creep.say("1")

        var nuker = creep.room.find(FIND_STRUCTURES, {
            filter: (structure => {
                return structure.structureType == STRUCTURE_NUKER
            })
        })

        // if (creep.room.name == 'E32N53') {
        //     creep.memory.from = labs[2].id;
        //     creep.memory.to1 = labs[1].id
        //     creep.memory.resourceType = RESOURCE_HYDROGEN
        // } else
        // if (creep.room.name == 'E31N53') {
        //     creep.say("eee")
        //     creep.memory.from = labs[1].id
        //     creep.memory.to1 = labs[0].id
        //     creep.memory.resourceType = RESOURCE_OXYGEN
        // } else
        // if (creep.room.name == 'E33N53') {
        //     if (creep.memory.harvesting) {
        //         creep.memory.resourceType = RESOURCE_OXYGEN
        //         creep.from = storage.id
        //     }
        //     creep.memory.to1 = labs[0].id

        // } else
        // if (creep.store[RESOURCE_ENERGY] > 0) {
        //     creep.say("1")
        //     creep.memory.to1 = storage.id
        //     creep.memory.resourceType = RESOURCE_ENERGY
        // } 
        // else if ((labs[0].mineralType == null || labs[1].mineralType == null) && creep.memory.harvesting) {
        //     creep.say("11")
        //     if (labs[0].mineralType == null && labs[1].mineralType == null) {
        //         creep.memory.to1 = labs[0].id
        //         creep.memory.from = containers[1].id
        //         creep.memory.resourceType = mineralType
        //     }
        //     if (labs[0].mineralType == RESOURCE_HYDROGEN) {
        //         creep.memory.to1 = labs[1].id
        //         creep.memory.from = storage.id
        //         if (storage.store[RESOURCE_OXYGEN] < 100) {
        //             creep.memory.from = terminal.id
        //         }
        //         creep.memory.resourceType = RESOURCE_OXYGEN
        //     } else if (labs[1].mineralType == RESOURCE_HYDROGEN) {
        //         creep.memory.to1 = labs[0].id
        //         creep.memory.from = storage.id
        //         if (storage.store[RESOURCE_OXYGEN] < 100) {
        //             creep.memory.from = terminal.id
        //         }
        //         creep.memory.resourceType = RESOURCE_OXYGEN

        //     } else if (labs[0].mineralType == RESOURCE_OXYGEN) {
        //         creep.memory.to1 = labs[1].id
        //         creep.memory.from = storage.id
        //         if (storage.store[RESOURCE_HYDROGEN] < 100) {
        //             creep.memory.from = terminal.id
        //         }
        //         creep.memory.resourceType = RESOURCE_HYDROGEN
        //     } else if (labs[1].mineralType == RESOURCE_OXYGEN) {
        //         creep.memory.to1 = labs[0].id
        //         creep.memory.from = storage.id
        //         if (storage.store[RESOURCE_HYDROGEN] < 100) {
        //             creep.memory.from = terminal.id
        //         }
        //         creep.memory.resourceType = RESOURCE_HYDROGEN
        //     }

        // }

        // else if ((labs[0].store[labs[0].mineralType] < 500 || labs[1].store[labs[1].mineralType] < 500 || labs[2].store[labs[2].mineralType] >= 100) && creep.memory.harvesting) {
        // else if (creep.store.getFreeCapacity() < 100 && creep.store[creep.memory.resourceType] < creep.store.getUsedCapacity()) {
        //   else 

        if (containers[1] && containers[1].store[mineralType] >= 100 && creep.memory.harvesting) {
            creep.say("1111")
            creep.memory.from = containers[1].id;
            creep.memory.to1 = terminal.id;
            creep.memory.resourceType = mineralType;

            // if (labs[2].store[labs[2].mineralType] >= 100 && creep.memory.harvesting) {
            //     creep.memory.from = labs[2].id
            //     creep.memory.to1 = terminal.id
            //     creep.memory.resourceType = labs[2].mineralType
            // } else 

            //  else if (labs[0].store[labs[0].mineralType] < 500 && creep.memory.harvesting && (storage.store[labs[0].mineralType] >= 100 || terminal.store[labs[0].mineralType] >= 100)) {
            //     creep.say('a')
            //     creep.memory.from = storage.id
            //     if (storage.store[labs[0].mineralType] < 100) {
            //         creep.memory.from = terminal.id
            //     }
            //     creep.memory.to1 = labs[0].id
            //     creep.memory.resourceType = labs[0].mineralType
            // } else if (labs[1].store[labs[1].mineralType] < 500 && creep.memory.harvesting && (storage.store[labs[1].mineralType] >= 100 || terminal.store[labs[1].mineralType] >= 100)) {
            //     creep.say('b')
            //     creep.memory.from = storage.id
            //     if (storage.store[labs[1].mineralType] < 100) {
            //         creep.memory.from = terminal.id
            //     }
            //     creep.memory.to1 = labs[1].id
            //     creep.memory.resourceType = labs[1].mineralType
            // }

        } else if (nuker[0] && (nuker[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0) && (storage.store[RESOURCE_ENERGY] > 1000)) {
            creep.say("nuke!!!")

            creep.memory.from = storage.id
            creep.memory.to1 = nuker[0].id
            creep.memory.resourceType = RESOURCE_ENERGY


        } else if (nuker[0] && nuker[0].store.getFreeCapacity(RESOURCE_GHODIUM) > 0 && (terminal.store[RESOURCE_GHODIUM] > 0)) {
            creep.memory.from = terminal.id
            creep.memory.to1 = nuker[0].id
            creep.memory.resourceType = RESOURCE_GHODIUM
        }
        // else if (powerSpawn[0] && powerSpawn[0].store[RESOURCE_POWER] <= 10 && (terminal.store[RESOURCE_POWER] >= 100 || storage.store[RESOURCE_POWER] >= 100)) {
        //     creep.say("power")
        //     if (creep.memory.harvesting) {
        //         if (terminal.store[RESOURCE_POWER] >= 100) {
        //             creep.memory.from = terminal.id
        //         } else if (storage.store[RESOURCE_POWER] >= 100) {
        //             creep.memory.from = storage.id
        //         }
        //         creep.memory.to1 = powerSpawn[0].id
        //         creep.memory.resourceType = RESOURCE_POWER
        //     }
        // }
        // else if (powerSpawn[0] && powerSpawn[0].store[RESOURCE_ENERGY] <= 3000) {
        //     creep.memory.to1 = powerSpawn[0].id
        //     creep.memory.resourceType = RESOURCE_ENERGY
        //     creep.memory.from = storage.id
        // }

        else if (creep.memory.harvesting && storage.store[RESOURCE_HYDROXIDE] > 1000) {
            creep.memory.from = storage.id
            creep.memory.to1 = terminal.id
            creep.memory.resourceType = RESOURCE_HYDROXIDE
        } else if (storage.store[mineralType] > 300) {
            creep.say("2222")
            if (storage.store[mineralType] > 300 && creep.memory.harvesting) {
                creep.memory.from = storage.id;
                creep.memory.to1 = terminal.id
                creep.memory.resourceType = mineralType
            }
        }

    }
    // }
    if (creep.memory.harvesting) {
        if (creep.withdraw(Game.getObjectById(creep.memory.from), creep.memory.resourceType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.from))
        }
    } else {
        if (creep.transfer(Game.getObjectById(creep.memory.to1), creep.memory.resourceType) != 0 && creep.transfer(Game.getObjectById(creep.memory.to1), creep.memory.resourceType) != ERR_NOT_IN_RANGE) {
            creep.say(creep.transfer(Game.getObjectById(creep.memory.to1), creep.memory.resourceType))
            creep.memory.harvestingFlag = -1
            creep.memory.to1 = storage.id
            creep.memory.resourceType = Object.keys(creep.store)[0]
        }
        if (creep.transfer(Game.getObjectById(creep.memory.to1), creep.memory.resourceType) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.to1))
        }

    }

}