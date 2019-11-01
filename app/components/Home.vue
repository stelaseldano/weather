<template>
    <Page class="Page" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <GridLayout
            v-if='hasLocPermission'
            rows="auto,auto">

            <StackLayout row="0">
                <Label class="bold" :text="city"></Label>
                <Label :text="summary"></Label>
                
                <StackLayout class='image'>
                    <Image class="weather-image" :src="image" />
                </StackLayout>

                <GridLayout class="weather-box" columns="1*,1*" rows="auto">
                    <Label col="0" row="0" class="large" :text="currentTemperature"></Label>
                    <StackLayout col="1" row="0">
                        <Label class="small bold" text="details"></Label>
                        <StackLayout class="hr-light tight"></StackLayout>
                        <Label class="small" :text="humidity"></Label>
                        <Label class="small" :text="windSpeed"></Label>
                        <Label class="small" :text="visibility"></Label>
                    </StackLayout>
                </GridLayout>
            
            </StackLayout>
            
            <StackLayout row="1">
                <Label :text="day"></Label>
                <Label :text="time"></Label>
            </StackLayout>
        </GridLayout>

        <GridLayout
            rows="auto,auto"
            v-else>

            <StackLayout row='0'>
                <TextField v-model="city" hint="Enter city..."></TextField>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
const Geolocation = require("nativescript-geolocation");
const Accuracy = require("tns-core-modules/ui/enums");

export default {
    data () {
        return {
            image: "",
            city: "",
            windSpeed: "",
            summary: "",
            visibility: "",
            humidity: "",
            currentTemperature: "",
            hasLocPermission: false,
        };
    },
    created() {
        this.getMyWeather()
        let {day, time} = this.getDate()
        this.day = day;
        this.time = time;
    },
    methods: {
        getMyWeather() {
            Geolocation.enableLocationRequest()
            
            Geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, updateDistance: 0.1, timeout: 20000 })
                .then(loc => {
                    this.hasLocPermission = true;
                    if (loc) {
                        var appId = "23d7e462a71259d53863dd33e91b5431";
                        var url = "https://api.openweathermap.org/data/2.5/weather?APPID=23d7e462a71259d53863dd33e91b5431" + "&units=metric&lat=" + loc.latitude + "&lon=" + loc.longitude;

                        fetch(url)
                            .then((response) => {
                                return response.json()
                            })
                            .then((response) => {
                                return this.parseResponse(response)
                            })
                            .catch(err => console.error(err))
                    }
                },
                    function(e) { 

                    }
                )
        },
        parseResponse(response) {
            this.city = response.name;
            this.summary = response.weather[0].main;
            this.icon = response.weather[0].description;
            this.setImage(this.icon);
            var weatherObj = JSON.stringify(response.main);
            var weather = JSON.parse(weatherObj);
            this.currentTemperature = Math.round(weather.temp).toString() + "°";
            this.humidity = "humidity: " + weather.humidity.toString() + "%";
            var windObj = JSON.stringify(response.wind);
            var wind = JSON.parse(windObj);
            this.windSpeed = "wind: " + wind.speed.toString() + " mph";
            var visibilityObj = Math.round(JSON.stringify(response.visibility)/1609.344);
            this.visibility = "visibility: " + visibilityObj.toString() + " m";
        },
        setImage(icon) { 
            // if (icon.includes('rain') || icon.includes('thunderstorm') || icon.includes('drizzle')) {
            //     this.image = "~/images/cloud.png"
            // } else if (icon.includes('clouds')) {
            //     this.image = "~/images/cloud.png"
            // } else if (icon.includes('snow') || icon.includes('sleet') || icon.includes('mist') || icon.includes('drizzle') || icon.includes('haze')) {
            //     this.image = "~/images/suncloud.png"
            // } else if (icon.includes('clear')) {
            //     this.image = "~/images/sun.png"
            // } else {
            //     this.image = "~/images/sun.png"
            // }

            this.image = '~/images/rain.png';
        },
        getDate() {
            const currentDate = new Date()
            const weekdays = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ]
            const currentDay = weekdays[currentDate.getDay()]
            const timeOfDay = (currentDate.getHours() >= 12 ) ? "Afternoon" : "Morning"

            return {
                day: currentDay,
                time: timeOfDay
            }
        }
    },
}
</script>

<style scoped>
Page {
    /* margin: 30; */
}

label {
    margin: 10 0;
    font-family: "Quicksand";
    font-size: 20;
    text-transform: uppercase; 
    text-align: center;
    color: black;
}

.hr-light {
    margin: 30 0;
}

.bold {
    font-weight: bold;
}

.image {
    margin: 10 40;
}

.weather-box {
    margin-top: 10;
}

.large {
    font-size: 60;
    vertical-align: top;
}

.small {
    font-size: 15;
    margin: 0;
    text-align: left;
}

.tight {
    margin: 5
}
</style>