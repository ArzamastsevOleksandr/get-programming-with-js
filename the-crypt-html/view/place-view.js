(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }
    if (window.theCrypt.view === undefined) {
        window.theCrypt.view = {}
    }
    const templateRenderer = window.theCrypt.util.templateRenderer;

    const placeDiv = document.getElementById('place')
    const placeTemplate = document.getElementById('placeTemplate')
    const itemTemplate = document.getElementById('itemTemplate')
    const exitTemplate = document.getElementById('exitTemplate')

    const render = placeData => {
        placeDiv.innerHTML = Object.keys(placeData)
            .reduce((rendered, key) => templateRenderer.renderTemplate(rendered, key, placeData), placeTemplate.innerHTML)

        const placeItems = document.getElementById('placeItems')
        placeItems.innerHTML = placeData.items
            .map(i => templateRenderer.renderTemplate(itemTemplate.innerHTML, 'item', {item: i}))
            .join('')

        const exits = document.getElementById('placeExits')
        exits.innerHTML = Object.keys(placeData.exits)
            .map(e => templateRenderer.renderTemplate(exitTemplate.innerHTML, 'exit', {exit: e}))
            .join('')
    }

    window.theCrypt.view.place = {
        render: render
    }
})()
