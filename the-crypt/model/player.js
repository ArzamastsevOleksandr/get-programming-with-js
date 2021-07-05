const Player = function (name, health) {
    const items = []
    let place = null

    this.addItems = (...elements) => elements.forEach(item => items.push(item))

    this.hasItem = item => items.indexOf(item) !== -1

    this.removeItem = item => {
        const index = items.indexOf(item)
        if (index !== -1) {
            items.splice(index, 1)
        }
    }

    this.applyDamage = damage => health -= damage

    this.getData = () => {
        const data = {
            name,
            health,
            items: items.slice()
        }
        if (place) {
            data.place = place
        }
        return data
    }

    this.setPlace = newPlace => place = newPlace

    this.getPlace = () => place
}

module.exports = {
    Player: Player
}
