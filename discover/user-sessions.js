const User = function (name) {
    const sessions = []

    this.addSession = (date, duration) => {
        sessions.push({
            date: date,
            duration: duration
        })
    }

    this.getStats = () => {
        return name + ' stats: ' + '\n'
            + sessions.map(s => s.duration + ' min on ' + s.date.toISOString().slice(0, 10)).join('\n') + '\n'
    }

    this.getTotalDuration = () => sessions.map(s => s.duration).reduce((a, b) => a + b)

    this.getSessions = () => sessions.slice()

    this.getName = () => name

    this.toString = () => name + ' (totalDuration: ' + this.getTotalDuration() + ' sessions: ' + sessions.length + ')'
}

const UserTracker = function () {
    const userRecords = {}

    this.register = user => {
        userRecords[user.getName()] = user
    }

    this.topByDuration = () => {
        const record = Object.keys(userRecords)
            .map(userName => {
                const user = userRecords[userName];

                return {
                    user: user,
                    totalDuration: user.getTotalDuration()
                }
            }).reduce((a, b) => a.totalDuration > b.totalDuration ? a : b)
        return record.user
    }

    this.topBySessions = () => {
        const record = Object.keys(userRecords)
            .map(userName => {
                const user = userRecords[userName];

                return {
                    user: user,
                    totalSessions: user.getSessions()
                }
            }).reduce((a, b) => a.totalSessions > b.totalSessions ? a : b)
        return record.user
    }

    this.logSession = sessionData => {
        const userName = sessionData.userName;
        const userRecord = userRecords[userName];

        if (userRecord) {
            userRecord.addSession(sessionData.date, sessionData.duration)
            console.log('Logged session for ' + userName)
        } else {
            console.error('No user with name ' + userName + ' is registered')
        }
    }
}

module.exports = {
    userNamespace: {
        User: User,
        UserTracker: UserTracker
    }
}