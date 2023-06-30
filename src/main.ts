import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import "@/assets/css/index.css";
import "ant-design-vue/dist/antd.css";

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
})

app.mount('#app');
