if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

if (window.theCrypt.view === undefined) {
    window.theCrypt.view = {}
}

window.theCrypt.view.place = {
    getDescription: function (placeData) {
        const SPACE = ' '
        const DASH = '-'
        const ITEM_PREFIX = DASH + SPACE.repeat(1)
        const ITEMS_LEFT_BORDER = SPACE.repeat(2)

        const EXIT_SEPARATOR = DASH + SPACE.repeat(1)
        const EXITS_LEFT_BORDER = SPACE.repeat(2)

        const getItemsDescription = placeData => {
            const items = placeData.items

            if (theCrypt.util.collections.isArrayNotEmpty(items)) {
                return 'Items:' + '\r\n'
                    + items.map(item => ITEMS_LEFT_BORDER + ITEM_PREFIX + item).join('\n') + '\r\n'
            } else {
                return 'There are no items in ' + placeData.title + '\r\n'
            }
        }

        const getExitsDescription = placeData => {
            const exits = placeData.exits

            if (exits) {
                return 'Exits from ' + placeData.title + ':' + '\n'
                    + Object.keys(exits).map(exit => EXITS_LEFT_BORDER + EXIT_SEPARATOR + exit).join('\n') + '\n'
            } else {
                return 'No exits from the ' + placeData.title
            }
        }

        return placeData.title + '\n'
            + placeData.description + '\n' + '\n'
            + getItemsDescription(placeData) + '\n'
            + getExitsDescription(placeData) + '\n'
    }
}
