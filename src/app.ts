import 'normalize.css';

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './component/App.vue';

import PageSong from './page/PageSong.vue';
import PageSongs from './page/PageSongs.vue';

Vue.use(VueRouter);

let routes = [
    { path: '/', redirect: '/songs' },
    { path: '/songs', component: PageSongs },
    { path: '/song/:song', component: PageSong, props: true }
];
let router = new VueRouter({ routes });

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
