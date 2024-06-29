export const findPlainNearTarget = function (terrain, target) {
    var posNice = 1;
    var pos;
    var x = target.pos.x;
    var y = target.pos.y;
    while (true) {
        if (terrain.get(x, y + posNice) == 0) {
            pos = {
                x: x,
                y: y + posNice
            }
            break;
        } else if (terrain.get(x, y - posNice) == 0) {
            pos = {
                x: x,
                y: y - posNice
            }
            break;
        } else if (terrain.get(x + posNice, y) == 0) {
            pos = {
                x: x + posNice,
                y: y
            }
            break;
        } else if (terrain.get(x - posNice, y) == 0) {
            pos = {
                x: x - posNice,
                y: y
            }
            break;
        } else if (terrain.get(x + posNice, y + posNice) == 0) {
            pos = {
                x: x + posNice,
                y: y + posNice
            }
            break;
        } else if (terrain.get(x + posNice, y - posNice) == 0) {
            pos = {
                x: x + posNice,
                y: y - posNice
            }
            break;
        } else if (terrain.get(x - posNice, y - posNice) == 0) {
            pos = {
                x: x - posNice,
                y: y - posNice
            }
            break;
        } else if (terrain.get(x - posNice, y + posNice) == 0) {
            pos = {
                x: x - posNice,
                y: y + posNice
            }
            break;
        }else {
            posNice++;
        }
    }
    return pos;
}