import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return () => {
      return (
        <a-layout-content style={{
          background: "#fff",
          padding: "24px",
          margin: 0,
          minHeight: "280px"
        }}>
          <router-view></router-view>
        </a-layout-content>
      )
    }
  }
})