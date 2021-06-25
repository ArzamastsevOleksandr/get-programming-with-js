const ITEMS = 'Items:'
const EXITS = 'Exits from '
const LEFT_BORDER_PLAYER = '* '
const RIGHT_BORDER_PLAYER = ' *'
const BORDER_SYMBOL_PLAYER = '*'
const ITEMS_LEFT_BORDER = ' '.repeat(2)
const ITEM_SEPARATOR = '- ';
const EXITS_LEFT_BORDER = ' '.repeat(2)
const EXIT_SEPARATOR = '- ';

const getBorder = (quantityOfChars) => wrap(BORDER_SYMBOL_PLAYER.repeat(quantityOfChars), '**', '**')

const getPlayerLocationDescription = player => player.name + ' is in ' + player.place

const getPlayerHealthDescription = player => player.name + ' has health ' + player.health

const getPlayerItemsString = items => {
    return ITEMS_LEFT_BORDER + ITEMS + '\n'
        + items.map(i => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + i).join('\n')
}

const padWithSpaces = (string, maxWidth) => string + ' '.repeat(maxWidth - string.length)

const wrap = (string, left, right) => left + string + right

const displayPlayer = function (player) {
    const playerLocationDescription = getPlayerLocationDescription(player)
    const playerHealthDescription = getPlayerHealthDescription(player)

    const maxWidth = Math.max(playerLocationDescription.length, playerHealthDescription.length)

    const playerDescription = getBorder(maxWidth) + '\n'
        + wrap(padWithSpaces(player.name, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
        + getBorder(maxWidth) + '\n'
        + wrap(padWithSpaces(playerLocationDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
        + wrap(padWithSpaces(playerHealthDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
        + getBorder(maxWidth) + '\n'
        + getPlayerItemsString(player.items) + '\n'
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

const Place = function (title, description) {
    this.title = title
    this.description = description
    this.items = []
    this.exits = []

    this.getInfo = function () {
        return this.title + '\n'
            + this.description + '\n'
            + this.getItemsString() + '\n'
            + this.getExitsString()
    }

    this.getItemsString = function () {
        return ITEMS + '\n'
            + this.items.map(i => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + i).join('\n')
    }

    this.getExitsString = function () {
        return EXITS + this.title + ':' + '\n'
            + this.exits.map(i => EXITS_LEFT_BORDER + EXIT_SEPARATOR + i).join('\n')
    }

    this.addItem = function (item) {
        this.items.push(item)
    }

    this.addExits = function (...exits) {
        exits.forEach(exit => this.exits.push(exit))
    }

    this.toString = function () {
        return this.title
    }
}

const library = new Place(
    'The Old Library',
    'You are in a library. Dusty books line the walls.'
)
const kitchen = new Place(
    "The Kitchen",
    "You are in the kitchen. There is a disturbing smell."
);
const hall = new Place(
    "The Main Hall",
    "You are in a large hall. It is strangely empty."
);

library.addItem('a rusty key')
library.addExits(kitchen, hall)

console.log(library.getInfo())