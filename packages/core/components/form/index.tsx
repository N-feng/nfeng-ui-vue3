import { PropType } from "vue";
import { Column } from "../../../antd/form/types";
import { getComponent, getPlaceholder } from "../../../../src/core/dataformat";

export default defineComponent({
  props: {
    dic: {
      type: Array,
    },
    column: {
      type: Object as PropType<Column>,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const { column, dic } = props;

    return () => {
      const componentProps = {
        ...Object.assign({}, column),
        placeholder: getPlaceholder(column),
        dic: dic,
      }
      const Component = resolveComponent(getComponent(column?.type as string, column?.component));
      return <>{h(Component, componentProps)}</>;
    };
  },
});
