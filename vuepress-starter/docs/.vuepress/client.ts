import { defineClientConfig } from "@vuepress/client";
import { provide, ref } from "vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Nfeng from "../../../src/index";

import CustomLayout from "./layouts/Layout.vue";
import NotFound from "./layouts/NotFound.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to) => {
      console.log("before navigation");
    });

    router.afterEach((to) => {
      console.log("after navigation");
    });

    app.use(Antd);
    app.use(Nfeng);
  },
  setup() {
    const count = ref(0);
    provide("count", count);
  },
  layouts: {
    CustomLayout,
    NotFound,
  },
  rootComponents: [],
});
