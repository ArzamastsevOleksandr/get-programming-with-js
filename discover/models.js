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

const u = new User('Ann')
u.addSession(Date.now(), 30)
console.log(u.getData())