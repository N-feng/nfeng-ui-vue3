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
    const compProps = computed(() => {
      return {
        value: textRef.value,
        ...Object.assign({}, column),
        dic: dic,
        placeholder: getPlaceholder(column),
        props: column?.props || props.props,
        onChange: (val: any) => {
          props.onChange?.(val);
        },
      };
    });

    return () => {
      const Component = resolveComponent(
        getComponent(column?.type as string, column?.component)
      ) as string;
      return <>{h(Component, { ...compProps.value })}</>;
    };
  },
});
