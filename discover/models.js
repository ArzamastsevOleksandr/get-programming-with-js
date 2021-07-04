const User = function (name) {
    const sessions = []
    let totalDuration = 0

    this.addSession = (date, duration) => {
        sessions.push({
            date,
            duration
        })
        totalDuration += duration
        return totalDuration
    }

    this.getData = () => {
        return {
            name,
            totalDuration,
            sessions: sessions.slice()
        }
    }
}

const user = new User('Ann')
user.addSession(new Date(), 30)
user.addSession(new Date(Date.now() + 100000000), 45)
console.log(user.getData())

const userView = (() => {
    const getUserStats = user => {
        const userData = user.getData();

        return userData.name + '\n'
            + userData.sessions.map(s => s.duration + ' min on ' + s.date.toISOString().slice(0, 10)).join('\n') + '\n'
            + userData.totalDuration + ' min so far' + '\n'
    }

    return {
        render: user => console.log(getUserStats(user))
    }
})()

userView.render(user)