import { computed, ComputedRef, defineComponent, ExtractPropTypes, inject, PropType, provide } from "vue";
import {
  CommonWidgetNames,
  FieldPropsDefine,
  SelectionWidgetNames,
  Theme,
} from "./types";

const THEME_PROVIDER_KEY = Symbol();

const ThemeProvider = defineComponent({
  name: "ThemeProvider",
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    }
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default()
  }
})

export function useWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
  props?: ExtractPropTypes<typeof FieldPropsDefine>
) {
  if (props) {
    const { schema } = props;
  }

  const context: ComputedRef<Theme> | undefined = inject<ComputedRef<Theme>>(
    THEME_PROVIDER_KEY,
  )
  if (!context) {
    throw new Error('vjsf theme required')
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef;
}

export default ThemeProvider
