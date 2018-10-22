import Vue from "vue";
import VueRouter from 'vue-router';

import PageSong from './page/PageSong.vue';
import Dashboard from './page/Dashboard.vue';

Vue.use(VueRouter);

let routes = [
    { path: '/', component: Dashboard, name: 'songs' },
    { path: '/song/:song', component: PageSong, name: 'song', props: true }
];

export default new VueRouter({ routes });
