const Planet = function (name, position, type) {
    this.name = name
    this.position = position
    this.type = type
    this.moons = []

    this.show = function () {
        console.log(
            this.name + ": planet " + this.position + " - " + this.type + '\n' +
            (this.moons.length === 0 ? '' : 'Moons: ' + this.moons.join(', ') + '\n')
        )
    }

    this.addMoons = function (...moons) {
        moons.forEach(m => this.moons.unshift(m))
    }
}

let jupiter = new Planet('Jupiter', 5, 'Gas Giant');
jupiter.addMoons('Io', 'Europa')

let neptune = new Planet('Neptune', 8, 'Ice Giant')
neptune.addMoons('Triton')

const planets = [jupiter, neptune]
planets.forEach(p => p.show())

planets.forEach(p => console.log('Planet ' + p + ' is instance of Planet: ' + p instanceof Planet)) // all are false wtf??

console.log(new Planet('Jupiter', 5, 'Gas Giant') instanceof Planet) // this is true WTF?