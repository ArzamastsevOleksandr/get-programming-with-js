const {Place} = require("./place");
const {Player} = require("./player");

const getGame = () => {
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

module.exports = {
    getGame
}
