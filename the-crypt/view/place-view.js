const SPACE = ' '
const DASH = '-'
const ITEMS = 'Items:'
const ITEMS_LEFT_BORDER = SPACE.repeat(2)
const ITEM_SEPARATOR = DASH + SPACE.repeat(1)

const EXIT_SEPARATOR = DASH + SPACE.repeat(1)
const EXITS_LEFT_BORDER = SPACE.repeat(2)

// todo: fix: when items is empty - do not show the items
const getDescription = placeData => placeData.title + '\n'
    + placeData.description + '\n'
    + getItemsDescription(placeData) + '\n'
    + getExitsDescription(placeData)

const getItemsDescription = placeData => placeData.items ? ITEMS + '\n'
    + placeData.items.map(item => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + item).join('\n')
    : 'No items present'

const getExitsDescription = placeData => placeData.exits ? 'Exits from ' + placeData.title + ':' + '\n'
    + Object.keys(placeData.exits).map(exit => EXITS_LEFT_BORDER + EXIT_SEPARATOR + exit).join('\n')
    : 'No exits from the ' + placeData.title

module.exports = {
    placeView: {
        render: getDescription
    }
}
