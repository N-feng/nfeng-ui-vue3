import { getPrefix } from "../../../src/_utils/common";
import { vaildData } from "../../../src/utils/util";
import { FormKey } from "./common";

const { prefixCls } = getPrefix("Menu");

export default defineComponent({
  setup(props, { slots }) {
    const { parentOption, menuPosition } = inject(FormKey) as any;
    const menuSpan = computed(() => parentOption.value.menuSpan || 24);
    return () => {
      return (
        <a-col
          class={[`${prefixCls}__${menuPosition.value}`]}
          span={menuSpan.value}
          md={menuSpan.value}
        >
          {vaildData(parentOption.value.submitBtn, true) && (
            <a-button type="primary">提交</a-button>
          )}
          <a-button>取消</a-button>
          <>{slots.menuForm && slots.menuForm()}</>
        </a-col>
      );
    };
  },
});