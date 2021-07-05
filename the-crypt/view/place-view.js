const {isArrayNotEmpty} = require("../util/collections");

const SPACE = ' '
const DASH = '-'
const ITEM_PREFIX = DASH + SPACE.repeat(1)
const ITEMS_LEFT_BORDER = SPACE.repeat(2)

const EXIT_SEPARATOR = DASH + SPACE.repeat(1)
const EXITS_LEFT_BORDER = SPACE.repeat(2)

const getDescription = placeData => placeData.title + '\n'
    + placeData.description + '\n' + '\n'
    + getItemsDescription(placeData) + '\n'
    + getExitsDescription(placeData) + '\n'

const getItemsDescription = placeData => {
    const items = placeData.items

    if (isArrayNotEmpty(items)) {
        return 'Items:' + '\n'
            + items.map(item => ITEMS_LEFT_BORDER + ITEM_PREFIX + item).join('\n') + '\n'
    } else {
        return 'There are no items in ' + placeData.title + '\n'
    }
}

const getExitsDescription = placeData => {
    const exits = placeData.exits

    if (isArrayNotEmpty(exits)) {
        return 'Exits from ' + placeData.title + ':' + '\n'
            + Object.keys(exits).map(exit => EXITS_LEFT_BORDER + EXIT_SEPARATOR + exit).join('\n') + '\n'
    } else {
        return 'No exits from the ' + placeData.title
    }
}

module.exports = {
    placeView: {
        getDescription: getDescription
    }
}
