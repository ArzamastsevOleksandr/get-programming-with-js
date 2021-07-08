(function () {
    const userDataDiv = document.getElementById('userDataDiv')

    const userDataTemplate = document.getElementById('userDataTemplate').innerHTML
    const sessionTemplate = document.getElementById('sessionTemplate').innerHTML

    const usersAndSessions = {}

    usersAndSessions['Ann'] = {
        name: 'Ann',
        sessions: [
            {
                date: '2020-06-06',
                duration: 30
            },
            {
                date: '2020-06-07',
                duration: 45
            }
        ]
    }
    usersAndSessions['John'] = {
        name: 'John',
        sessions: [
            {
                date: '2020-06-08',
                duration: 33
            },
            {
                date: '2020-06-09',
                duration: 55
            }
        ]
    }

    const replacePlaceholders = (template, key, source) => {
        while (template.includes('{{' + key + '}}')) {
            template = template.replace('{{' + key + '}}', source[key])
        }
        return template
    }

    const loadUserSessions = () => {
        const usersSelect = document.getElementById('usersSelect')
        const userName = usersSelect.value

        const source = usersAndSessions[userName]

        userDataDiv.innerHTML = replacePlaceholders(userDataTemplate, 'name', source)

        const sessionsList = document.getElementById('sessions')
        sessionsList.innerHTML = source.sessions
            .map(s => s.duration + ' min on ' + s.date)
            .map(s => replacePlaceholders(sessionTemplate, 'session', {session: s}))
            .reduce((a, b) => a + b)

        const userMessage = document.getElementById('userMessage')
        userMessage.innerHTML = source.sessions.map(s => s.duration).reduce((a, b) => a + b) + ' min total'
    }

    const loadSessionsBtn = document.getElementById('loadSessionsBtn')
    loadSessionsBtn.addEventListener('click', loadUserSessions)

    loadUserSessions()

    const logSession = () => {
        const usersSelect = document.getElementById('usersSelect')
        const userName = usersSelect.value

        const source = usersAndSessions[userName]

        const sessionDate = document.getElementById('sessionDate').value
        const sessionDuration = document.getElementById('sessionDuration').value

        source.sessions.push({
            date: sessionDate,
            duration: Number(sessionDuration)
        })

        loadUserSessions()

        document.getElementById('sessionDate').value = ''
        document.getElementById('sessionDuration').value = ''
    }

    const logSessionBtn = document.getElementById('logSessionBtn')
    logSessionBtn.addEventListener('click', logSession)
})()