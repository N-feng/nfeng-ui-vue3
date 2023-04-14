import { createApp } from 'vue'
import "@/styles/index.scss";
import App from './App'
import router from "./router";
import Nfeng from "../../src/index";

const app = createApp(App)

app.use(router);
app.use(Nfeng);
app.mount('#app');
