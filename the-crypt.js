const SPACE = ' '
const DASH = '-'

const ITEMS = 'Items:'
const ITEMS_LEFT_BORDER = SPACE.repeat(2)
const ITEM_SEPARATOR = DASH + SPACE.repeat(1)

const getBorder = (symbol, quantityOfChars) => symbol.repeat(quantityOfChars)

const padWithSpaces = (string, maxWidth) => string + SPACE.repeat(maxWidth - string.length)

const wrap = (string, left, right) => left + string + right

const Player = function (name, health) {
    const BORDER_SYMBOL_PLAYER = '='

    const LEFT_BORDER_PLAYER = BORDER_SYMBOL_PLAYER + SPACE.repeat(1)
    const RIGHT_BORDER_PLAYER = SPACE.repeat(1) + BORDER_SYMBOL_PLAYER

    const LEFT_BORDER_WRAPPER = BORDER_SYMBOL_PLAYER.repeat(2);
    const RIGHT_BORDER_WRAPPER = BORDER_SYMBOL_PLAYER.repeat(2);

    this.name = name
    this.health = health
    this.items = []
    this.place = null

    this.getLocationDescription = player => player.name + ' is in ' + player.place.title

    this.getHealthDescription = player => player.name + ' has health ' + player.health

    this.getBorder = (quantityOfChars) => LEFT_BORDER_WRAPPER
        + getBorder(BORDER_SYMBOL_PLAYER, quantityOfChars)
        + RIGHT_BORDER_WRAPPER

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

const Place = function (title, description) {
    const EXIT_SEPARATOR = DASH + SPACE.repeat(1)
    const EXITS_LEFT_BORDER = SPACE.repeat(2)

    this.title = title
    this.description = description
    this.items = []
    this.exits = []

    this.addExit = (direction, place) => this.exits[direction] = place

    this.getDescription = () => this.title + '\n'
        + this.description + '\n'
        + this.getItemsDescription() + '\n'
        + this.getExitsDescription()

    this.getItemsDescription = () => ITEMS + '\n'
        + this.items.map(i => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + i).join('\n')

    this.getExitsDescription = () => 'Exits from ' + this.title + ':' + '\n'
        + Object.keys(this.exits).map(i => EXITS_LEFT_BORDER + EXIT_SEPARATOR + i).join('\n')

    this.addItem = item => this.items.push(item)

    this.toString = () => this.title
}

const library = new Place(
    'The Old Library',
    'You are in a library. Dusty books line the walls.'
)
library.addItem('a rusty key')

const kitchen = new Place(
    'The Kitchen',
    'You are in a kitchen. There is a disturbing smell.'
)
kitchen.addItem('a piece of cheese')

const garden = new Place(
    'The Kitchen Garden',
    'You are in a small, walled garden.'
)
const cupboard = new Place(
    'The Kitchen Cupboard',
    'You are in a cupboard. It is surprisingly roomy.'
)
cupboard.addItem('a tin of spam')

library.addExit('north', kitchen)
garden.addExit('east', kitchen)
cupboard.addExit('west', kitchen)

kitchen.addExit('south', library)
kitchen.addExit('west', garden)
kitchen.addExit('east', cupboard)

const player = new Player('Kandra', 50)
player.addItems('The Sword of Doom')
player.place = kitchen

const render = () => {
    console.clear()
    console.log(player.place.getDescription())
    console.log(player.getDescription())
}

const go = direction => {
    player.place = player.place.exits[direction]
    render()
    return ''
}

const get = () => {
    let item = player.place.items.pop();
    player.addItems(item)
    render()
    return ''
}

render()
get()
go('south')

go('north')
go('west')
