<template>
    <Page
        actionBarHidden='true'>
        <GridLayout rows='100, *'>
            <StackLayout row='0'>
                <Label
                    v-if='locationError'
                    class='error-message'
                    :text='locErrorMessage'></Label>
            </StackLayout>
            <StackLayout row='1'>
                <TextField
                    ref='s'
                    v-model='city'
                    @returnPress='search'
                    @focus='onFocus'
                    @blur='isFocused = false'
                    hint='enter location'></TextField>
            </StackLayout>
        </GridLayout>
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

                    this.getData(this.url)
                } else {
                    this.locationError = true
                    this.locErrorMessage = 'nothing entered 🤔'
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

GridLayout {
    height: 100%;
    margin: 50 20 0 20;
}

.error-message {
    background-color: #6bc5da;
    animation-name: pulse;
    animation-duration: 0.3s;
    padding: 20 30;
    border-radius: 10;
    margin: 0;
    font-family: 'Lato';
    color: white;
    font-weight: bold;
    text-align: center;
    width: 400;
}

TextField {
    border-width: 2;
    border-color: #6bc5da;
    background-color: white;
    font-family: 'Quicksand';
    padding: 20 30;
    border-radius: 50;
    font-size: 20;
    font-weight: bold;
    text-transform: uppercase;
    width: 300;
    margin: 50 30 0 30;
}
</style>