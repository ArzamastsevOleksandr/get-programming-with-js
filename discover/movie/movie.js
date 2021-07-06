const generateRandomGreet = () => {
    const greetings = [
        'Hello',
        'Hi',
        "What's up"
    ]
    const randomGreet = greetings[Math.floor(Math.random() * greetings.length)]

    const greetingParagraph = document.getElementById('greeting')

    greetingParagraph.innerHTML = randomGreet
}

const movieData = [
    {
        "title": "Inside Out",
        "summary": "An emotional adventure inside the head of a young girl."
    },
    {
        "title": "Tomorrowland",
        "summary": "Recreating the hope and wonder of previous generations."
    },
    {
        "title": "The Wizard of Oz",
        "summary": "Strangers find friendship and strength on a long walk."
    }
];

const getMovieHtml = movie => '<h3>' + movie.title + '</h3>'
    + '<p>' + movie.summary + '</p>'

const getAllMoviesHtml = movies => '<ul>'
    + movies.map(movie => '<li>' + getMovieHtml(movie) + '</li>').join('')
    + '</ul>'

const renderMovies = () => {
    const moviesDiv = document.getElementById('movies')
    moviesDiv.innerHTML = getAllMoviesHtml(movieData)
}

module.exports = {
    generateRandomGreet: generateRandomGreet,
    renderMovies: renderMovies
}