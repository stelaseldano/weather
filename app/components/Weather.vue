<template>
    <Page actionBarHidden='true'
        enableSwipeBackNavigation='false'
        backgroundSpanUnderStatusBar='true'>
        <GridLayout
            rows='50, *, 50'
            class='view-container'>
            <FlexboxLayout
                row='2'
                justifyContent='space-between'
                margin='0 20'>
                <StackLayout>
                    <Button
                        android:class='btn btn-primary'
                        v-if='showSaveButton'
                        text='save city'
                        @tap='saveCity'></Button>
                </StackLayout>
                <StackLayout>
                    <Button
                        android:class='btn btn-primary'
                        text='search'
                        @tap='toSearch'></Button>
                </StackLayout>
            </FlexboxLayout>

            <StackLayout
                verticalAlignment='middle'
                row='1'>
                    <Image :src='response.image'></Image>
                    <Label :text='response.temp' class='temp current'></Label>
                    <Label :text='response.name' class='location'></Label>
                    <FlexboxLayout
                        row='1'
                        alignItems='flex-end'
                        justifyContent='space-around'
                        class='temperature-container'>
                        <Label :text='"min " + response.min' class='temp min'></Label>
                        <Label :text='"max " + response.max' class='temp max'></Label>
                    </FlexboxLayout>
            </StackLayout>

            <ScrollView row='0' orientation='horizontal' class='saved-cities-wrapper' v-if='savedCities.length > 0'>
                <StackLayout orientation='horizontal' class='saved-cities'>
                    <template v-for='(item, index) in savedCities'>
                        <StackLayout orientation='horizontal' verticalAlignment='middle' class='city-item' :key='index'>
                            <StackLayout orientation='horizontal' verticalAlignment='middle'>
                                <Label
                                    class='city-btn'
                                    :text='item.split("+").join(" ")'
                                    @tap='toWeather(item)'
                                    ></Label>
                                <StackLayout
                                    verticalAlignment='middle'
                                    class='remove-btn'
                                    @tap='removeCity(item, index)'>
                                    <Image src='~/images/icon-close.png' height='10' width='10'></Image>
                                </StackLayout>
                            </StackLayout>
                        </StackLayout>
                    </template>
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>
    const appSettings = require("tns-core-modules/application-settings")
    import Search from './Search'
    import Weather from './Weather'
    import { mixin } from '../mixins'

    export default {
        name: 'Weather',
        components: {
            Search,
            Weather
        },
        mixins: [mixin],
        props: {
            response: Object,
        },
        data() {
            return {
                savedCities: [],
                showSaveButton: true,
            }
        },
        created() {
            this.savedCities = this.getSavedCities()
            this.city = this.response.name.split(' ').join('+')

            if (this.savedCities.includes(this.city)) {
                this.showSaveButton = false
            } else {
                this.showSaveButton = true
            }
        },
        watch: {
            savedCities(newState) {
                if (newState.includes(this.city)) {
                    this.showSaveButton = false
                } else {
                    this.showSaveButton = true
                }
            }
        },
        methods: {
            toSearch() {
                this.$navigateTo(Search, {
                    transition: {
                        name: 'fade'
                    }
                })
            },
            saveCity() {
                const localCities = appSettings.getString('city')

                if (localCities) {
                    const list = localCities.split(' ')
                    if (!list.includes(this.city)) {
                        appSettings.setString('city', this.city + ' ' + localCities)
                        this.savedCities.unshift(this.city)
                    }
                } else {
                    appSettings.setString('city', this.city)
                    this.savedCities.unshift(this.city)
                }
            },
            removeCity(item, index) {
                const localCities = appSettings.getString('city')
                let list = localCities.split(' ')
                list.splice(index, 1)
                appSettings.setString('city', list.join(' '))
                this.savedCities.splice(index, 1)
            },
            toWeather(city) {
                let url = 'https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=' + city

                this.getData(url)
            },
            getSavedCities() {
                const localCities = appSettings.getString('city')

                if (localCities) {
                    return localCities.split(' ')
                }

                return []
            }
        }
    }
</script>

<style scoped>

.view-container {
    margin: 10 0 0 0;
}

Label {
    font-family: 'Quicksand-Regular';
    text-align: center;
    font-weight: 300;
    color: black;
}

.temperature-container {
    margin: 10 0;
}

.temp.current {
    font-family: 'Lato-Regular';
    font-size: 45;
    font-weight: 400;
}

.temp.min,
.temp.max {
    font-size: 20;
    font-family: 'Quicksand-Regular';
}

.location {
    font-size: 20;
    font-family: 'Quicksand-Regular';
    text-transform: uppercase;
    margin: 20 0;
}

Image {
    height: 250;
    width: 250;
}

.saved-cities-wrapper {
    background-color: white;
}

.saved-cities {
    margin: 0;
}

.city-item {
    padding: 0;
    margin: 0 12;
    border-width: 1;
    border-radius: 50%;
    padding: 0 15 0 10;
}

.close-btn {
    height: 30;
    width: 30;
}

.remove-btn {
    border-radius: 0;
    padding: 0;
    margin: 3 0 0 0;
}

.btn {
    color: white;
    background-color: #6bc5da;
    min-height: 36;
    min-width: 64;
    padding: 10 10 10 10;
    font-size: 14;
    margin: 0;
}

.city-btn {
    font-family: 'Lato-Bold';
    color: black;
    background-color: white;
    text-transform: capitalize;
    margin: 8;
    padding: 0 10 0 0;
    font-size: 15;
    border-color: transparent;
    border-width: 1;
}
</style>