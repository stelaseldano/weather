<template>
    <Page actionBarHidden="true">
        <GridLayout rows='auto,auto'>
            <StackLayout row='0'>
                <TextField v-model="city" hint="Enter city" />
                <Label :text='permission'></Label>
            </StackLayout>

            <StackLayout row='1'>
                <Button text='Enable Location' @tap='showLocationPermission'></Button>
            </StackLayout>

        </GridLayout>
    </Page>
</template>

<script>
const Geolocation = require("nativescript-geolocation")
import Home from './Home'

export default {
    components: {
        Home
    },
    data() {
        return {
            hasPermission: false
        }
    },
    created() {
        Geolocation.isEnabled()
            .then(result => {
                console.log(result)
                // this.hasPermission = result
            })
            .catch(err => {
                console.error(err)
            })
    },
    watch: {
        hasPermission(newVal) {
            if (newVal) {
                this.$navigateTo(Home)
            }
        }
    },
    methods: {
        showLocationPermission() {
            Geolocation.enableLocationRequest()
                .then(() => {
                    this.hasPermission = true
                })
                .catch((err) => {
                    console.error(err)
                })
        },
    }
}
</script>

<style scoped>
Page {
    margin: 50;
}
</style>