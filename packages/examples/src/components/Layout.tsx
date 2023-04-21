import { defineComponent } from "vue";
import ContentLayout from "./layouts/ContentLayout";
// import HeaderLayout from "./layouts/HeaderLayout";

export default defineComponent({
  setup() {
    return () => {
      return (
        <a-layout>
          <a-layout>
            <header-layout></header-layout>
            {/* <HeaderLayout /> */}
            <a-layout>
              <ContentLayout />
            </a-layout>
          </a-layout>
        </a-layout>
      )
    }
  }
})