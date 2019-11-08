<template>
    <Page actionBarHidden='true'
        enableSwipeBackNavigation='false'
        backgroundSpanUnderStatusBar='true'>
        <GridLayout
            rows='50, *, 50'
            class='view-container'>

            <SavedCities row='0' :city='city' />

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

            <FlexboxLayout
                row='2'
                justifyContent='space-between'
                margin='0 20'>
                <StackLayout>
                    <Label
                        class='fa'
                        :text="'fa-search' | fonticon"
                        @tap='toSearch'></Label>
                </StackLayout>
            </FlexboxLayout>
        </GridLayout>
    </Page>
</template>

<script>
    const appSettings = require("tns-core-modules/application-settings")
    import Search from './Search'
    import SavedCities from './SavedCities'

    export default {
        name: 'Weather',
        components: {
            Search,
            SavedCities
        },
        props: {
            response: Object,
            city: ''
        },
        created() {
            this.city = this.response.name.split(' ').join('+')
        },
        methods: {
            toSearch() {
                this.$navigateTo(Search, {
                    transition: {
                        name: 'fade'
                    }
                })
            },
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
    font-size: 40;
}

.temp.current.andro {
    font-family: 'Lato-Regular'
}

.temp.current.ios {
    font-family: 'Lato';
    font-weight: 400;
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
</style>