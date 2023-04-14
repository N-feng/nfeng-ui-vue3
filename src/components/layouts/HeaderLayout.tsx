import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderLayout",
  setup() {
    return () => {
      return (
        <a-layout-header>
          <div class={"logo"}></div>
          <row justify="space-between"></row>
        </a-layout-header>
        
      )
    }
  }
})