(function () {
    if (window.theCrypt === undefined) {
        window.theCrypt = {}
    }
    if (window.theCrypt.view === undefined) {
        window.theCrypt.view = {}
    }
    const messageDiv = document.getElementById('message')

    const messageTemplate = document.getElementById('messageTemplate')

    const render = message => messageDiv.innerHTML = window.theCrypt.util.templateRenderer.replacePlaceholder(
        messageTemplate.innerHTML, 'message', {message: message}
    )

    window.theCrypt.view.message = {
        render: render
    }
})()