if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

if (window.theCrypt.util === undefined) {
    window.theCrypt.util = {}
}

window.theCrypt.util.collections = {
    isArrayNotEmpty: array => array && array.length > 0
}