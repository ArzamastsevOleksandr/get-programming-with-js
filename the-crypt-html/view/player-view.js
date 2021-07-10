(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }
    if (window.theCrypt.view === undefined) {
        window.theCrypt.view = {}
    }
    const templateRenderer = window.theCrypt.util.templateRenderer;

    const playerDiv = document.getElementById('player')
    const playerTemplate = document.getElementById('playerTemplate')
    const itemTemplate = document.getElementById('itemTemplate')

    const render = playerData => {
        playerDiv.innerHTML = Object.keys(playerData)
            .reduce(
                (rendered, key) => templateRenderer.renderTemplate(rendered, key, playerData),
                playerTemplate.innerHTML
            )

        document.getElementById('playerItems').innerHTML =
            playerData.items
                .map(item => templateRenderer.renderTemplate(itemTemplate.innerHTML, 'item', {item: item}))
                .join('')
    }

    window.theCrypt.view.player = {
        render: render
    }
})()
