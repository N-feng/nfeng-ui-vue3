import { defineComponent } from "vue";
import SchemaItem from "../SchemaItem";
import { FieldPropsDefine } from "../types";

export default defineComponent({
  name: "ObjectField",
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props;
      const properties = schema?.properties || {};
      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem schema={properties[k]} key={index} />
      ));
    };
  },
});
