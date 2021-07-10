(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }

    const Player = theCrypt.model.Player

    const buildMap = theCrypt.map.buildMap

    const placeView = window.theCrypt.view.place
    const playerView = window.theCrypt.view.player
    const messageView = window.theCrypt.view.message

    window.theCrypt.init = function (playerName, mapData = theCrypt.map.defaultMapData) {
        const player = new Player(playerName, 50)
        player.addItems('holy water')
        const firstPlace = buildMap(mapData)
        player.setPlace(firstPlace)

        const isGameInProgress = () => {
            const playerData = player.getData();
            return playerData.health > 0
        }

        const renderPlace = function (place) {
            placeView.render(place.getData())
        }

        const renderPlayer = function (player) {
            playerView.render(player.getData())
        }

        const renderMessage = function (message) {
            messageView.render(message)
        }

        const render = player => {
            doIfGameIsInProgress(() => {
                renderPlace(player.getPlace())
                renderPlayer(player)
            })
        }

        const doIfGameIsInProgress = func => {
            if (isGameInProgress()) {
                func()
            } else {
                renderMessage(playerName + ' is dead')
            }
        }

        render(player)

        window.theCrypt.game = {
            go: function (direction) {
                doIfGameIsInProgress(() => {
                    renderMessage('Attempt to go to ' + direction)
                    const place = player.getPlace()
                    const destination = place.getExit(direction);
                    const challenge = place.getChallenge(direction);

                    if (destination) {
                        if (challenge === undefined || challenge.isComplete) {
                            player.setPlace(destination)
                            renderMessage('Moved successfully to ' + destination)
                            render(player)
                        } else {
                            if (challenge.damage) {
                                player.applyDamage(challenge.damage)
                                renderMessage('Arrghh! ' + challenge.message)
                                renderMessage('Failed to move ' + direction)
                            }
                            doIfGameIsInProgress(() => render(player))
                        }
                    } else {
                        renderMessage('There is no exit in to ' + direction + ' from ' + player.getPlace())
                    }
                })
            },
            get: function () {
                doIfGameIsInProgress(() => {
                    const place = player.getPlace();
                    const lastItem = place.getLastItem();
                    if (lastItem) {
                        player.addItems(lastItem)
                        renderMessage('Picked an item: ' + lastItem)
                        render(player)
                    } else {
                        renderMessage('There are no items in this place: ' + place.toString())
                    }
                })
            },
            use: function (item, direction) {
                doIfGameIsInProgress(() => {
                    const place = player.getPlace();
                    const challenge = place.getChallenge(direction);

                    if (challenge === undefined || challenge.isComplete) {
                        renderMessage('No need to use: ' + item)
                    } else {
                        if (player.hasItem(item)) {
                            if (item === challenge.requires) {
                                renderMessage(challenge.success)
                                challenge.isComplete = true

                                if (challenge.itemConsumed) {
                                    player.removeItem(item)
                                }
                            } else {
                                renderMessage(challenge.failure)
                            }
                        } else {
                            renderMessage('You do not have: ' + item)
                        }
                    }
                })
            },
            renderMessage: renderMessage
        }
    }

    window.theCrypt.init('Kandra')
})()
