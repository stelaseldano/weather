export function fetchForecast(url) {
    return fetch(url)
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export function setImage(description) {
    if (description.includes('rain') || description.includes('thunderstorm') || description.includes('drizzle')) {
        return "~/images/rain.png"
    } else if (description.includes('broken') && description.includes('clouds') || description.includes('few clouds')) {
        return "~/images/suncloud.png"
    } else if (description.includes('clouds')) {
        return "~/images/cloud.png"
    } else if (description.includes('snow') || description.includes('sleet') || description.includes('mist') || description.includes('drizzle') || description.includes('haze')) {
        return "~/images/suncloud.png"
    } else if (description.includes('clear')) {
        return "~/images/sun.png"
    }

    return ''
}