const {userNamespace} = require("./user-sessions");

const ann = new userNamespace.User('Ann');
ann.addSession(new Date(), 90)
console.log(ann.getStats())

const john = new userNamespace.User('John');
john.addSession(new Date(), 45)
john.addSession(new Date(), 25)
console.log(john.getStats())

const userTracker = new userNamespace.UserTracker();
userTracker.register(ann)
userTracker.register(john)

console.log('Top by duration is: ' + userTracker.topByDuration().toString())
console.log('Top by sessions is: ' + userTracker.topBySessions().toString())
console.log()

userTracker.logSession({
    userName: ann.getName(),
    date: new Date(),
    duration: 15
})

userTracker.logSession({
    userName: 'BUGAGA',
    date: new Date(),
    duration: 15
})

console.log('Top by duration is: ' + userTracker.topByDuration().toString())
console.log('Top by sessions is: ' + userTracker.topBySessions().toString())
console.log()