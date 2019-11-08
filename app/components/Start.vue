<template>
    <Page actionBarHidden='true'>
    </Page>
</template>


<script>
    const geolocation = require("nativescript-geolocation")
    const appSettings = require("tns-core-modules/application-settings")
    const accuracy = require("tns-core-modules/ui/enums")
    import Search from './Search'
    import Weather from './Weather'
    import { mixin } from '../mixins'
    import { baseUrl } from '../url'

    export default {
        name: 'Start',
        mixins: [mixin],
        created() {
            geolocation.enableLocationRequest()
                .then(res => {
                    return geolocation.getCurrentLocation({ desiredAccuracy: accuracy.high, updateDistance: 0.1, timeout: 20000 })    
                })
                .then(location => {
                    let url = baseUrl + '&units=metric' + '&lat=' + location.latitude + '&lon=' + location.longitude
                    
                    this.getData(url)
                })
                .catch(err => {
                    let cities = appSettings.getString('city')

                    if (cities) {
                        let url = baseUrl + '&units=metric' + '&q=' + cities.split(' ')[0]
                        
                        this.getData(url)
                    } else {
                        this.$navigateTo(Search, {
                            transition: {
                                name: 'fade'
                            }
                        })
                    }
                })
        }
    }
</script>