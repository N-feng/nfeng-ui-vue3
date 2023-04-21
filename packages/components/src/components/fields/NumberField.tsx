import { defineComponent } from "vue"
import { useWidget } from "../schema-form/theme"
import { CommonWidgetNames, CommonWidgetPropsDefine } from "../schema-form/types"

export default defineComponent({
  name: "NumberField",
  props: CommonWidgetPropsDefine,
  setup(props) {

    const NumberWidgetRef = useWidget(CommonWidgetNames.NumberWidget)

    return () => {
      const NumberWidget = NumberWidgetRef.value
      const { schema } = props;
      const placeholder = `请输入 ${schema?.title || ""}`;
      return <NumberWidget placeholder={placeholder} />
    }
  }
})