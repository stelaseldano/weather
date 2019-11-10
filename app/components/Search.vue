<template>
    <Page
        actionBarHidden='true'>

        <GridLayout
            rows='100, *'
            class='view'>

            <StackLayout row='0'>
                <Label
                    v-if='locationError'
                    :text='locErrorMessage'
                    class='error-message'></Label>
            </StackLayout>

            <StackLayout row='1'>
                <TextField
                    hint='enter location'
                    v-model='city'
                    @returnPress='search'
                    @focus='onFocus'
                    @blur='isFocused = false'
                    android:class='textfield textfield--andro' ios:class='textfield textfield--ios'></TextField>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import Forecast from './Forecast'
    import { fetch } from '../fetch'
    import { baseUrl } from '../url'

    export default {
        components: {
            Forecast
        },
        mixins: [fetch],
        data() {
            return {
                isFocused: false,
                city: '',
            }
        },
        methods: {
            search() {
                let city = this.city ? this.city.toLowerCase().trim().split(' ').join('+') : ''

                if (city) {
                    let url = baseUrl + '&units=metric&q=' + city

                    this.getData(url)
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

.view {
    height: 100%;
    margin: 50 20 0 20;
}

.error-message {
    animation-name: pulse;
    animation-duration: 0.3s;
    background-color: #6bc5da;
    border-radius: 10;
    color: white;
    font-family: 'Lato';
    font-weight: bold;
    padding: 20 30;
    margin: 0;
    text-align: center;
    width: 80%;
}

.textfield {
    background-color: white;
    border-color: #6bc5da;
    border-radius: 50;
    border-width: 2;
    font-size: 20;
    font-weight: bold;
    padding: 20 30;
    margin: 50 30 0 30;
    width: 300;
}

.textfield--andro {
    font-family: 'Quicksand-Regular';
}

.textfield--ios {
    font-family: 'Quicksand';
}
</style>