import { getPrefix } from "../../../src/_utils/common"

const { prefixName } = getPrefix("Input");

export default defineComponent({
  name: prefixName,
  setup() {
    return () => {
      return (
        <a-input></a-input>
      )
    }
  }
})