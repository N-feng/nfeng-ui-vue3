import { createApp } from "vue";
import Antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'
import App from "./App";
import router from "./router";
import "vite-plugin-vuedoc/style.css";
import antdIcons from "@/plugins/antd-icons";
import Nfeng from "../../src";

const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(antdIcons);
app.use(Nfeng);
app.mount("#app");
