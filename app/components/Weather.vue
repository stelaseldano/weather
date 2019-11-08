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
                    <Label
                        class='fa'
                        v-if='showSaveButton'
                        :text='"fa-check" | fonticon'
                        @tap='saveCity'></Label>
                </StackLayout>
                <StackLayout>
                    <Label
                        class='fa'
                        :text="'fa-search' | fonticon"
                        @tap='toSearch'></Label>
                </StackLayout>
            </FlexboxLayout>

            <StackLayout
                verticalAlignment='middle'
                row='1'>
                    <Image :src='response.image'></Image>
                    <Label :text='response.temp' android:class='temp current andro' ios:class='temp current ios'></Label>
                    <Label :text='response.name' android:class='location andro' ios:class='location ios'></Label>
                    <FlexboxLayout
                        row='1'
                        alignItems='flex-end'
                        justifyContent='space-around'
                        class='temperature-container'>
                        <Label :text='"min " + response.min' android:class='temp min andro' ios:class='temp min ios'></Label>
                        <Label :text='"max " + response.max' android:class='temp max andro' ios:class='temp max ios'></Label>
                    </FlexboxLayout>
            </StackLayout>

            <ScrollView row='0' orientation='horizontal'  v-if='savedCities.length > 0'>
                <StackLayout orientation='horizontal'>
                    <template v-for='(item, index) in savedCities'>
                        <StackLayout orientation='horizontal' verticalAlignment='middle' class='city-item' :key='index'>
                            <StackLayout orientation='horizontal' verticalAlignment='middle'>
                                <Label
                                    android:class='city-btn andro'
                                    ios:class='city-btn ios'
                                    :text='item.split("+").join(" ")'
                                    @tap='toWeather(item)'
                                    ></Label>
                                <StackLayout
                                    verticalAlignment='middle'
                                    class='remove-btn'
                                    @tap='removeCity(item, index)'>
                                    <Label class='fa' :text="'fa-close' | fonticon"></Label>
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
    import { baseUrl } from '../url'

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
                let url = baseUrl + '&units=metric' + '&q=' + city

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
    color: black;
}

.fa {
   font-family: "FontAwesome", "fontawesome-webfont";
}

.temperature-container {
    margin: 10 0;
}

.temp.current {
    font-size: 45;
}

.temp.current.andro {
    font-family: 'Lato-Regular'
}

.temp.current.ios {
    font-family: 'Lato';
}

.temp {
    font-size: 20;
}

.temp.ios {
    font-family: 'Quicksand'
}

.temp.andro {
    font-family: 'Quicksand-Regular'
}

.location {
    font-size: 20;
    text-transform: uppercase;
    margin: 20 0;
}

.location.andro {
    font-family: 'Quicksand-Regular';
}

.location.ios {
    font-family: 'Quicksand';
}

Image {
    height: 250;
    width: 250;
}

.city-item {
    padding: 0;
    margin: 0 12;
    border-width: 1;
    border-radius: 50%;
    padding: 0 15 0 10;
}

.remove-btn {
    border-radius: 0;
    padding: 0;
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
    color: black;
    background-color: white;
    text-transform: capitalize;
    margin: 8;
    padding: 0 10 0 0;
    font-size: 15;
    border-color: transparent;
    border-width: 1;
}

.city-btn.andro {
    font-family: 'Lato-Bold';
}

.city-btn.ios {
    font-family: 'Lato';
    font-weight: bold;
}
</style>