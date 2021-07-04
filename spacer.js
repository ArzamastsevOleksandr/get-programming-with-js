const SPACE = ' '

const getBorder = (symbol, quantityOfChars) => symbol.repeat(quantityOfChars)

const padWithSpaces = (string, maxWidth) => string + SPACE.repeat(maxWidth - string.length)

const wrap = (string, left, right) => left + string + right

const spacer = {
    getBorder,
    padWithSpaces,
    wrap
}

module.exports = {
    spacer
}
