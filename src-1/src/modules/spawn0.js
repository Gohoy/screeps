import { build0 } from "./build0";
import { carry0 } from "./carry0";
import { harvest0 } from "./harvest0";
import { mineCarry0 } from "./mineCarry0";
import { repair0 } from "./repair0";
import { roleHarvesterForContainer } from "./roleHarvesterForContainer";
import { towerRepair } from "./towerRepair";
import { upgrade0 } from "./upgrade0";
import { rolerLength } from "./utils/rolerLength";
export const spawn0 = function (roomName) {
    var structures = Memory.rooms[roomName].objects
    var room = Game.rooms[roomName];
    var sourceLink = Game.getObjectById(structures.sourceLink)
    var upgradeLink = Game.getObjectById(structures.upgradeLink)
    var storageLink = Game.getObjectById(structures.storageLink)
    if(upgradeLink && upgradeLink.store[RESOURCE_ENERGY] > 700){
        sourceLink.transferEnergy(storageLink)
    }else{
        sourceLink.transferEnergy(upgradeLink)
    }


    var harvesters = rolerLength('harvester', roomName);
    var builders = rolerLength('builder', roomName);
    var upgraders = rolerLength('upgrader', roomName);
    var harvesterForContainers = rolerLength('harvesterForContainer', roomName);
    var travellers = rolerLength('traveller', roomName);
    var carriers = rolerLength('carrier', roomName)
    var repairers = rolerLength('repairer', roomName)
    var miners = rolerLength('miner', roomName)
    var mineCarriers = rolerLength('mineCarrier',roomName)
    var constructionSites = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
    if (Game.time % 10 == 0) {
        console.log(roomName + ': harvester: ' + harvesters.length + ' repairers:' + repairers.length + ' upgrader:' + upgraders.length + ' carrier:' + carriers.length + ' builder:'+builders.length)
    }


    // 得到一个可用的spawn，目前仅使用唯一一个进行生产
    var spawns = structures.spawn
    var spawn = Game.getObjectById(spawns[0]);


    // 设置各种role的数量和组件
    if (upgraders.length < 1 && harvesters.length >= 2 && carriers.length >= 1) {
        var newName = 'upgrader' + Game.time;
        if (Game.time % 10 == 0) {
            console.log('ROOM1 Spawning new upgrader: ' + newName);
        }
        spawn.spawnCreep([WORK, MOVE, CARRY], newName, { memory: { role: 'upgrader', harvesting: true, help: '0' } })
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
        var harvesters0 = harvesters.filter((harvester) => { return harvester.memory.source == structures.source0 })
        var harvesters1 = harvesters.filter((harvester) => { return harvester.memory.source == structures.source1 })
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
    })

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
        var to1 = [...structures.spawn,...structures.extension]
        var to2 = [...structures.tower]
        var to = [to1,to2]  
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
        var newName = 'Repairer' + Game.time
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
    towerRepair( Game.getObjectById(structures.tower[2]))

    // 这里进行各个creep的操作,上面已经获取了各个种类的列表
    for (var index in harvesters) {
        harvest0(harvesters[index])
    }
    for(var index in miners){
        harvest0(miners[index])
    }
    for(var index in carriers){
        carry0(carriers[index])
    }
    for(var index in upgraders){
        upgrade0(upgraders[index])
    }
    for(var index in harvesterForContainers){
        roleHarvesterForContainer(harvesterForContainers[index]);
    }
    for(var index in builders){
        build0(builders[index])
    }
    for(var index in mineCarriers){
        mineCarry0(mineCarriers[index])
    }
    for(var index in repairers){
        repair0(repairers[index])
    }


if(Game.time%10000 == 0){
    // 这里控制订单
    var toSellResource =[RESOURCE_KEANIUM,RESOURCE_HYDROGEN,RESOURCE_OXYGEN,RESOURCE_HYDROXIDE]
    // 我所有的order
    var myOrders = Game.market.orders
    // 这个房间正在出售的类型
    var roomSellResourceTypes = [];
    for(var index in myOrders){
        var myOrder = myOrders[index]
        if(myOrder.active && myOrder.roomName == roomName && myOrder.type == "sell"){
            roomSellResourceTypes.push(myOrders[index].resourceType);
        } 
    }
    var terminal = room.terminal;
    // 这里把terminal中总量超过10000的都创建出售订单
    for(var index in toSellResource){
        var resource = toSellResource[index]
        if(terminal.store[resource] >= 10000 && !roomSellResourceTypes.includes(resource)){
            Game.market.createOrder(ORDER_SELL,resource,Game.market.getHistory(resource)[14].avgPrice,10000,roomName)
        }
    }
}


}