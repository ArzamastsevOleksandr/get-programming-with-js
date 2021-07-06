const generateRandomGreet = () => {
    const greetings = [
        'Hello',
        'Hi',
        "What's up",
        'Hey man',
        'Pay or die'
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

const rateMovie = () => {
    const ratingsSelect = document.getElementById('ratings')
    const commentInput = document.getElementById('txtComment')
    const commentsList = document.getElementById('comments')

    commentsList.innerHTML += '<li>' + commentInput.value + '(' + ratingsSelect.value + ' stars)' + '</li>'
}