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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const handleClick = (v: boolean) => {
      emit("update:modelValue", v);
    };

    return () => {
      let collapsed = props.modelValue;
      return (
        <div class={prefixCls} onClick={() => handleClick(!collapsed)}>
          <Divider />
          <div
            class="icons__wrapper"
            style={{ left: `${collapsed ? 32 : 24}px` }}
          >
            {collapsed ? <menu-unfold-outlined /> : <menu-fold-outlined />}
          </div>
        </div>
      );
    };
  },
});
