(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }
    if (window.theCrypt.view === undefined) {
        window.theCrypt.view = {}
    }

    const playerDiv = document.getElementById('player')
    const playerScript = document.getElementById('playerTemplate')
    const itemScript = document.getElementById('itemTemplate')

    const render = playerData => {
        playerDiv.innerHTML = Object.keys(playerData)
            .reduce(
                (rendered, key) => window.theCrypt.util.templateRenderer.replacePlaceholder(rendered, key, playerData),
                playerScript.innerHTML
            )

        document.getElementById('playerItems').innerHTML =
            playerData.items
                .map(item => window.theCrypt.util.templateRenderer.replacePlaceholder(itemScript.innerHTML, 'item', {item: item}))
                .join('')
    }

    window.theCrypt.view.player = {
        render: render
    }
})()
