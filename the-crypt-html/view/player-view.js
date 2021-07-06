if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

if (window.theCrypt.view === undefined) {
    window.theCrypt.view = {}
}

window.theCrypt.view.player = {
    getDescription: function (playerData) {
        const SPACE = ' '
        const ITEM_PREFIX = '-' + SPACE.repeat(1)
        const ITEMS_LEFT_BORDER = SPACE.repeat(2)

        const BORDER_SYMBOL = '='

        const PLAYER_LEFT_BORDER = BORDER_SYMBOL + SPACE.repeat(1)
        const PLAYER_RIGHT_BORDER = SPACE.repeat(1) + BORDER_SYMBOL

        const PLAYER_BORDER_PREFIX = BORDER_SYMBOL.repeat(PLAYER_LEFT_BORDER.length);
        const PLAYER_BORDER_SUFFIX = BORDER_SYMBOL.repeat(PLAYER_RIGHT_BORDER.length);

        const getLocationDescription = playerData => playerData.name + ' is in ' + playerData.place

        const getNameAndHealthDescription = playerData => playerData.name + ' (health: ' + playerData.health + ')'

        const getBorder = quantityOfChars => PLAYER_BORDER_PREFIX
            + theCrypt.util.spacer.getBorder(BORDER_SYMBOL, quantityOfChars)
            + PLAYER_BORDER_SUFFIX

        const getItemsDescription = items => {
            if (theCrypt.util.collections.isArrayNotEmpty(items)) {
                return ITEMS_LEFT_BORDER + 'Player items:' + '\n'
                    + items.map(item => ITEMS_LEFT_BORDER + ITEM_PREFIX + item).join('\n')
            } else {
                return 'Player has no items'
            }
        }

        const locationDescription = getLocationDescription(playerData)
        const nameAndHealthDescription = getNameAndHealthDescription(playerData)

        const maxWidth = Math.max(locationDescription.length, nameAndHealthDescription.length)

        return getBorder(maxWidth) + '\n'
            + PLAYER_LEFT_BORDER + theCrypt.util.spacer.padWithSpaces(nameAndHealthDescription, maxWidth) + PLAYER_RIGHT_BORDER + '\n'
            + getBorder(maxWidth) + '\n'
            + PLAYER_LEFT_BORDER + theCrypt.util.spacer.padWithSpaces(locationDescription, maxWidth) + PLAYER_RIGHT_BORDER + '\n'
            + getBorder(maxWidth) + '\n'
            + getItemsDescription(playerData.items) + '\n'
            + getBorder(maxWidth) + '\n'
    }
}
