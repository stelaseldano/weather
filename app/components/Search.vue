<template>
    <Page
        actionBarHidden='true'>
        <FlexboxLayout
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            class='view-container'>
            <TextField
                v-model='city'
                @returnPress='search'
                @focus='onFocus'
                @blur='isFocused = false'
                hint='enter location'
                :class='{ "focused": isFocused }'></TextField>
            <Label
                v-if='noLocation'
                text='no location'></Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Weather from './Weather'
    import { fetchForecast, setImage } from '../upstream'

    export default {
        components: {
            Weather
        },
        data() {
            return {
                url: '',
                isFocused: false,
                noLocation: false,
                city: ''
            }
        },
        methods: {
            search() {
                let city = this.city ? this.city.toLowerCase().trim() : ''

                if (city) {
                    this.url = 'https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=' + city

                    fetchForecast(this.url)
                        .then(result => {
                            if (result.cod === 200) {
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
                            } else {
                                this.noLocation = true
                            }
                        })
                        
                } else {
                    this.noLocation = true
                }

            },
            onFocus() {
                this.isFocused = true
                this.noLocation = false
            },
        }
    }
</script>

<style scoped>

.view-container {
    margin: 50 30;
}

TextField {
    border-width: 1;
    border-color: #6bc5da;
    background-color: white;
    font-family: 'Quicksand';
    padding: 20 30;
    border-radius: 50;
    font-size: 20;
    text-transform: uppercase;
    width: 100%;
}

TextField.focused {
    animation-name: pulse;
    animation-duration: 0.3s;
}
</style>