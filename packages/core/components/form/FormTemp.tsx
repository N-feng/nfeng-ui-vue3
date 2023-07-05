import { PropType } from "vue";
import { Column } from "../../../antd/form/types";
import { getComponent, getPlaceholder } from "../../../../src/core/dataformat";
// import { FormKey } from "../../../antd/form/common";

export default defineComponent({
  props: {
    value: {},
    props: {
      type: Object,
    },
    dic: {
      type: Array,
    },
    placeholder: {
      type: String,
    },
    size: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    readonly: {
      type: Boolean,
    },
    column: {
      type: Object as PropType<Column>,
      default: () => {
        return {};
      },
    },
  },
  emits: ["update:modelValue", "change", "setValue"],
  setup(props, { emit }) {
    let text = computed({
      get: () => {
        return props.value;
      },
      set: (val) => {
        emit("update:modelValue", val);
        emit("change", val);
      },
    });

    // const { setValue } = inject(FormKey) as any;

    function setVal(val: any) {
      // setValue(props.column.prop, val);
      emit("setValue", props.column.prop, val);
      text.value = val;
      // emit("change", val);
    }

    return () => {
      const { column, dic, disabled, readonly } = props;
      const Component = resolveComponent(
        getComponent(column?.type as string, column?.component)
      ) as string;
      return (
        <>
          {h(Component, {
            ...column,
            value: text.value,
            column: Object.assign({}, column),
            dic,
            disabled: column.disabled || disabled,
            placeholder: getPlaceholder(column),
            props: column.props || props.props,
            "onUpdate:modelValue": setVal,
          })}
        </>
      );
    };
  },
});
