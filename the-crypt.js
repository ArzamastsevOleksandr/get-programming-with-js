const ITEMS = 'Items:'
const LEFT_BORDER = '* '
const RIGHT_BORDER = ' *'
const BORDER_SYMBOL = '*'
const ITEMS_LEFT_BORDER = ' '.repeat(2)

const getBorder = (quantityOfChars) => wrap(BORDER_SYMBOL.repeat(quantityOfChars), '**', '**')

const getPlayerLocationDescription = player => player.name + ' is in ' + player.place

const getPlayerHealthDescription = player => player.name + ' has health ' + player.health

const getPlayerItemsString = (items, maxWidth) => {
    return ITEMS_LEFT_BORDER + ITEMS + ' '.repeat(maxWidth - ITEMS.length) + '\n'
        + items.map(i => ITEMS_LEFT_BORDER + '-' + ' ' + i).join('\n')
}

const padWithSpaces = (string, maxWidth) => string + ' '.repeat(maxWidth - string.length)

const wrap = (string, left, right) => left + string + right

const displayPlayer = function (player) {
    const playerLocationDescription = getPlayerLocationDescription(player)
    const playerHealthDescription = getPlayerHealthDescription(player)

    const maxWidth = Math.max(playerLocationDescription.length, playerHealthDescription.length)

    const playerDescription = getBorder(maxWidth) + '\n'
        + wrap(padWithSpaces(player.name, maxWidth), LEFT_BORDER, RIGHT_BORDER) + '\n'
        + getBorder(maxWidth) + '\n'
        + wrap(padWithSpaces(playerLocationDescription, maxWidth), LEFT_BORDER, RIGHT_BORDER) + '\n'
        + wrap(padWithSpaces(playerHealthDescription, maxWidth), LEFT_BORDER, RIGHT_BORDER) + '\n'
        + getBorder(maxWidth) + '\n'
        + getPlayerItemsString(player.items, maxWidth) + '\n'
        + getBorder(maxWidth) + '\n'

    console.log(playerDescription)
}

const player = {
    name: 'Kandra',
    health: 50,
    place: 'The Dungeon of Doom',
    items: ['a rusty key', 'a trusty lamp']
}

displayPlayer(player)
