import { PropType } from "vue";
import { DIC_PROPS } from "../../../src/global/variable";
import { TableOption, Column } from "../../antd/form/types";

export type Props = {
  label?: string;
  value?: string;
};

export const defineProps = () => ({
  blur: Function,
  focus: Function,
  change: Function,
  click: Function,
  typeformat: Function,
  value: {},
  column: {
    type: Object as PropType<Column>,
    default: () => {
      return {};
    },
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  prop: {
    type: String,
    default: "",
  },
  dic: {
    type: Array<any>,
    default: () => {
      return {};
    },
  },
  placeholder: {
    type: String,
    default: "",
  },
  props: {
    type: Object as PropType<Props>,
    default: () => DIC_PROPS,
  },
});

export function useProps(props: any) {
  const propsDefault = DIC_PROPS;

  const clearableVal = computed(() => {
    return props.disabled ? false : props.clearable;
  });

  const valueKey = computed(() => {
    return props?.props?.value || propsDefault.value;
  });

  const labelKey = computed(() => {
    return props?.props?.label || propsDefault.label;
  });

  return {
    clearableVal,
    valueKey,
    labelKey,
  };
}