const parseInput = commandString => {
    const tokens = commandString.split(' ')

    const command = {
        type: tokens.shift()
    }
    if (command.type === 'go' || command.type === 'use') {
        command.direction = tokens.pop()
    }
    command.item = tokens.join(' ')

    switch (command.type) {
        case 'get':
            window.theCrypt.game.get()
            break
        case 'go':
            window.theCrypt.game.go(command.direction)
            break
        case 'use':
            window.theCrypt.game.use(command.item, command.direction)
            break
        // ?? default?
    }
    document.getElementById('txtCommand').value = ''
    document.getElementById('txtCommand').focus()
}