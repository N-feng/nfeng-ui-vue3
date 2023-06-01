import { PropType } from "vue";
import { Column } from "../../../antd/form/types";
import { getComponent } from "../../../../src/core/dataformat";

export default defineComponent({
  props: {
    column: {
      type: Object as PropType<Column>,
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
            )
          )}
        </>
      );
    };
  },
});
