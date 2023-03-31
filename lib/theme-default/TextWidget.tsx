import { defineComponent } from "vue";
import { CommonWidgetPropsDefine } from "../types";

export default defineComponent({
  name: "TextWidget",
  props: CommonWidgetPropsDefine,
  setup(props) {
    return () => {
      return <input type="text" />
    }
  }
})