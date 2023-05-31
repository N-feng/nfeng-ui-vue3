import { defineComponent } from "vue";
import SchemaItem from "../SchemaItem";
import { FieldPropsDefine } from "../types";
import { isObject } from "../utils";

export default defineComponent({
  name: "ObjectField",
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { schema, rootSchema, value } = props;

      const properties = schema?.properties || {};

      const currentValue: any = isObject(value) ? value : {};

      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            schema={properties[k]}
            rootSchema={rootSchema}
            value={currentValue[k] || properties[k].value}
            key={index}
          />
        );
      });
    };
  },
});
