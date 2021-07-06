const {Place} = require("../model/place");

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

module.exports = {
    buildMap: buildMap
}
