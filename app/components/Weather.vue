<template>
    <Page actionBarHidden='true'
        enableSwipeBackNavigation='false'
        backgroundSpanUnderStatusBar='true'
        @swipe='onSwipe'>
        <GridLayout
            rows='50, 20, *'
            columns='*, 50'
            class='view-container'>
            <StackLayout row='0'>
                <Button
                    text='search'
                    @tap='toSearch'>
                    </Button>
                <Button
                    text='save city'
                    @tap='saveCity'></Button>
            </StackLayout>

            <ScrollView row='1' orientation='horizontal'>
                <StackLayout orientation='horizontal'>
                    <template v-for='(item, index) in savedCities'>
                        <Button
                            :key='index'
                            :text='item'
                            @tap='toWeather(item)'></Button>
                    </template>
                </StackLayout>
            </ScrollView>

            <StackLayout
                row='2'
                colSpan='2'>
                <GridLayout 
                    rows='*, 80' verticalAlignment='center'>
                    <StackLayout row='0'>
                        <Image :src='response.image'></Image>
                        <Label :text='response.temp' class='temp current'></Label>
                        <Label ref='city' :text='response.name' class='location'></Label>
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
    var SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection
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
                savedCities: []
            }
        },
        created() {
            this.savedCities = this.getSavedCities()
        },
        methods: {
            toSearch() {
                this.$navigateTo(Search)
            },
            saveCity() {
                const localCities = appSettings.getString('city')
                const city = this.$refs.city.nativeView.text

                if (localCities) {
                    let list = localCities.split(' ');

                    if (!list.includes(city)) {
                        appSettings.setString('city', localCities + ' ' + city)
                        this.savedCities.push(city)
                    }
                } else {
                    appSettings.setString('city', city)
                }
        
            },
            toWeather(city) {
                let url = 'https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431&units=metric&q=' + city

                this.aMethod(url)
            },
            onSwipe(args) {
                let direction =
                args.direction == SwipeDirection.down
                    ? "down"
                    : args.direction == SwipeDirection.up
                        ? "up"
                        : args.direction == SwipeDirection.left
                            ? "left"
                            : "right";
                
                console.log('SWIPE DIRECTION ', direction)
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
    margin: 20;
}

Label {
    font-family: 'Quicksand';
    text-align: center;
    font-weight: 300;
}

.temperature-container {
    height: 60;
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
    margin: 30 20;
    text-transform: uppercase;
}

Image {
    height: 250;
    width: 250;
}
</style>