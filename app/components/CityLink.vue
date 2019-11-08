<template>
    <StackLayout orientation='horizontal' verticalAlignment='middle' class='city-item' :key='index'>
        <Label
            android:class='city-btn andro'
            ios:class='city-btn ios'
            :text='item.split("+").join(" ")'
            ></Label>
        <StackLayout
            verticalAlignment='middle'
            class='remove-btn'
            @tap='action'>
            <Label class='fa' :text="'fa-close' | fonticon"></Label>
        </StackLayout>
    </StackLayout>
</template>

<script>
export default {
    props: {
        action: Function,
        item: String
    }
}
</script>