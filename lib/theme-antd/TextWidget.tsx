import { defineComponent } from "vue";
import { CommonWidgetPropsDefine } from "../types";

export default defineComponent({
  name: "TextWidget",
  props: CommonWidgetPropsDefine,
  setup(props) {
    return () => {
      const { placeholder } = props;
      return (
        <a-input type="text" value={props.value} placeholder={placeholder} />
      );
    };
  },
});
