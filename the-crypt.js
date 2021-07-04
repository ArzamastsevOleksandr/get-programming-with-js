const {getGame} = require("./game");

const game = getGame()
game.get()
game.go('south')
game.go('north')
game.go('west')
game.go('bugaga')
game.get()