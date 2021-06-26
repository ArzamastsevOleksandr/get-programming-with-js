const ages = {}

ages['John Wick'] = 55
ages['Jack'] = 13

console.log(ages.Jack)
console.log(ages['John Wick'])

const addAge = (name, age) => ages[name] = age

addAge('John Lark', 48)
console.log(ages['John Lark'])

console.log(Object.keys(ages))

const text = 'one cold shower a day keeps the one fewer away. cold is a'
const wordCounters = {}
text.split(' ').forEach(word => {
    if (wordCounters[word] !== undefined) {
        ++wordCounters[word]
    } else {
        wordCounters[word] = 1
    }
})
console.log(text + " stats are: " + Object.keys(wordCounters).map(key => key + ': ' + wordCounters[key]).join(', '))
