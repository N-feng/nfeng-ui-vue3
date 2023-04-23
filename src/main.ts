import { createApp } from "vue";
// import "@/styles/index.scss";
import App from "./App";
import antdIcons from "@/plugins/antd-icons";
import Nfeng from "./index";

const app = createApp(App);

app.use(antdIcons);
app.use(Nfeng);
app.mount("#app");
