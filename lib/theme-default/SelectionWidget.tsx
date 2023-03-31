import { defineComponent } from "vue";
import { SelectionWidgetPropsDefine } from "../types";

export default defineComponent({
  name: "SelectionWidget",
  props: SelectionWidgetPropsDefine,
  setup() {
    return () => {
      return <div>SelectionWidget</div>
    }
  }
})