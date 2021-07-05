const {buildMap} = require("../map/map");
const {defaultMapData} = require("../map/map");
const {placeView} = require("../view/place-view");
const {playerView} = require("../view/player-view");
const {Player} = require("../model/player");

const getGame = (playerName, mapData = defaultMapData) => {
    let isGameInProgress = true

    const player = new Player(playerName, 50)
    player.addItems('The Sword of Doom', 'holy water')
    player.setPlace(buildMap(mapData))

    const checkGameInProgress = () => {
        const playerData = player.getData();
        if (playerData.health <= 0) {
            isGameInProgress = false
        }
        return isGameInProgress
    }

    const render = player => {
        if (checkGameInProgress()) {
            console.log(placeView.getDescription(player.getPlace().getData()))
            console.log(playerView.getDescription(player.getData()))
        } else {
            console.log(playerName + ' is dead')
        }
    }

    render(player)

    return {
        go: function (direction) {
            if (checkGameInProgress()) {
                const place = player.getPlace()
                const destination = place.getExit(direction);
                const challenge = place.getChallenge(direction);

                if (destination) {
                    if (challenge === undefined || challenge.isComplete) {
                        player.setPlace(destination)
                        render(player)
                    } else {
                        if (challenge.damage) {
                            player.applyDamage(challenge.damage)
                            console.log('Arrghh! There is a challenge: ' + challenge.message)
                        }
                        render(player)
                        // todo: separate view
                        // console.log(challenge.message)
                        // todo: check if not dead
                    }

                } else {
                    console.log('There is no exit in that direction: ' + direction)
                }
            } else {
                console.log(playerName + ' is dead')
            }
        },
        // todo: describe that an item was picked and reduce boilerplate logging
        get: function () {
            if (checkGameInProgress()) {
                const place = player.getPlace();
                const lastItem = place.getLastItem();
                if (lastItem) {
                    player.addItems(lastItem)
                    render(player)
                } else {
                    console.log('There are no items in this place: ' + place.toString())
                }
            } else {
                console.log(playerName + ' is dead')
            }
        },
        use: function (item, direction) {
            if (checkGameInProgress()) {
                const place = player.getPlace();
                const challenge = place.getChallenge(direction);

                if (challenge === undefined || challenge.isComplete) {
                    console.log('No need to use an item')
                } else {
                    if (player.hasItem(item)) {
                        if (item === challenge.requires) {
                            console.log('Challenge success: ' + challenge.success)
                            challenge.isComplete = true

                            if (challenge.itemConsumed) {
                                player.removeItem(item)
                            }
                        } else {
                            console.log(challenge.failure)
                        }
                    } else {
                        console.log('You do not have this item')
                    }
                }
            } else {
                console.log(playerName + ' is dead')
            }
        }
    }
}

module.exports = {
    getGame: getGame
}
