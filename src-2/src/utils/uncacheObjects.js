export const uncacheObjects = function (id, category) {
    // 根据指定的参数删除特定 ID 的对象缓存
    const roomNames = Object.keys(Game.rooms);

    for (const roomName of roomNames) {
        const room = Game.rooms[roomName];

        switch (category) {
            case "structure":
                uncacheStructure(room, id);
                break;
            case "terrain":
                uncacheTerrain(room, id);
                break;
            case "constructionSite":
                uncacheConstructionSite(room, id);
                break;
            case "specificStructure":
                uncacheSpecificStructure(room, id);
                break;
            default:
                uncacheCreep(room, id);
                uncacheStructure(room, id);
                uncacheTerrain(room, id);
                uncacheConstructionSite(room, id);
                uncacheSpecificStructure(room, id);
                break;
        }
    }
};

function uncacheStructure(room, id) {
    // 删除指定 ID 的 structures 缓存
    const categorizedStructures = room.memory.structures;

    for (const structureType in categorizedStructures) {
        const structureIds = categorizedStructures[structureType];
        const index = structureIds.indexOf(id);
        if (index !== -1) {
            structureIds.splice(index, 1);
        }
    }
}

function uncacheTerrain(room, id) {
    // 不需要删除 terrain 缓存，因为它是静态的地形信息
    return;
}

function uncacheConstructionSite(room, id) {
    // 删除指定 ID 的 constructionSites 缓存
    const categorizedConstructionSites = room.memory.constructionSites;

    for (const structureType in categorizedConstructionSites) {
        const constructionSiteIds = categorizedConstructionSites[structureType];
        const index = constructionSiteIds.indexOf(id);
        if (index !== -1) {
            constructionSiteIds.splice(index, 1);
        }
    }
}

function uncacheSpecificStructure(room, id) {
    // 删除指定 ID 的 cacheSpecificStructures 缓存
    const cacheSpecificStructures = room.memory.cacheSpecificStructures;

    for (const key in cacheSpecificStructures) {
        const value = cacheSpecificStructures[key];
        if (Array.isArray(value)) {
            const index = value.indexOf(id);
            if (index !== -1) {
                value.splice(index, 1);
            }
        } else if (value === id) {
            delete cacheSpecificStructures[key];
        }
    }
}
