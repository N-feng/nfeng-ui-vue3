import { getPrefix, isBasicType } from "../../../src/_utils/common";
import { defineProps, useProps } from "../../core/common/props";
import { useEvent, getLabelText } from "../../core/common/event";

const { prefixName } = getPrefix("Radio");

export default defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    ...defineProps(),
  },
  setup(props, { emit }) {
    const { componentName, labelKey, valueKey } = useProps(props, "radio");
    const { text, handleFocus, handleBlur } = useEvent(props, emit);
    return () => {
      const Component = resolveComponent(componentName.value) as string;
      return (
        <a-radio-group v-model:value={text.value}>
          {props.dic.map((item: any, index: number) => {
            return h(
              Component,
              {
                value: item[valueKey.value],
                key: index,
              },
              {
                default: () => item[labelKey.value],
              }
            );
          })}
        </a-radio-group>
      );
    };
  },
});
