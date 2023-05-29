import { getPrefix } from "../../_utils/common"

const { prefixName } = getPrefix("Input");

export default defineComponent({
  name: prefixName,
  setup() {
    return () => {
      return (
        <div>Input</div>
      )
    }
  }
})