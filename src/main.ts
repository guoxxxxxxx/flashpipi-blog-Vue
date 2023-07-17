import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
import App from './App.vue';
import router from './router';
import "@/assets/css/index.css";
import "ant-design-vue/dist/antd.css";
import 'animate.css';
import 'nprogress/nprogress.css';

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount('#app');
