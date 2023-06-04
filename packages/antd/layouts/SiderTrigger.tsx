import Divider from "../divider/Divider";
import { getPrefix } from "../../../src/_utils/common";

const { prefixCls } = getPrefix("SiderTrigger");
console.log("prefixCls: ", prefixCls);

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  setup(props) {

    return () => {
      let collapsed = props.modelValue;
      return (
        <div class={prefixCls}
            style={{ width: `${collapsed ? 80 : 200}px` }} >
          <Divider />
          <div
            class="icons__wrapper"
          >
            {collapsed ? <menu-unfold-outlined /> : <menu-fold-outlined />}
          </div>
        </div>
      );
    };
  },
});
