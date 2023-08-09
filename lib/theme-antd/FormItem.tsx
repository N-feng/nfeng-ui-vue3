import { CommonWidgetPropsDefine } from "../types";

const FormItem = defineComponent({
  name: "FormItem",
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    return () => {
      const { schema } = props;
      return (
        <a-form-item label={schema?.title}>
          {slots.default && slots.default()}
        </a-form-item>
      )
    }
  }
});

export default FormItem;

// HOC: Higher Order Component: 高阶组件
export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} {...attrs} />
          </FormItem>
        );
      };
    },
  });
}
