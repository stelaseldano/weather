import Vue from 'nativescript-vue'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import Main from './components/Main'

TNSFontIcon.paths = {
    'fa': 'fonts/font-awesome.css',
}

TNSFontIcon.loadCss()
Vue.filter('fonticon', fonticon)

new Vue({
    template: `
        <Frame>
            <Main />
        </Frame>`,
    components: {
        Main
    }
}).$start()
