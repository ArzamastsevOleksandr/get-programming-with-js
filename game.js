const {buildDefaultMap} = require("./map");
const {Player} = require("./player");

const getGame = () => {
    const player = new Player('Kandra', 50)
    player.addItems('The Sword of Doom')
    player.setPlace(buildDefaultMap())

    const render = () => {
        console.clear()
        console.log(player.getPlace().getDescription())
        console.log(player.getDescription())
    }

    render()

    return {
        go: function (direction) {
            const place = player.getPlace()
            const destination = place.getExit(direction);
            if (destination) {
                player.setPlace(destination)
                render()
            } else {
                console.log('There is no exit in that direction: ' + direction)
            }
        },
        // todo: describe that an item was picked and reduce boilerplate logging
        get: function () {
            const place = player.getPlace();
            const lastItem = place.getLastItem();
            if (lastItem) {
                player.addItems(lastItem)
                render()
            } else {
                console.log('There are no items in this place: ' + place.toString())
            }
        }
    }
}

module.exports = {
    getGame
}
