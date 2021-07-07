(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }

    if (window.theCrypt.util === undefined) {
        window.theCrypt.util = {}
    }

    const replacePlaceholder = (string, fieldName, data) => {
        while (string.includes('{{' + fieldName + '}}')) {
            string = string.replace('{{' + fieldName + '}}', data[fieldName])
        }
        return string
    }

    window.theCrypt.util.templateRenderer = {
        replacePlaceholder: replacePlaceholder
    }
})()