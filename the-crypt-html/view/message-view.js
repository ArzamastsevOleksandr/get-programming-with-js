if (window.theCrypt === undefined) {
    window.theCrypt = {}
}

if (window.theCrypt.view === undefined) {
    window.theCrypt.view = {}
}

window.theCrypt.view.message = {
    getDescription: message => '** ' + message + ' **'
}
