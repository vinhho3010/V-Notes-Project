import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import router from './router'
import store from './stores'

import './assets/main.css'
import './style.css'

const app = createApp(App);

app.use(store)
app.use(router)

app.mount('#app')
