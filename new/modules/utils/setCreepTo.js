export const setCreepTo = function(creep){
    var from = creep.memory.from
    var to = creep.memory.to
    var roomName = creep.room.name
    if(creep.memory.role == 'harvester'){
    var sourcesId =Memory.roomStructuresId[roomName].source
    for(var i = 0 ; i < sourcesId.length;i++){
        var from1 = Object.keys(sourcesId[i])[0]
        if(from1 == from){
            creep.memory.to = sourcesId[i][from]
        }
    }}else if(creep.memory.role == 'upgrader'){
    var controller = Memory.roomStructuresId[roomName].controller    
    creep.memory.from =  controller[creep.room.controller.id]
    }else if(creep.memory.role == 'builder'){
        var builderFrom = Memory.roomStructuresId[roomName].builderFrom
        var constructionSites = Memory.roomStructuresId[roomName].constructionSites
        creep.memory.from = builderFrom
        creep.memory.to = constructionSites[0]
    }else if(creep.memory.role == 'carrier'){
        var carrierFrom = Memory.roomStructuresId[roomName].carrierFrom
        var carrierTo = Memory.roomStructuresId[roomName].carrierTo
        creep.memory.from = carrierFrom
        creep.memory.to = carrierTo
    }
}