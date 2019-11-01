<template>
    <Page actionBarHidden='true'>
        <GridLayout rows='50, *' class='view-container'>
            <Button
                row='0'
                text='seach'
                @tap='toSearch'></Button>
            <Fetch :url="url" row='1'>
                <GridLayout 
                    slot-scope="{ name, temp, min, max, description, image }"
                    rows='*, 80' verticalAlignment='center'>
                    <StackLayout row='0'>
                        <!-- <Label :text='description'></Label> -->
                        <Image :src='image'></Image>
                        <Label :text='temp' class='temp current'></Label>
                        <Label :text='name' class='location'></Label>
                    </StackLayout>

                    <FlexboxLayout
                        row='1'
                        alignItems='flex-end'
                        justifyContent='space-around'
                        class='temperature-container'>
                        <Label :text='"min " + min' class='temp min'></Label>
                        <Label :text='"max " + max' class='temp max'></Label>
                    </FlexboxLayout>
                </GridLayout>
            </Fetch>
        </GridLayout>
    </Page>
</template>

<script>
    import Fetch from './Fetch'
    import Search from './Search'

    export default {
        name: 'Weather',
        components: {
            Fetch,
            Search
        },
        props: {
            url: String,
        },
        methods: {
            toSearch() {
                console.log('to search'),

                this.$navigateTo(Search)
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

.temp.currents {
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