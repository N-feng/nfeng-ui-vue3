import { computed, defineComponent } from "vue";
import { useWidget } from "../theme";
import { CommonWidgetNames, FieldPropsDefine } from "../types";

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {

    const TextWidgetRef = computed(() => {
      const widgetRef = useWidget(CommonWidgetNames.TextWidget, props)
      return widgetRef.value;
    })


    return () => {
      const TextWidget = TextWidgetRef.value;
      const { schema } = props;

      const placeholder = `请输入 ${schema?.title || ''}`;

      return (<TextWidget placeholder={placeholder} />)
    }
  }
})