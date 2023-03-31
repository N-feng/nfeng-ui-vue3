import { defineComponent } from "vue";
import { SelectionWidgetPropsDefine } from "../types";

export default defineComponent({
  name: "SelectionWidget",
  props: SelectionWidgetPropsDefine,
  setup(props) {
    return () => {
      const { options, placeholder } = props
      return (
        <a-select options={options} placeholder={placeholder} />
      )
    }
  }
})