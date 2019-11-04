export function fetchForecast(url) {
    return fetch(url)
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.cod === 200) {
                return {
                    name: response.name,
                    temp: Math.round(response.main.temp).toString() + '°',
                    max: Math.round(response.main.temp_max).toString() + '°',
                    min: Math.round(response.main.temp_min).toString() + '°',
                    image: setImage(response.weather[0].description),
                    description: response.weather[0].description,
                    country: response.sys.country,
                    cod: response.cod
                }
            } else {
                return {
                    cod: response.cod,
                    message: response.message
                }
            }
        })
        .catch(err => {
            console.err(err)
        })
}

function setImage(description) {
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