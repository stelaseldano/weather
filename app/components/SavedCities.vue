<template>
    <ScrollView orientation='horizontal'>
        <StackLayout orientation='horizontal'>

            <StackLayout
                v-if='cityInSaved'
                orientation='horizontal'
                verticalAlignment='middle'
                class='city-item current'>

                <Label
                    :text='city.split("+").join(" ")'
                    android:class='city-link andro' ios:class='city-link ios'></Label>

                <StackLayout
                    verticalAlignment='middle'
                    @tap='saveCity'>

                    <Label
                        :text='"fa-check" | fonticon'
                        class='fa fa-icon'></Label>
                </StackLayout>
            </StackLayout>

            <template v-for='(item, index) in savedCities'>
                <StackLayout
                    :key='index'
                    orientation='horizontal'
                    verticalAlignment='middle'
                    class='city-item'>

                    <Label
                        :text='item.split("+").join(" ")'
                        android:class='city-link andro' ios:class='city-link ios'
                        @tap='toForecast(item)'></Label>

                    <StackLayout
                        verticalAlignment='middle'
                        class='remove-btn'
                        @tap='removeCity(item, index)'>
                        <Label
                            :text='"fa-close" | fonticon'
                            class='fa fa-icon'></Label>
                    </StackLayout>
                </StackLayout>
            </template>
        </StackLayout>
    </ScrollView>
</template>

<script>
const appSettings = require("tns-core-modules/application-settings")
import Forecast from './Forecast'
import { fetch } from '../fetch'
import { baseUrl } from '../url'

export default {
    props: {
        city: String
    },
    components: {
        Forecast
    },
    data() {
        return {
            savedCities: [],
            cityInSaved: false
        }
    },
    mixins: [fetch],
    created() {
        this.savedCities = this.getSavedCities()

        if (this.savedCities.includes(this.city)) {
            this.cityInSaved = false
        } else {
            this.cityInSaved = true
        }
    },
    watch: {
        savedCities(newState) {
            if (newState.includes(this.city)) {
                this.cityInSaved = false
            } else {
                this.cityInSaved = true
            }
        }
    },
    methods: {
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
        getSavedCities() {
            const localCities = appSettings.getString('city')

            if (localCities) {
                return localCities.split(' ')
            }

            return []
        },
        toForecast(city) {
            let url = baseUrl + '&units=metric' + '&q=' + city

            this.getData(url)
        }
    }
}
</script>

<style scoped>
.city-item {
    border-color: black;
    border-width: 1;
    border-radius: 50%;
    margin: 0 10;
    padding: 0 7;
}

.city-item.current {
    border-color: white;
    border-width: 1;
}

.city-link {
    background-color: transparent;
    border-color: transparent;
    border-width: 1;
    color: black;
    font-size: 14;
    margin: 8;
    padding: 0;
    text-transform: capitalize;
}

.city-link.andro {
    font-family: 'Lato-Bold';
}

.city-link.ios {
    font-family: 'Lato';
    font-weight: bold;
}

.fa-icon {
    border-radius: 0;
    color: black;
    font-size: 13;
    margin: 0 0 0 3;
    padding: 6;
}
</style>