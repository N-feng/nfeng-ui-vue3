import { PropType } from "vue";
import { getPrefix } from "../../../src/_utils/common";
import { vaildData } from "../../../src/utils/util";
import { TableOption, Column } from "./types";

const { prefixCls } = getPrefix("Menu");

export default defineComponent({
  props: {
    parentOption: {
      type: Object as PropType<TableOption>,
    },
    menuPosition: {
      type: String,
    },
  },
  setup(props, { slots }) {
    const { parentOption, menuPosition } = props;
    const menuSpanRef = computed(() => parentOption?.menuSpan || 24);
    return () => {
      const menuSpan = menuSpanRef.value;
      return (
        <a-col
          class={[`${prefixCls}__${menuPosition}`]}
          span={menuSpan}
          md={menuSpan}
        >
          {vaildData(parentOption?.submitBtn, true) && (
            <a-button type="primary">提交</a-button>
          )}
          <a-button>取消</a-button>
          <>{slots.menuForm && slots.menuForm()}</>
        </a-col>
      );
    };
  },
});