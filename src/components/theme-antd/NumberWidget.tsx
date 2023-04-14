import { defineComponent } from "vue";
import { CommonWidgetPropsDefine } from "../schema-form/types";

export default defineComponent({
  name: "NumberWidget",
  props: CommonWidgetPropsDefine,
  setup(props) {
    return () => {
      const { placeholder } = props;
      return <a-input-number placeholder={placeholder} />
    }
  }
})