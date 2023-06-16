import { getPrefix } from "../../../src/_utils/common";
import { useProps, defineProps } from "../../core/common/props";
import { useEvent } from "../../core/common/event";

const { prefixName } = getPrefix("Input");

export default defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...defineProps(),
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    const { textRef } = useEvent(props, emit);

    return () => {
      return (
        <>
          <a-input v-model:value={textRef.value} />
        </>
      );
    };
  },
});