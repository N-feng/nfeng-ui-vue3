import { PropType } from "vue";
import { vaildData } from "../../utils/util";
import { TableOption, Column } from "./types";

export default defineComponent({
  props: {
    parentOption: {
      type: Object as PropType<TableOption>
    }
  },
  setup(props, { slots }) {
    const { parentOption } = props;
    return () => {
      return (
        <div>
          {vaildData(parentOption?.submitBtn,true) ? (
            <a-button type="primary">提交</a-button>
          ) : (
            ""
          )}
          <a-button>取消</a-button>
          <>{slots.menuForm && slots.menuForm()}</>
        </div>
      );
    }
  }
})