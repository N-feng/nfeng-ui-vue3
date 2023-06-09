import { computed, defineComponent } from "vue";
import { useWidget } from "../schema-form/theme";
import { CommonWidgetNames, FieldPropsDefine } from "../schema-form/types";

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {

    const TextWidgetRef = computed(() => {
      const widgetRef = useWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value;
    })

    const widgetPlaceholderRef = computed(() => {
      const title = `请输入 ${ props.schema?.placeholder || props.schema?.title || ''}`
      return title;
    })

    return () => {
      const { rootSchema, ...rest } = props;

      const TextWidget = TextWidgetRef.value;

      return (<TextWidget {...rest} placeholder={widgetPlaceholderRef.value} />)
    }
  }
})