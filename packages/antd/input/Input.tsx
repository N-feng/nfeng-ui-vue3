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
  emits: ["onOk"],
  setup(props, { attrs }) {
    const { textRef } = useEvent(props);

    return () => {
      return (
        <>
          <a-input v-model:value={textRef.value} />
        </>
      );
    };
  },
});