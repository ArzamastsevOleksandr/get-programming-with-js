const Place = function (title, description) {
    const items = []
    const exits = {}
    const challenges = {}

    this.addExit = (direction, place) => exits[direction] = place

    this.getExit = direction => exits[direction]

    this.getLastItem = () => items.pop()

    this.addChallenge = (direction, challenge) => challenges[direction] = challenge

    this.getChallenge = direction => challenges[direction]

    this.addItem = item => items.push(item)

    this.getData = () => {
        return {
            title: title,
            description: description,
            items: items.slice(),
            exits: exits
        }
    }

    this.toString = () => title
}

module.exports = {
    Place: Place
}
