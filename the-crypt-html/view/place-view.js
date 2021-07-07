(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }
    if (window.theCrypt.view === undefined) {
        window.theCrypt.view = {}
    }

    const placeDiv = document.getElementById('place')
    const placeScript = document.getElementById('placeTemplate')
    let itemScript = document.getElementById('itemTemplate');
    let exitScript = document.getElementById('exitTemplate');

    const render = placeData => {
        placeDiv.innerHTML = Object.keys(placeData)
            .reduce((rendered, key) => window.theCrypt.util.templateRenderer.replacePlaceholder(rendered, key, placeData), placeScript.innerHTML)

        const placeItems = document.getElementById('placeItems')
        placeItems.innerHTML = placeData.items
            .map(i => window.theCrypt.util.templateRenderer.replacePlaceholder(itemScript.innerHTML, 'item', {item: i}))
            .join('')

        const exits = document.getElementById('placeExits')
        exits.innerHTML = Object.keys(placeData.exits)
            .map(e => window.theCrypt.util.templateRenderer.replacePlaceholder(exitScript.innerHTML, 'exit', {exit: e}))
            .join('')
    }

    window.theCrypt.view.place = {
        render: render
    }
})()