import { isEmpty, getPrefix } from "../../../src/_utils/common";

const { prefixName, prefixCls } = getPrefix("Group");

export default defineComponent({
  name: prefixName,
  setup(props, { slots }) {
    return () => {
      return slots.default?.();
    };
  },
});
