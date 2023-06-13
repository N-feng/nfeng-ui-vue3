import { PropType } from "vue";
import { Column } from "../../../antd/form/types";
import { getComponent, getPlaceholder } from "../../../../src/core/dataformat";
import { useProps, defineProps } from "../../../core/common/props";
import { useEvent } from "../../../core/common/event";

export default defineComponent({
  props: {
    ...defineProps(),
  },
  setup(props) {
    const { column, dic } = props;
    const { textRef } = useEvent(props);

    return () => {
      const componentProps = {
        ...Object.assign({}, column),
        placeholder: getPlaceholder(column),
        dic: dic,
        value: textRef.value,
        onChange: (val: any) => {
          props.onChange?.(val);
        },
      };
      const Component = resolveComponent(
        getComponent(column?.type as string, column?.component)
      ) as string;
      return <>{h(Component, { ...componentProps })}</>;
    };
  },
});
