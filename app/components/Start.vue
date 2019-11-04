<template>
    <Page actionBarHidden='true'>
    </Page>
</template>


<script>
    const geolocation = require("nativescript-geolocation")
    const appSettings = require("tns-core-modules/application-settings")
    const accuracy = require("tns-core-modules/ui/enums")
    import { fetchForecast, setImage } from '../upstream'
    import Search from './Search'
    import Weather from './Weather'

    export default {
        name: 'Start',
        created() {
            geolocation.enableLocationRequest()
                .then(res => {
                    return geolocation.getCurrentLocation({ desiredAccuracy: accuracy.high, updateDistance: 0.1, timeout: 20000 })    
                })
                .then(location => {
                    let url = "https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431" + "&units=metric&lat=" + location.latitude + "&lon=" + location.longitude;
                    
                    fetchForecast(url)
                        .then(result => {
                            this.$navigateTo(Weather, {
                                props: {
                                    response: {
                                        name: result.name,
                                        temp: Math.round(result.main.temp).toString() + '°',
                                        max: Math.round(result.main.temp_max).toString() + '°',
                                        min: Math.round(result.main.temp_min).toString() + '°',
                                        image: setImage(result.weather[0].description),
                                        description: result.weather[0].description,
                                        country: result.sys.country,
                                        cod: result.cod
                                    }
                                }
                            })
                        })
                })
                .catch(err => {
                    let cities = appSettings.getString('city')
                    let savedCities

                    if (cities) {
                        let url = 'https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=' + cities.split(' ')[0]

                        fetchForecast(url)
                            .then(result => {
                                this.$navigateTo(Weather, {
                                    props: {
                                        response: {
                                            name: result.name,
                                            temp: Math.round(result.main.temp).toString() + '°',
                                            max: Math.round(result.main.temp_max).toString() + '°',
                                            min: Math.round(result.main.temp_min).toString() + '°',
                                            image: setImage(result.weather[0].description),
                                            description: result.weather[0].description,
                                            country: result.sys.country,
                                            cod: result.cod
                                        }
                                    }
                                })
                            })

                        
                    } else {
                        this.$navigateTo(Search)
                    }
                })

        }
    }
</script>