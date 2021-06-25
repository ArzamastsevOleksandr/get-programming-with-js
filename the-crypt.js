const BORDER_SYMBOL_PLAYER = '*'
const SPACE = ' '

const LEFT_BORDER_PLAYER = BORDER_SYMBOL_PLAYER + SPACE.repeat(1)
const RIGHT_BORDER_PLAYER = SPACE.repeat(1) + BORDER_SYMBOL_PLAYER

const ITEMS = 'Items:'
const ITEMS_LEFT_BORDER = SPACE.repeat(2)
const DASH = '-'
const ITEM_SEPARATOR = DASH + SPACE.repeat(1)

const EXITS = 'Exits from '
const EXITS_LEFT_BORDER = SPACE.repeat(2)
const EXIT_SEPARATOR = DASH + SPACE.repeat(1)

const getBorder = (symbol, quantityOfChars) => symbol.repeat(quantityOfChars)

const padWithSpaces = (string, maxWidth) => string + SPACE.repeat(maxWidth - string.length)

const wrap = (string, left, right) => left + string + right

const Player = function (name, health) {
    this.name = name
    this.health = health
    this.items = []
    this.place = null

    this.getLocationDescription = player => player.name + ' is in ' + player.place

    this.getHealthDescription = player => player.name + ' has health ' + player.health

    this.getBorder = (quantityOfChars) => wrap(getBorder(BORDER_SYMBOL_PLAYER, quantityOfChars), '**', '**')

    this.getItemsDescription = items => {
        return ITEMS_LEFT_BORDER + ITEMS + '\n'
            + items.map(i => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + i).join('\n')
    }

    this.getDescription = () => {
        const playerLocationDescription = this.getLocationDescription(player)
        const playerHealthDescription = this.getHealthDescription(player)

        const maxWidth = Math.max(playerLocationDescription.length, playerHealthDescription.length)

        return this.getBorder(maxWidth) + '\n'
            + wrap(padWithSpaces(player.name, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
            + this.getBorder(maxWidth) + '\n'
            + wrap(padWithSpaces(playerLocationDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
            + wrap(padWithSpaces(playerHealthDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
            + this.getBorder(maxWidth) + '\n'
            + this.getItemsDescription(player.items) + '\n'
            + this.getBorder(maxWidth) + '\n'
    }

    this.addItems = (...items) => items.forEach(item => this.items.push(item))
}

const player = new Player('Kandra', 50)
player.addItems('a rusty key', 'a trusty lamp')
player.place = 'The Dungeon of Doom'

console.log(player.getDescription())

const Place = function (title, description) {
    this.title = title
    this.description = description
    this.items = []
    this.exits = []

    this.getInfo = () => this.title + '\n'
        + this.description + '\n'
        + this.getItemsString() + '\n'
        + this.getExitsString()

    this.getItemsString = () => ITEMS + '\n'
        + this.items.map(i => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + i).join('\n')

    this.getExitsString = () => EXITS + this.title + ':' + '\n'
        + this.exits.map(i => EXITS_LEFT_BORDER + EXIT_SEPARATOR + i).join('\n')

    this.addItem = item => this.items.push(item)

    this.addExits = (...exits) => exits.forEach(exit => this.exits.push(exit))

    this.toString = () => this.title
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