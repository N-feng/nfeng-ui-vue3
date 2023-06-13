import { PropType } from "vue";
import { DIC_PROPS } from "../../../src/global/variable";
import { TableOption, Column } from "../../antd/form/types";

export type Props = {
  label?: string;
  value?: string;
};

export const defineProps = () => ({
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
  onChange: {
    type: Function as PropType<(value: any) => void>,
  },
});

export function useProps(props: any) {
  const textRef = ref(undefined);
  const propsDefault = DIC_PROPS;

  const valueKey = computed(() => {
    return props?.props?.value || propsDefault.value;
  });

  const labelKey = computed(() => {
    return props?.props?.label || propsDefault.label;
  });

  return {
    textRef,
    valueKey,
    labelKey,
  };
}