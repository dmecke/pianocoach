import Vue from "vue";
import VueRouter from 'vue-router';

import PageSong from './page/PageSong.vue';
import PageSongs from './page/PageSongs.vue';

Vue.use(VueRouter);

let routes = [
    { path: '/', redirect: '/songs' },
    { path: '/songs', component: PageSongs, name: 'songs' },
    { path: '/song/:song', component: PageSong, name: 'song', props: true }
];

export default new VueRouter({ routes });
