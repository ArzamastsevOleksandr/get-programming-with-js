const inc = () => {
    let count = 0
    return () => ++count
}

const numCount = inc()
const stepCount = inc()

console.log(numCount())
console.log(numCount())

console.log(stepCount())
console.log(stepCount())

const Counter = function () {
    let counter = 0

    this.inc = () => ++counter
}

const nameCounter = new Counter()
console.log(nameCounter.inc())
console.log(nameCounter.inc())
console.log(nameCounter.counter)

const Quiz = function () {
    const questionsAndAnswers = [
        {
            question: 'Q1',
            answer: 'A1'
        },
        {
            question: 'Q2',
            answer: 'A2'
        }
    ]

    let index = 0

    return {
        showQuiz: function () {
            console.log(questionsAndAnswers[index].question)
        },
        showAnswer: function () {
            console.log(questionsAndAnswers[index].answer)
        },
        next: function () {
            index = index + 1
            if (index === questionsAndAnswers.length) {
                index = 0
            }
            console.log('index is: ' + index)
        }
    }
}

const quiz = new Quiz()

quiz.showQuiz()
quiz.showAnswer()
quiz.next()

quiz.showQuiz()
quiz.showAnswer()
quiz.next()