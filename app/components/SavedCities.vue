<template>
    <ScrollView orientation='horizontal'>
        <StackLayout orientation='horizontal'>
            <StackLayout orientation='horizontal' verticalAlignment='middle' class='city-item' v-if='cityInSaved'>
                <Label
                    android:class='city-btn andro'
                    ios:class='city-btn ios'
                    :text='city.split("+").join(" ")'
                    ></Label>
                <StackLayout
                    verticalAlignment='middle'
                    @tap='saveCity'>
                    <Label class='fa' :text="'fa-check' | fonticon"></Label>
                </StackLayout>
            </StackLayout>
            <template v-for='(item, index) in savedCities'>
                <StackLayout orientation='horizontal' verticalAlignment='middle' class='city-item' :key='index'>
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
            </template>
        </StackLayout>
    </ScrollView>
</template>

<script>
const appSettings = require("tns-core-modules/application-settings")
import Weather from './Weather'
import { mixin } from '../mixins'
import { baseUrl } from '../url'

export default {
    props: {
        city: String
    },
    components: {
        Weather
    },
    data() {
        return {
            savedCities: [],
            cityInSaved: false
        }
    },
    mixins: [mixin],
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
        toWeather(city) {
            let url = baseUrl + '&units=metric' + '&q=' + city

            this.getData(url)
        }
    }
}
</script>

<style scoped>
.city-item {
    padding: 0;
    margin: 0 12;
    border-width: 1;
    border-radius: 50%;
    padding: 0 12 0 7;
}

.remove-btn {
    border-radius: 0;
    padding: 0;
}

.btn {
    color: white;
    min-height: 32;
    min-width: 64;
    padding: 7;
    font-size: 14;
    margin: 0;
}

.city-btn {
    color: black;
    background-color: white;
    text-transform: capitalize;
    margin: 8;
    padding: 0 10 0 0;
    font-size: 14;
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