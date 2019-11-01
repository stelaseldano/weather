import Vue from "nativescript-vue";

import Start from "./components/Start";

new Vue({

    template: `
        <Frame>
            <Start />
        </Frame>`,

    components: {
        Start
    }
}).$start();
