import './style/normalize.css';
import './style/global.scss';

import Vue from 'vue';

import App from './component/App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});
