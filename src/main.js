import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import VueCookies from 'vue-cookies';
import App from "./App.vue";
import axios from 'axios';
import router from "./router";
// import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const pinia = createPinia();
const app = createApp(App);

pinia.use(({ store }) => {
    store.$cookies = markRaw(VueCookies)
})

app.use(VueCookies);
app.use(pinia);
app.use(router, axios);

app.mount("#app");
