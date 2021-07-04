const {Place} = require("./place");

const defaultMapData = {
    title: 'The Dark House',
    firstPlace: 'The Kitchen',
    places: [
        {
            title: 'The Kitchen',
            description: 'You are in a kitchen. There is a disturbing smell',
            items: [
                'a piece of cheese'
            ],
            exits: [
                {
                    direction: 'south',
                    to: 'The Old Library',
                    challenge: {
                        message : "A zombie sinks its teeth into your neck.",
                        success : "The zombie disintegrates into a puddle of goo.",
                        failure : "The zombie is strangely resilient.",
                        requires : "holy water",
                        itemConsumed : true,
                        damage : 20
                    }
                },
                {
                    direction: 'west',
                    to: 'The Kitchen Garden'
                },
                {
                    direction: 'east',
                    to: 'The Kitchen Cupboard'
                }
            ]
        },
        {
            title: 'The Old Library',
            description: 'You are in a library. Dusty books line the walls',
            items: [
                'a rusty key'
            ],
            exits: [
                {
                    direction: 'north',
                    to: 'The Kitchen'
                }
            ]
        },
        {
            title: 'The Kitchen Garden',
            description: 'You are in a small, walled garden',
            items: [],
            exits: [
                {
                    direction: 'east',
                    to: 'The Kitchen'
                }
            ]
        },
        {
            title: 'The Kitchen Cupboard',
            description: 'You are in a cupboard. It is surprisingly roomy',
            items: [
                'a tin of spam'
            ],
            exits: [
                {
                    direction: 'west',
                    to: 'The Kitchen'
                }
            ]
        }
    ]
}

const buildMap = mapData => {
    const places = {}

    const buildPlaces = placeData => {
        const place = new Place(placeData.title, placeData.description)

        if (placeData.items) {
            placeData.items.forEach(place.addItem)
        }
        places[placeData.title] = place
    }

    const buildExits = placeData => {
        const here = places[placeData.title]

        if (placeData.exits) {
            placeData.exits.forEach(exit => {
                const to = places[exit.to]

                here.addExit(exit.direction, to)
                here.addChallenge(exit.direction, exit.challenge)
            })
        }
    }

    mapData.places.forEach(buildPlaces)
    mapData.places.forEach(buildExits)

    return places[mapData.firstPlace]
}

const buildDefaultMap = () => {
    return buildMap(defaultMapData)
}

module.exports = {
    buildMap: buildMap,
    buildDefaultMap: buildDefaultMap
}
