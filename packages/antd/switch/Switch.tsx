import { getPrefix, isBasicType } from "../../../src/_utils/common";
import { defineProps } from "../../core/common/props";
import { useEvent, getLabelText } from "../../core/common/event";

const { prefixName } = getPrefix("Switch");

const Switch = defineComponent({
  name: prefixName,
  props: {
    ...defineProps(),
  },
  setup(props, { attrs, emit }) {
    const { text, handleFocus, handleBlur } = useEvent(props, emit);
    return () => {
      return <a-switch v-model:checked={text.value}></a-switch>;
    };
  },
});

export default Switch;
