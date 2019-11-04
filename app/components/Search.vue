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
                v-if='locationError'
                :text='locErrorMessage'></Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import Weather from './Weather'
    import { fetchForecast } from '../upstream'
    import { mixin } from '../mixins'

    export default {
        components: {
            Weather
        },
        mixins: [mixin],
        data() {
            return {
                url: '',
                isFocused: false,
                city: '',
            }
        },
        methods: {
            search() {
                let city = this.city ? this.city.toLowerCase().trim().split(' ').join('+') : ''

                if (city) {
                    this.url = 'https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=' + city

                    this.aMethod(this.url)
                } else {
                    this.locationError = true
                    this.locErrorMessage = 'nothing entered'
                }
            },
            onFocus() {
                this.isFocused = true
                this.locationError = false
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