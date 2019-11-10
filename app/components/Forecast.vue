<template>
    <Page
        actionBarHidden='true'
        enableSwipeBackNavigation='false'
        backgroundSpanUnderStatusBar='true'>

        <GridLayout
            rows='50, *, 50'
            class='view'>

            <SavedCities row='0' :city='city' />

            <StackLayout
                verticalAlignment='middle'
                row='1'>

                    <Image
                        :src='response.image'
                        class='image'></Image>

                    <Label
                        :text='response.temp'
                        android:class='temp--current temp--current--andro' ios:class='temp--current temp--current--ios'></Label>

                    <Label
                        :text='response.name'
                        android:class='location location--andro' ios:class='location location--ios'></Label>

                    <FlexboxLayout
                        row='1'
                        alignItems='flex-end'
                        justifyContent='space-around'
                        class='temperature-container'>

                        <Label
                            :text='"min " + response.min'
                            android:class='temp temp--andro' ios:class='temp temp--ios'></Label>
                        <Label
                            :text='"max " + response.max'
                            android:class='temp temp--andro' ios:class='temp temp--ios'></Label>
                    </FlexboxLayout>
            </StackLayout>

            <StackLayout
                row='2'
                horizontalAlignment='right'>

                <FlexboxLayout
                    class='search'
                    justifyContent='center'
                    alignItems='center'
                    @tap='toSearch'>

                    <Label
                        :text='"fa-search" | fonticon'
                        class='fa search__icon'></Label>
                </FlexboxLayout>
            </StackLayout>
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

.view {
    margin: 10 0;
}

Label {
    color: black;
    font-family: 'Quicksand';
    font-weight: 400;
    text-align: center;
}

.fa {
   font-family: "FontAwesome", "fontawesome-webfont";
}

.temperature-container {
    margin: 10 0;
}

.temp--current {
    font-size: 40;
}

.temp--current--andro {
    font-family: 'Lato-Regular'
}

.temp--current--ios {
    font-family: 'Lato';
    font-weight: 400;
}

.temp {
    font-size: 20;
}

.temp--ios {
    font-family: 'Quicksand'
}

.temp--andro {
    font-family: 'Quicksand-Regular'
}

.location {
    font-size: 20;
    margin: 20 0;
    text-transform: uppercase;
}

.location--andro {
    font-family: 'Quicksand-Regular';
}

.location--ios {
    font-family: 'Quicksand';
}

.image {
    height: 250;
    width: 250;
}

.search {
    color: #6bc5da;
    height: 60;
    margin: 0 10 0 0;
    width: 60;
}

.search__icon {
    font-size: 18;
    color: #6bc5da;
}
</style>