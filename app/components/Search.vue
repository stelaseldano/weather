<template>
    <Page actionBarHidden='true'>
        <StackLayout>
            <Label text='search'></Label>
            <TextField v-model='city' @returnPress='buildUrl' hint='Enter city'></TextField>
        </StackLayout>
    </Page>
</template>

<script>
    import Weather from './Weather'

    export default {
        components: {
            Weather
        },
        data() {
            return {
                url: '',
            }
        },
        computed() {
            this.city = ''
        },
        methods: {
            buildUrl() {
                let city = this.city.toLowerCase().trim();
                this.url = 'https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=' + city;
                console.log(this.url)

                this.$navigateTo(Weather, {
                    props: {
                        url: this.url
                    }
                })
            },
        }
    }
</script>