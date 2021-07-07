(function () {
    const dataArray = [
        {
            title: "Fitness App v1.0 Live!",
            body: "Yes, version 1 is here...",
            posted: "October 3rd, 2016",
            author: "Oskar",
            social: "@appOskar51"
        },
        {
            title: "Fitness App v2.0 Live!",
            body: "No, version 1 is too old...",
            posted: "November 24, 2020",
            author: "Ann",
            social: "@ann"
        }
    ]

    const getData = amount => dataArray.slice(0, amount)

    if (window.fitnessData === undefined) {
        window.fitnessData = {
            getData: getData
        }
    }
})()