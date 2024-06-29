export const attack = function (creep, target, x, y) {
    // creep.say("attack")

    creep.say(creep.moveTo(x, y))
    creep.attack(target)
}