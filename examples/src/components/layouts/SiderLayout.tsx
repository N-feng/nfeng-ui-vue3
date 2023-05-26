import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <a-layout-sider width={200} style={{ backgroud: "#fff" }}></a-layout-sider>
      )
    }
  }
})