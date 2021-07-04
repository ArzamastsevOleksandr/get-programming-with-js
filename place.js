const SPACE = ' '
const DASH = '-'
const ITEMS = 'Items:'
const ITEMS_LEFT_BORDER = SPACE.repeat(2)
const ITEM_SEPARATOR = DASH + SPACE.repeat(1)

// todo: separate model from description functionality
const Place = function (title, description) {
    const EXIT_SEPARATOR = DASH + SPACE.repeat(1)
    const EXITS_LEFT_BORDER = SPACE.repeat(2)

    const items = []
    const exits = {}
    const challenges = {}

    this.addExit = (direction, place) => exits[direction] = place

    this.getExit = direction => exits[direction]

    this.getLastItem = () => items.pop()

    this.addChallenge = (direction, challenge) => challenges[direction] = challenge

    this.getChallenge = direction => challenges[direction]

    // todo: fix: when items is empty - do not show the items
    this.getDescription = () => title + '\n'
        + description + '\n'
        + getItemsDescription() + '\n'
        + getExitsDescription()

    const getItemsDescription = () => ITEMS + '\n'
        + items.map(item => ITEMS_LEFT_BORDER + ITEM_SEPARATOR + item).join('\n')

    const getExitsDescription = () => 'Exits from ' + title + ':' + '\n'
        + Object.keys(exits).map(exit => EXITS_LEFT_BORDER + EXIT_SEPARATOR + exit).join('\n')

    this.addItem = item => items.push(item)

    this.toString = () => title
}

module.exports = {
    Place
}
