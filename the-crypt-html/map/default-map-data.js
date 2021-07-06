if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

if (window.theCrypt.map === undefined) {
    window.theCrypt.map = {}
}

window.theCrypt.map.defaultMapData = {
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