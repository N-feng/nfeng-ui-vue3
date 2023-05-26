import { defineComponent } from "vue";

import routes from "@/router/routes";

export default defineComponent({
  setup() {
    return () => {
      return (
        <a-layout class={"h-100vh"}>
          <header-layout />
          <a-layout>
            <sider-layout systemMenus={routes} />
            <content-layout />
          </a-layout>
        </a-layout>
      );
    };
  },
});
