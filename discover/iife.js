(() => console.log('iife'))()

const iifeFunction = (() => {
    const number = Math.random() * 10 + 1
    const f = () => console.log('number is: ' + number)

    return {
        f: f
    }
})()

iifeFunction.f()