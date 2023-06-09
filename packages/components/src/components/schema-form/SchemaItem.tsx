import { defineComponent } from "vue";
import { FieldPropsDefine, SchemaTypes } from "./types";
import StringField from "../fields/StringField";
import NumberField from "../fields/NumberField";

import ObjectField from "../fields/ObjectField";
import ArrayField from "../fields/ArrayField";
import { retrieveSchema } from "./utils";
import { useVJSFContext } from "./context";

export default defineComponent({
  name: "SchemaItem",
  props: FieldPropsDefine,
  setup(props) {
    const formContext = useVJSFContext()

    const retrieveSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return formContext.transformSchemaRef.value(
        retrieveSchema(schema, rootSchema, value)
      )
    })

    return () => {
      const { schema, rootSchema, value } = props;

      const retrieveSchema = retrieveSchemaRef.value

      // TODO: 如果type没有指定，我们需要猜测这个type

      const type = schema?.type;

      let Component: any;

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField;
          break;
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField;
          break;
        }
        case SchemaTypes.OBJECT: {
          Component = ObjectField;
          break;
        }
        case SchemaTypes.ARRAY: {
          Component = ArrayField;
          break;
        }
        default: {
          console.warn(`${type} is not supported`);
        }
      }

      return <Component {...props} schema={retrieveSchema} />;
    };
  },
});
