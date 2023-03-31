import { defineComponent, PropType } from "vue"
import { Schema } from "./types"
import SchemaItem from "./SchemaItem";

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    }
  },
  name: "SchemaForm",
  setup(props) {
    return () => {
      const { schema } = props
      return (<SchemaItem schema={schema} />)
    }
  }
})
