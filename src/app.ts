import 'normalize.css';

import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './component/App.vue';

import 'vuetify/dist/vuetify.css';
import './style/global.scss';

import router from './router';

Vue.use(Vuetify, {
    theme: {
        primary: '#3F51B5',
        secondary: '#4CAF50',
        accent: '#303f9f ',
        error: '#F44336',
        info: '#3F51B5',
        success: '#4CAF50',
        warning: '#FFC107'
    }
});

window.bus = new Vue();

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

window.navigator.requestMIDIAccess()
    .then(access => {
        let inputs = access.inputs.values();
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = function(message) {
                let noteCode = message.data[1];
                let velocity = message.data[2];
                let type = message.data[0];

                if (type === 144 && velocity > 0) {
                    // key pressed
                    window.bus.$emit('key_pressed', codeToNote(noteCode));
                }
                if (type === 128 || velocity === 0) {
                    // key released
                }
            }
        }
    });


function codeToNote(code) {
    return code - 12;
}
