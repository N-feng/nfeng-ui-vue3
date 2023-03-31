import { defineComponent } from "vue"
import { useWidget } from "../theme"
import { CommonWidgetNames, CommonWidgetPropsDefine } from "../types"

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