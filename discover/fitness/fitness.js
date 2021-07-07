(function () {
    const dataArray = window.fitnessData.getData(2)

    const replacePlaceholder = (string, fieldName, data) => {
        while (string.includes('{{' + fieldName + '}}')) {
            string = string.replace('{{' + fieldName + '}}', data[fieldName])
        }
        return string
    }

    const newsItemTemplate = document.getElementById('newsItemTemplate')
    let newsItem = newsItemTemplate.innerHTML

    document.getElementById('news').innerHTML = dataArray.map(data => Object.keys(data)
        .reduce((rendered, key) => replacePlaceholder(rendered, key, data), newsItem)
    ).join('')
})()