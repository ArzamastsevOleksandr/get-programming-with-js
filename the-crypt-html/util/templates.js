(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }
    if (window.theCrypt.util === undefined) {
        window.theCrypt.util = {}
    }

    const renderTemplate = (template, fieldName, data) => {
        const value = '{{' + fieldName + '}}'

        while (template.includes(value)) {
            template = template.replace(value, data[fieldName])
        }
        return template
    }

    window.theCrypt.util.templateRenderer = {
        renderTemplate: renderTemplate
    }
})()
