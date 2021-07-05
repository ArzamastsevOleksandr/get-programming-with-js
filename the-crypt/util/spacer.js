const SPACE = ' '

const getBorder = (symbol, quantityOfChars) => symbol.repeat(quantityOfChars)

const padWithSpaces = (string, maxWidth) => string + SPACE.repeat(maxWidth - string.length)

module.exports = {
    spacer: {
        getBorder: getBorder,
        padWithSpaces: padWithSpaces
    }
}
