import { PropType } from "vue";
import { Column } from "../../../antd/form/types";
import { getComponent, getPlaceholder } from "../../../../src/core/dataformat";

export default defineComponent({
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  setup(props) {
    const { column } = props;

    return () => {
      return (
        <>
          {h(
            resolveComponent(
              getComponent(column?.type as string, column?.component)
            ),
            {
              placeholder: getPlaceholder(column),
            }
          )}
        </>
      );
    };
  },
});
