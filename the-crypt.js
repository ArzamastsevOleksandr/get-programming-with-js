const {placeView} = require("./place-view");
const {playerView} = require("./player-view");
const {buildDefaultMap} = require("./map");
const {Player} = require("./player");

const getGame = () => {
    const player = new Player('Kandra', 50)
    player.addItems('The Sword of Doom')
    player.setPlace(buildDefaultMap())

    const render = () => {
        console.log(placeView.render(player.getPlace().getData()))
        console.log(playerView.render(player.getData()))
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
    getGame: getGame
}
