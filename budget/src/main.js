// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { App } from './app';
import router from './router';
import store from './store';


// Import App Custom Styles
//import AppStyles from './css/app.css';



import 'bulma/css/bulma.css';
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});