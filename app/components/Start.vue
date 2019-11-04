<template>
    <Page actionBarHidden='true'>
    </Page>
</template>


<script>
    const geolocation = require("nativescript-geolocation")
    const appSettings = require("tns-core-modules/application-settings")
    const accuracy = require("tns-core-modules/ui/enums");
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
                    this.$navigateTo(Weather, {
                        props: {
                            url: url
                        }
                    })
                })
                .catch(err => {
                    let cities = appSettings.getString('city')
                    let savedCities

                    if (cities) {
                        savedCities = cities.split(' ')

                        this.$navigateTo(Weather, {
                            props: {
                                url: "https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=" + savedCities[0]
                            }
                        })
                    } else {
                        this.$navigateTo(Search)
                    }
                })

        }
    }
</script>