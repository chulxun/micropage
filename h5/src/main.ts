import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store, key } from './store/index'
import axios from "axios";

const app = createApp(App)
if (store.state.user.userInfo.token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.userInfo.token;
}

app.use(router).use(store, key).mount('#app')
