import { createApp } from "vue";
import "@/styles/index.scss";
import App from "./App";
import antdIcons from "@/plugins/antd-icons";
import Nfeng from "./components";

const app = createApp(App);

app.use(Nfeng);
app.use(antdIcons);
app.mount("#app");
