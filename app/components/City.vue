<template>
    <Page>
        <StackLayout>
            <Label :text='d.name'></Label>
            <Label :text='d.sys.country'></Label>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    name: 'City',
    created() {
        console.log('CITYYYY')
        console.log(this.d["name"])
        console.log(this.d.sys.country)
    },
    props: {
        d: Object
    }
}
</script>