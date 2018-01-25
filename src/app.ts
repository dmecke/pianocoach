import 'normalize.css';

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

import App from './component/App.vue';

import PageSong from './page/PageSong.vue';
import PageSongs from './page/PageSongs.vue';

import 'vuetify/dist/vuetify.css';
import './style/global.scss';

Vue.use(VueRouter);
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

let routes = [
    { path: '/', redirect: '/songs' },
    { path: '/songs', component: PageSongs, name: 'songs' },
    { path: '/song/:song', component: PageSong, name: 'song', props: true }
];
let router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
