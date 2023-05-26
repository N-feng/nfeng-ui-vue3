import { defineComponent } from "vue";
import ContentLayout from "./layouts/ContentLayout";
// import HeaderLayout from "./layouts/HeaderLayout";

import routes from "@/router/routes";

export default defineComponent({
  setup() {
    return () => {
      return (
        <a-layout class={"h-100vh"}>
          <header-layout />
          {/* <HeaderLayout /> */}
          <a-layout>
            <sider-layout systemMenus={routes} />
            <ContentLayout />
          </a-layout>
        </a-layout>
      );
    };
  },
});
