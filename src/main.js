import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js'; 
import { createVuetify } from 'vuetify';
import store from './store/index.js';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Optional for icons if want to use it

const vuetify = createVuetify();

const app = createApp(App);
app.use(store)  // registering the store 
app.use(router); // Add the router
app.use(vuetify); // Add Vuetify
app.mount('#app');
