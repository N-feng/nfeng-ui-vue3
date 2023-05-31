import { PropType } from "vue";
import { Column } from "./types";
import { getComponent } from "../../core/dataformat";

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
