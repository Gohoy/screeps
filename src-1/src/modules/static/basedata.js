export default roomData = {
    rooms: {
        E32N53: {
            sources: [], // sources[0] 是离 controller 近的，使用 container。另一个离 controller 远，先 container，之后使用 link
            containers: [], // 如果没有值，就搜索离 sources[0] 最近的 container 为 containers[0]，另一个 container 用作存放矿物
            storage: null, // 这里可以存放 storage 的信息
            links: [], // 有三个 link，0 二号 source 采矿使用，1 upgrade 使用，2 放在 storage 附近，多余的采矿得到的能量存储到 storage
            terminal: null, // 这里可以存放 terminal 的信息
        },
        E31N53: {
            sources: [], // sources[0] 是离 controller 近的，使用 container。另一个离 controller 远，先 container，之后使用 link
            containers: [], // 如果没有值，就搜索离 sources[0] 最近的 container 为 containers[0]，另一个 container 用作存放矿物
            storage: null, // 这里可以存放 storage 的信息
            links: [], // 有三个 link，0 二号 source 采矿使用，1 upgrade 使用，2 放在 storage 附近，多余的采矿得到的能量存储到 storage
            terminal: null, // 这里可以存放 terminal 的信息
        },
        E33N53: {
            sources: [], // sources[0] 是离 controller 近的，使用 container。另一个离 controller 远，先 container，之后使用 link
            containers: [], // 如果没有值，就搜索离 sources[0] 最近的 container 为 containers[0]，另一个 container 用作存放矿物
            storage: null, // 这里可以存放 storage 的信息
            links: [], // 有三个 link，0 二号 source 采矿使用，1 upgrade 使用，2 放在 storage 附近，多余的采矿得到的能量存储到 storage
            terminal: null, // 这里可以存放 terminal 的信息
        },
        E32N52: {
            sources: [], // sources[0] 是离 controller 近的，使用 container。另一个离 controller 远，先 container，之后使用 link
            containers: [], // 如果没有值，就搜索离 sources[0] 最近的 container 为 containers[0]，另一个 container 用作存放矿物
            storage: null, // 这里可以存放 storage 的信息
            links: [], // 有三个 link，0 二号 source 采矿使用，1 upgrade 使用，2 放在 storage 附近，多余的采矿得到的能量存储到 storage
            terminal: null, // 这里可以存放 terminal 的信息
        }
    }
};
