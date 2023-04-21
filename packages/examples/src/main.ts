import { createApp } from 'vue'
// import "@/styles/index.scss";
import App from './App'
import router from "./router";
import antdIcons from "@/plugins/antd-icons";
import Nfeng from "nfeng-vue3-components";

const app = createApp(App)

app.use(router);
app.use(antdIcons);
app.use(Nfeng);
app.mount('#app');
