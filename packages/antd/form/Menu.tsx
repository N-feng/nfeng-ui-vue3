import { getPrefix } from "../../../src/_utils/common";
import { vaildData } from "../../../src/utils/util";
import { FormKey } from "./common";

const { prefixCls } = getPrefix("Menu");

export default defineComponent({
  setup(props, { slots }) {
    const { allDisabled, parentOption, menuPosition, submit, resetForm } =
      inject(FormKey) as any;
    const menuSpan = computed(() => parentOption.value.menuSpan || 24);
    const SubmitIcon = resolveComponent(parentOption.value.submitIcon);
    const EmptyIcon = resolveComponent(parentOption.value.emptyIcon);
    return () => {
      return (
        <a-col
          class={[`${prefixCls}__${menuPosition.value}`]}
          span={menuSpan.value}
          md={menuSpan.value}
        >
          <a-form-item
            labelCol={{
              style: {
                width: "0px",
              },
            }}
          >
            {vaildData(parentOption.value.submitBtn, true) && (
              <a-button
                type="primary"
                onClick={submit}
                loading={allDisabled.value}
                v-slots={{
                  icon: () => h(SubmitIcon),
                }}
              >
                {vaildData(parentOption.value.submitText, "提 交")}
              </a-button>
            )}
            {vaildData(parentOption.value.emptyBtn, true) && (
              <a-button
                disabled={allDisabled.value}
                onClick={() => resetForm()}
                v-slots={{ icon: () => h(EmptyIcon) }}
              >
                {vaildData(parentOption.value.emptyText, "清 空")}
              </a-button>
            )}
            {slots.menuForm && slots.menuForm()}
          </a-form-item>
        </a-col>
      );
    };
  },
});