export const cacheObjects = function (roomName, category) {
    console.log(Game.cpu.getUsed())
    var room = Game.rooms[roomName];
    // 获取缓存的房间对象和地形信息

    // 根据类别进行不同的处理
    switch (category) {
        case "structure":
            cacheStructures(room);
            break;
        case "terrain":
            cacheTerrain(room);
            break;
        case "constructionSites":
            cacheConstructionSites(room);
            break;

        case "specificStructures":
            cacheSpecificStructures(room);
            break;
        default:
            cacheStructures(room);
            cacheConstructionSites(room);
            cacheSpecificStructures(room)
            break;
    }
}



function cacheStructures(room) {
    const structures = room.find(FIND_MY_STRUCTURES);

    const categorizedObjects = {};
    structures.forEach(obj => {
        const structureType = obj.structureType;
        if (!categorizedObjects[structureType]) {
            categorizedObjects[structureType] = [];
        }
        categorizedObjects[structureType].push(obj.id);
    });

    // 更新房间的内存
    room.memory.structures = categorizedObjects;
}

function cacheTerrain(room) {
    const terrain = new Room.Terrain(room.name);
    const terrainMatrix = [];

    for (let x = 0; x < 50; x++) {
        const row = [];
        for (let y = 0; y < 50; y++) {
            const terrainType = terrain.get(x, y);
            row.push(terrainType);
        }
        terrainMatrix.push(row);
    }

    // 更新房间的内存
    room.memory.terrain = terrainMatrix;
}

function cacheConstructionSites(room) {
    const constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
    const categorizedConstructionSites = {};
    constructionSites.forEach(site => {
        const structureType = site.structureType;
        if (!categorizedConstructionSites[structureType]) {
            categorizedConstructionSites[structureType] = [];
        }
        categorizedConstructionSites[structureType].push(site.id);
    });

    // 更新房间的内存
    room.memory.constructionSites = categorizedConstructionSites;
}

function cacheSpecificStructures(room) {
    console.log("cacheSpec")
    const spawn = room.find(FIND_MY_SPAWNS)[0].id;
    const sources = room.find(FIND_SOURCES);
    const minerals = room.find(FIND_MINERALS);
    const controller = room.controller;
    const cacheSpecificStructures = {};
    cacheSpecificStructures[`${room.name}Spawn`] = spawn
    // 存储 Source 和 Source 旁的存储建筑以及建筑工地
    sources.forEach((source, index) => {
        const sourceKey = `source${index}`;
        const nearbyStructures = source.pos.findInRange(FIND_STRUCTURES, 2);
        const nearbyConstructionSites = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 2);

        nearbyStructures.forEach(structure => {
            if (structure.structureType === STRUCTURE_LINK) {
                const linkName = `${sourceKey}Link`;
                cacheSpecificStructures[linkName] = structure.id;
            }
            if (structure.structureType === STRUCTURE_CONTAINER) {
                const containerName = `${sourceKey}Container`;
                cacheSpecificStructures[containerName] = structure.id;
            }
        });

        cacheSpecificStructures[sourceKey] = source.id;
        cacheSpecificStructures.constructionSites = cacheSpecificStructures.constructionSites || [];
        cacheSpecificStructures.constructionSites.push(...nearbyConstructionSites.map(constructionSite => constructionSite.id));
    });

    // 存储 Mineral 旁的 Container 和建筑工地
    minerals.forEach((mineral, index) => {
        const mineralKey = `mineral${index}`;
        const nearbyStructures = mineral.pos.findInRange(FIND_STRUCTURES, 2);
        const nearbyConstructionSites = mineral.pos.findInRange(FIND_CONSTRUCTION_SITES, 2);

        nearbyStructures.forEach(structure => {
            if (structure.structureType === STRUCTURE_CONTAINER) {
                const containerName = `${mineralKey}Container`;
                cacheSpecificStructures[containerName] = structure.id;
            }
        });

        cacheSpecificStructures[mineralKey] = mineral.id;
        cacheSpecificStructures.constructionSites = cacheSpecificStructures.constructionSites || [];
        cacheSpecificStructures.constructionSites.push(...nearbyConstructionSites.map(constructionSite => constructionSite.id));
    });

    // 存储 Controller 旁的 Link、Container 和建筑工地
    if (controller) {
        const controllerKey = `${room.name}Controller`;
        const nearbyStructures = controller.pos.findInRange(FIND_STRUCTURES, 2);
        const nearbyConstructionSites = controller.pos.findInRange(FIND_CONSTRUCTION_SITES, 2);

        nearbyStructures.forEach(structure => {
            if (structure.structureType === STRUCTURE_LINK) {
                cacheSpecificStructures[`${controllerKey}Link`] = structure.id;
            }
            if (structure.structureType === STRUCTURE_CONTAINER) {
                cacheSpecificStructures[`${controllerKey}Container`] = structure.id;
            }
        });

        cacheSpecificStructures[controllerKey] = controller.id;
        cacheSpecificStructures.constructionSites = cacheSpecificStructures.constructionSites || [];
        cacheSpecificStructures.constructionSites.push(...nearbyConstructionSites.map(constructionSite => constructionSite.id));
    }
    // 更新房间的内存
    room.memory.specificStructures = cacheSpecificStructures;
}
