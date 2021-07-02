const getGame = () => {
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

        const items = []
        let place = null

        const getLocationDescription = () => name + ' is in ' + place.toString()

        const getHealthDescription = () => name + ' has health ' + health

        const getBorderPlayer = (quantityOfChars) => LEFT_BORDER_WRAPPER
            + getBorder(BORDER_SYMBOL_PLAYER, quantityOfChars)
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
                + wrap(padWithSpaces(name, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
                + getBorderPlayer(maxWidth) + '\n'
                + wrap(padWithSpaces(locationDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
                + wrap(padWithSpaces(healthDescription, maxWidth), LEFT_BORDER_PLAYER, RIGHT_BORDER_PLAYER) + '\n'
                + getBorderPlayer(maxWidth) + '\n'
                + getItemsDescription(items) + '\n'
                + getBorderPlayer(maxWidth) + '\n'
        }
    }

    const Place = function (title, description) {
        const EXIT_SEPARATOR = DASH + SPACE.repeat(1)
        const EXITS_LEFT_BORDER = SPACE.repeat(2)

        const items = []
        const exits = {}

        this.addExit = (direction, place) => exits[direction] = place

        this.getExit = direction => exits[direction]

        this.getLastItem = () => items.pop()

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

    const library = new Place(
        'The Old Library',
        'You are in a library. Dusty books line the walls'
    )
    library.addItem('a rusty key')

    const kitchen = new Place(
        'The Kitchen',
        'You are in a kitchen. There is a disturbing smell'
    )
    kitchen.addItem('a piece of cheese')

    const garden = new Place(
        'The Kitchen Garden',
        'You are in a small, walled garden'
    )
    const cupboard = new Place(
        'The Kitchen Cupboard',
        'You are in a cupboard. It is surprisingly roomy'
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
    player.setPlace(kitchen)

    const render = () => {
        console.clear()
        console.log(player.getPlace().getDescription())
        console.log(player.getDescription())
    }

    render()

    return {
        go: function (direction) {
            const place = player.getPlace()
            const destination = place.getExit(direction);
            if (destination) {
                player.setPlace(destination)
                render()
            } else {
                console.log('There is no exit in that direction: ' + direction)
            }
        },
        // todo: describe that an item was picked and reduce boilerplate logging
        get: function () {
            const place = player.getPlace();
            const lastItem = place.getLastItem();
            if (lastItem) {
                player.addItems(lastItem)
                render()
            } else {
                console.log('There are no items in this place: ' + place.toString())
            }
        }
    }
}

const game = getGame()
game.get()
game.go('south')
game.go('north')
game.go('west')
game.go('bugaga')
game.get()
