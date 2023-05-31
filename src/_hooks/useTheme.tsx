import { getPrefix } from "../_utils/common";

const { prefixName } = getPrefix("ThemeProvider");

const THEME_PROVIDER_KEY = Symbol()

const ThemeProvider = defineComponent({
  name: prefixName,
  props: {
    theme: {

    }
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)
    console.log('props.theme: ', props.theme);
    console.log('context: ', context);

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default && slots.default();
  }
})

export function useTheme() {}

export default ThemeProvider;