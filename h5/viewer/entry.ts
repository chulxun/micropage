import { createApp } from 'vue'
import App from './app.vue'
import { store, key } from '@/store/index'
import axios from "axios";
const app = createApp(App)
if (store.state.user.userInfo.token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.userInfo.token;
}
app.use(store, key).mount('#app')