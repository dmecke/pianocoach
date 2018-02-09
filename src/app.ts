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
