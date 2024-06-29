export const totalResource = function(resourceType, roomName) {
    var total = 0
    var room = Game.rooms[roomName]
    var storage = room.storage
    var terminal = room.terminal
    total = storage.store[resourceType] + terminal.store[resourceType]
    return total
}