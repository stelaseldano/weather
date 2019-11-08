import Vue from "nativescript-vue";
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import Start from "./components/Start";

TNSFontIcon.paths = {
    'fa': 'fonts/font-awesome.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);


new Vue({

    template: `
        <Frame>
            <Start />
        </Frame>`,

    components: {
        Start
    }
}).$start();
