import { PropType } from "vue";
import { DIC_PROPS } from "../../../src/global/variable";

export type Props = {
  label?: string;
  value?: string;
};

export const defineProps = () => ({
  props: {
    type: Object as PropType<Props>,
    default: () => DIC_PROPS
  }
});

export function useInit(props: any) {


    const propsDefault = DIC_PROPS;
  
    const valueKey = computed(() => {
      return props.value || propsDefault.value;
    });

    const labelKey = computed(() => {
      return props.label || propsDefault.label;
    });

    return { valueKey,
      labelKey
    }
}