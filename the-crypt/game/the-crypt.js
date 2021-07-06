const {defaultMapData} = require("../map/default-map-data");
const {buildMap} = require("../map/map-builder");
const {placeView} = require("../view/place-view");
const {playerView} = require("../view/player-view");
const {messageView} = require("../view/message-view");
const {Player} = require("../model/player");

const getGame = (playerName, mapData = defaultMapData) => {
    const player = new Player(playerName, 50)
    player.addItems('holy water')
    player.setPlace(buildMap(mapData))

    const isGameInProgress = () => {
        const playerData = player.getData();
        return playerData.health > 0
    }

    const render = player => {
        doIfGameIsInProgress(() => {
            console.log(placeView.getDescription(player.getPlace().getData()))
            console.log(playerView.getDescription(player.getData()))
        })
    }

    const doIfGameIsInProgress = func => {
        if (isGameInProgress()) {
            func()
        } else {
            console.log(messageView.getDescription(playerName + ' is dead'))
        }
    }

    render(player)

    return {
        go: function (direction) {
            doIfGameIsInProgress(() => {
                console.log(messageView.getDescription('Attempt to go to ' + direction))
                const place = player.getPlace()
                const destination = place.getExit(direction);
                const challenge = place.getChallenge(direction);

                if (destination) {
                    if (challenge === undefined || challenge.isComplete) {
                        player.setPlace(destination)
                        console.log(messageView.getDescription('Moved successfully to ' + destination))
                        render(player)
                    } else {
                        if (challenge.damage) {
                            player.applyDamage(challenge.damage)
                            console.log(messageView.getDescription('Arrghh! ' + challenge.message))
                            console.log('Failed to move ' + direction)
                        }
                        doIfGameIsInProgress(() => render(player))
                    }
                } else {
                    console.log(messageView.getDescription('There is no exit in to ' + direction + ' from ' + player.getPlace()))
                }
            })
        },
        get: function () {
            doIfGameIsInProgress(() => {
                const place = player.getPlace();
                const lastItem = place.getLastItem();
                if (lastItem) {
                    player.addItems(lastItem)
                    console.log(messageView.getDescription('Picked an item: ' + lastItem))
                    console.log(playerView.getDescription(player.getData()))
                } else {
                    console.log(messageView.getDescription('There are no items in this place: ' + place.toString()))
                }
            })
        },
        use: function (item, direction) {
            doIfGameIsInProgress(() => {
                const place = player.getPlace();
                const challenge = place.getChallenge(direction);

                if (challenge === undefined || challenge.isComplete) {
                    console.log(messageView.getDescription('No need to use: ' + item))
                } else {
                    if (player.hasItem(item)) {
                        if (item === challenge.requires) {
                            console.log(challenge.success)
                            challenge.isComplete = true

                            if (challenge.itemConsumed) {
                                player.removeItem(item)
                            }
                        } else {
                            console.log(challenge.failure)
                        }
                    } else {
                        console.log(messageView.getDescription('You do not have: ' + item))
                    }
                }
            })
        }
    }
}

module.exports = {
    getGame: getGame
}
