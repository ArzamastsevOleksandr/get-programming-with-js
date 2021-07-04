const {spacer} = require("./spacer");

const SPACE = ' '
const DASH = '-'
const ITEMS = 'Items:'
const ITEMS_LEFT_BORDER = SPACE.repeat(2)
const ITEM_SEPARATOR = DASH + SPACE.repeat(1)

const Player = function (name, health) {
    const BORDER_SYMBOL_PLAYER = '='

    const LEFT_BORDER_PLAYER = BORDER_SYMBOL_PLAYER + SPACE.repeat(1)
    const RIGHT_BORDER_PLAYER = SPACE.repeat(1) + BORDER_SYMBOL_PLAYER

    const LEFT_BORDER_WRAPPER = BORDER_SYMBOL_PLAYER.repeat(2);
    const RIGHT_BORDER_WRAPPER = BORDER_SYMBOL_PLAYER.repeat(2);

    const items = []
    let place = null

    const getLocationDescription = () => name + ' is in ' + place.toString()

    const getHealthDescription = () => name + ' has health ' + health

    const getBorderPlayer = (quantityOfChars) => LEFT_BORDER_WRAPPER
        + spacer.getBorder(BORDER_SYMBOL_PLAYER, quantityOfChars)
        + RIGHT_BORDER_WRAPPER

    const getItemsDescription = items => {
        return ITEMS_LEFT_BORDER + ITEMS + '\n'
            + items.map(item => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + item).join('\n')
    }

    this.addItems = (...elements) => elements.forEach(item => items.push(item))

    this.setPlace = newPlace => place = newPlace

    this.getPlace = () => place

    // todo: remove the place details from the description
    // todo: leave only name (health) & item list
    this.getDescription = () => {
        const locationDescription = getLocationDescription()
        const healthDescription = getHealthDescription()

        const maxWidth = Math.max(locationDescription.length, healthDescription.length)

        return getBorderPlayer(maxWidth) + '\n'
            + spacer.wrap(spacer.padWithSpaces(name, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
            + getBorderPlayer(maxWidth) + '\n'
            + spacer.wrap(spacer.padWithSpaces(locationDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
            + spacer.wrap(spacer.padWithSpaces(healthDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
            + getBorderPlayer(maxWidth) + '\n'
            + getItemsDescription(items) + '\n'
            + getBorderPlayer(maxWidth) + '\n'
    }
}

module.exports = {
    Player
}
