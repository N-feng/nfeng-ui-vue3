import { defineComponent } from "vue";
import Row from "../row/Row";

export default defineComponent({
  name: "HeaderSystemMenu",
  setup() {
    return () => {
      return (
        <a-menu
          mode={"horizontal"}
          v-slots={{
            overflowedIndicator: () => (
              <Row class={"c-fff"}>
                更多
                <down-outlined style={{ fontSize: "16px" }} />
              </Row>
            ),
          }}
        >
          <a-menu-item key="/component">组件</a-menu-item>
          <a-menu-item key="/template">项目模版</a-menu-item>
          {/* <a-menu-item v-for="menu in systemMenus" :key="menu.baseUrl">
      {{ menu.name }}
    </a-menu-item> */}
        </a-menu>
      );
    };
  },
});
