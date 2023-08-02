import { PropType } from "vue";
import { DIC_PROPS } from "../../../src/global/variable";
import { TableOption, Column } from "../../antd/form/types";

export type Props = {
  label?: string;
  value?: string;
};

export const defineProps = () => ({
  blur: Function,
  change: Function,
  click: Function,
  focus: Function,
  typeformat: Function,
  button: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  column: {
    type: Object as PropType<Column>,
    default: () => {
      return {};
    },
  },
  dic: {
    type: Array<any>,
    default: () => {
      return [];
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {},
  placeholder: {
    type: String,
    default: "",
  },
  prop: {
    type: String,
    default: "",
  },
  props: {
    type: Object as PropType<Props>,
    default: () => DIC_PROPS,
  },
  readonly: {
    type: Boolean,
  },
  size: {
    type: String,
    default: "",
  },
  tip: {
    type: String,
    // default: "",
  },
  tipPlacement: {
    type: String,
    default: "topLeft",
  },
  value: {},
});

export function useProps(props: any, name?: string) {
  const propsDefault = DIC_PROPS;

  const clearableVal = computed(() => {
    return props.disabled ? false : props.clearable;
  });

  const componentName = computed(() => {
    const type = 'a';
    const result = `${type}-${name}${props.button ? '-button' : ''}`;
    return result;
  });

  const valueKey = computed(() => {
    return props?.props?.value || propsDefault.value;
  });

  const labelKey = computed(() => {
    return props?.props?.label || propsDefault.label;
  });

  return {
    clearableVal,
    componentName,
    valueKey,
    labelKey,
  };
}