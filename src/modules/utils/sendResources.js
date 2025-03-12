// map 应该是 { [{from: 'E32N53',to: 'E32N52',resource: 'energy',amount: 1000,storageMoreThan: 10000}] }
export const sendResources = (map) => {
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
