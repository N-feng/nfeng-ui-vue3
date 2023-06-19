import { isEmpty, getPrefix } from "../../../src/_utils/common";

const { prefixName, prefixCls } = getPrefix("Crud");

export default defineComponent({
  name: prefixName,
  setup(props, { attrs, slots }) {
    return () => {
      return (
        <div class={prefixCls}>
          <>
            <a-table></a-table>
          </>
        </div>
      );
    };
  },
});
