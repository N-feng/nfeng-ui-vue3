import { PropType } from "vue"
import { Column } from "./types"
import { getComponent } from "../../core/dataformat"

export default defineComponent({
  props: {
    column: {
      type: Object as PropType<Column>
    }
  },
  setup(props) {
    const { column } = props;
    console.log(getComponent(column?.type as string, column?.component));
    return () => {
      return (
        // <component is={getComponent(column?.type as string, column?.component)}>

        // </component>
        <div>
          <n-input />
          <component is={"a-input"}></component>
        </div>
      );
    }
  }
})