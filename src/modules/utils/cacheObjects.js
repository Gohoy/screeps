export const cacheObjects = function (roomName) {
    var room = Game.rooms[roomName];
    // 在每个游戏步骤（tick）中更新缓存的房间对象和地形信息

    // 缓存房间内的对象
    const objects = room.find(FIND_STRUCTURES); // 根据你的需求选择合适的查找方法和过滤器

    // 根据建筑物类型分类对象
    const categorizedObjects = {};
    objects.forEach(obj => {
        const structureType = obj.structureType;
        if (!categorizedObjects[structureType]) {
            categorizedObjects[structureType] = [];
        }
        categorizedObjects[structureType].push(obj.id);
    });

    // 将分类后的对象存储到房间的内存中
    room.memory.objects = categorizedObjects;

}


