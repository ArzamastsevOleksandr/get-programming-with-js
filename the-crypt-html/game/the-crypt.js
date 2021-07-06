if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

window.theCrypt.init = function (playerName, mapData = theCrypt.map.defaultMapData) {
    const player = new theCrypt.model.Player(playerName, 50)
    player.addItems('holy water')
    player.setPlace(theCrypt.map.buildMap(mapData))

    window.theCrypt.player = player

    const isGameInProgress = () => {
        const playerData = player.getData();
        return playerData.health > 0
    }

    const renderPlace = function (place) {
        const placeDiv = document.getElementById('place')
        placeDiv.innerHTML = theCrypt.view.place.getDescription(place.getData())
    }

    const renderPlayer = function (player) {
        let playerDiv = document.getElementById('player');
        playerDiv.innerHTML = theCrypt.view.player.getDescription(player.getData())
    }

    const renderMessage = function (message) {
        const messageDiv = document.getElementById('message')
        messageDiv.innerHTML = theCrypt.view.message.getDescription(message)
    }

    const clearMessage = function () {
        const messageDiv = document.getElementById('message')
        messageDiv.innerHTML = ''
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
