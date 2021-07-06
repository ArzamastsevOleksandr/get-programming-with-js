// const randomNumberBtn = document.querySelector('#randomNumber')
//
// if (randomNumberBtn) {
//     alert('+')
// } else {
//     alert('-')
// }

// randomNumberBtn.addEventListener('click', () => {
//     const randomNumber = () => Math.floor(Math.random() * 100)
//
//     const numberOutput = document.querySelector('#numberOutput')
//     numberOutput.innerHTML = randomNumber().toString()
// })

const fff = () => {
    const randomNumber = () => Math.floor(Math.random() * 100)

    const numberOutput = document.querySelector('#numberOutput')
    numberOutput.innerHTML = randomNumber().toString()
}
