import { defineComponent } from "vue";
import { CommonWidgetDefine, CommonWidgetPropsDefine } from "../schema-form/types";

import { withFormItem } from "./FormItem";

const TextWidget = withFormItem(
  defineComponent({
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
  })
);

export default TextWidget;
