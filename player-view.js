const {spacer} = require("./spacer");

const SPACE = ' '
const DASH = '-'
const ITEMS = 'Items:'
const ITEMS_LEFT_BORDER = SPACE.repeat(2)
const ITEM_SEPARATOR = DASH + SPACE.repeat(1)

const BORDER_SYMBOL_PLAYER = '='

const LEFT_BORDER_PLAYER = BORDER_SYMBOL_PLAYER + SPACE.repeat(1)
const RIGHT_BORDER_PLAYER = SPACE.repeat(1) + BORDER_SYMBOL_PLAYER

const LEFT_BORDER_WRAPPER = BORDER_SYMBOL_PLAYER.repeat(2);
const RIGHT_BORDER_WRAPPER = BORDER_SYMBOL_PLAYER.repeat(2);

const getLocationDescription = playerData => playerData.place ? playerData.name + ' is in ' + playerData.place : 'none'

const getHealthDescription = playerData => playerData.name + ' has health ' + playerData.health

const getBorderPlayer = (quantityOfChars) => LEFT_BORDER_WRAPPER
    + spacer.getBorder(BORDER_SYMBOL_PLAYER, quantityOfChars)
    + RIGHT_BORDER_WRAPPER

const getItemsDescription = items => ITEMS_LEFT_BORDER + ITEMS + '\n'
    + items.map(item => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + item).join('\n')

// todo: remove the place details from the description
// todo: leave only name (health) & item list
const getDescription = playerData => {
    const locationDescription = getLocationDescription(playerData)
    const healthDescription = getHealthDescription(playerData)

    const maxWidth = Math.max(locationDescription.length, healthDescription.length)

    return getBorderPlayer(maxWidth) + '\n'
        + LEFT_BORDER_PLAYER + spacer.padWithSpaces(playerData.name, maxWidth) + RIGHT_BORDER_PLAYER + '\n'
        + getBorderPlayer(maxWidth) + '\n'
        + LEFT_BORDER_PLAYER + spacer.padWithSpaces(locationDescription, maxWidth) + RIGHT_BORDER_PLAYER + '\n'
        + LEFT_BORDER_PLAYER + spacer.padWithSpaces(healthDescription, maxWidth) + RIGHT_BORDER_PLAYER + '\n'
        + getBorderPlayer(maxWidth) + '\n'
        + getItemsDescription(playerData.items) + '\n'
        + getBorderPlayer(maxWidth) + '\n'
}

module.exports = {
    playerView: {
        render: getDescription
    }
}
