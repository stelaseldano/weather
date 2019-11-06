<template>
    <Page actionBarHidden='true'
        enableSwipeBackNavigation='false'
        backgroundSpanUnderStatusBar='true'>
        <GridLayout
            rows='50, *, 60'
            class='view-container'>
            <FlexboxLayout
                row='0'
                justifyContent='space-between'
                margin='0 20'>
                <StackLayout>
                    <Button
                        v-if='showSaveButton'
                        text='save city'
                        @tap='saveCity'></Button>
                </StackLayout>
                <StackLayout>
                    <Button
                        text='search'
                        @tap='toSearch'></Button>
                </StackLayout>
            </FlexboxLayout>

            <ScrollView row='2' orientation='horizontal' class='saved-cities-wrapper' v-if='savedCities.length > 0'>
                <StackLayout orientation='horizontal' class='saved-cities'>
                    <template v-for='(item, index) in savedCities'>
                        <StackLayout orientation='horizontal' verticalAlignment='middle' class='city-item' :key='index'>
                            <Button
                                :text='item.split("+").join(" ")'
                                @tap='toWeather(item)'
                                class='city-btn'></Button>
                            <StackLayout
                                height='30'
                                verticalAlignment='middle'
                                class='remove-btn'
                                @tap='removeCity(item, index)'>
                                <Image src='~/images/icon-close.png' height='10' width='10'></Image>
                            </StackLayout>
                        </StackLayout>
                    </template>
                </StackLayout>
            </ScrollView>

            <StackLayout
                row='1'>
                <GridLayout 
                    rows='*, 80' verticalAlignment='center'>
                    <StackLayout row='0'>
                        <Image :src='response.image'></Image>
                        <Label :text='response.temp' class='temp current'></Label>
                        <Label :text='response.name' class='location'></Label>
                    </StackLayout>

                    <FlexboxLayout
                        row='1'
                        alignItems='flex-end'
                        justifyContent='space-around'
                        class='temperature-container'>
                        <Label :text='"min " + response.min' class='temp min'></Label>
                        <Label :text='"max " + response.max' class='temp max'></Label>
                    </FlexboxLayout>
                </GridLayout>
            </StackLayout>
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
                        appSettings.setString('city', localCities + ' ' + this.city)
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
    font-family: 'Quicksand';
    text-align: center;
    font-weight: 300;
}

.temperature-container {
    height: 80;
}

.temp.current {
    font-family: 'Lato';
    font-size: 45;
    font-weight: 400;
}

.temp.min,
.temp.max {
    font-size: 20;
    font-family: 'Quicksand';
}

.location {
    font-size: 20;
    font-weight: 300;
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
}

.close-btn {
    height: 30;
    width: 30;
}

.city-btn {
    font-family: 'Lato';
    color: black;
    font-weight: bold;
}

.remove-btn {
    border-radius: 0;
    background-color: transparent;
    margin: 0 0 0 6;
    padding: 0;
}
</style>