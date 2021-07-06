if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

if (window.theCrypt.util === undefined) {
    window.theCrypt.util = {}
}

window.theCrypt.util.spacer = {
    getBorder: function (symbol, quantityOfChars){
        return symbol.repeat(quantityOfChars)
    },
    padWithSpaces: function (string, maxWidth) {
        return string + ' '.repeat(maxWidth - string.length)
    }
}
