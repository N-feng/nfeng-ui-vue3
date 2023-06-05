import { Select as ASelect, SelectProps as ASelectProps } from "ant-design-vue";
import { GlobalComponentConstructor, PropsType } from "../../../src/types/ts-helpers";
import { getPrefix } from "../../../src/_utils/common";

const { prefixName } = getPrefix("Select");
console.log('prefixName: ', prefixName);

const Select = defineComponent({
  name: prefixName,
  setup() {
    return () => {
      return (
        <div>Select</div>
      )
    }
  }
})

export type SelectProps = PropsType<ASelectProps> & PropsType<typeof Select>;

// export default Select as GlobalComponentConstructor<SelectProps>;

export default Select;