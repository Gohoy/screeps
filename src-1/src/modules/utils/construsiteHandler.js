import { sortBy } from "lodash";

export default construsiteHandler = function (room) {
    var sources = room.find(FIND_SOURCES);
    var source1x = sources[0].pos.x;
    var source2x = sources[1].pos.x;
    var source1y = sources[0].pos.y;
    var source2y = sources[1].pos.y;
    var mineralx = room.find(FIND_MINERALS)[0].pos.x;
    var mineraly = room.find(FIND_MINERALS)[0].pos.y;
    var controllerx = room.controller.pos.x;
    var controllery = room.controller.pos.y;

    var x = { source1x, source2x, mineralx, controllerx };
    var y = { source1y, source2y, mineraly, controllery };
    x = sortBy(x);
    y = sortBy(y);

}