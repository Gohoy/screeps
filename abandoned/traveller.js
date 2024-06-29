// import { upgrade } from "./upgrade";

// export const traveller = function(creep) {

//     // 修改目前creep的harvesting 判断实在采集能量还是释放能量
//     if (creep.memory.harvesting && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
//         creep.memory.harvesting = false
//     }
//     if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
//         creep.memory.harvesting = true
//     }

//     // 所有旗帜
//     var flags = Game.flags;
//     // // spawn 或 extension 或 tower 或 link
//     // var spawnOrExtensionOrTower = creep.pos.findClosestByPath(FIND_STRUCTURES, {

//     //     filter: (structure) => {
//     //         // return (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 400;
//     //         return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) || (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 20)

//     //     }
//     // })


//     // // storage
//     // var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//     //     filter: (structure) => {
//     //         return structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
//     //     }
//     // })


//     if (creep.memory.harvesting) {

//         // var flag = creep.memory.flag
//         // console.log(flag)
//         // 将traveller分成西 南 两队
//         if (creep.memory.flag == 'Flag2') {
//             creep.say("去西边挖矿")
//             if (creep.room.name != "E31N53") {
//                 // 如果不在西边的房间就往那里走
//                 creep.moveTo(flags["Flag2"])
//             } else {
//                 // 如果在，就获取矿床对象
//                 var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
//                 if (source) {
//                     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                         creep.moveTo(source)
//                     }
//                 } else {
//                     creep.moveTo(flags["Flag2"])
//                     creep.say("等待矿床可用")
//                 }
//             }
//         } else if (creep.memory.flag == 'Flag1') {
//             creep.say("去东边挖矿")
//             if (creep.room.name != "E33N53") {
//                 creep.moveTo(flags["Flag1"])
//             } else {
//                 var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
//                 if (source) {
//                     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                         creep.moveTo(source)
//                     }
//                 } else {
//                     creep.moveTo(flags["Flag1"])
//                     creep.say("等待矿床可用")
//                 }
//             }
//         } else {
//             creep.say("去北边挖矿")
//             if (creep.room.name != "E32N54") {
//                 creep.moveTo(flags["Flag3"])
//             } else {
//                 var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
//                 if (source) {
//                     if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                         creep.moveTo(source)
//                     }
//                 } else {
//                     creep.moveTo(flags["Flag3"])
//                     creep.say("等待矿床可用")
//                 }
//             }
//         }
//     } else {


//         creep.say("哇酷哇酷")
//         if (creep.room.name == "E32N53") {
//             var link = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//                 filter: (structure) => {
//                     return (structure.structureType == STRUCTURE_LINK)
//                 }
//             })
//             if (link) {
//                 if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(link)
//                 }
//             } else {
//                 upgrade(creep)
//             }
//         } else {
//             creep.moveTo(flags["HOME"])
//         }


//     }

// }