const {getGame} = require("./the-crypt");

const game = getGame('John')
game.go('south')
game.use('holy water', 'south')
game.go('south')

game.go('north')
game.go('west')
game.go('bugaga')
game.get()