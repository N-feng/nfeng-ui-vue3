import { defineComponent, PropType } from "vue"
import { CustomKeyword, Schema } from "./types"
import SchemaItem from "./SchemaItem";
import { useFormData } from "./core/dataformat";
import { SchemaFormContextKey } from "./context";

type A = typeof SchemaItem

export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {},
    customKeywords: {
      type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>,
    },
  },
  name: "SchemaForm",
  setup(props) {
    const transformSchemaRef = computed(() => {
      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords];

        return (schema: Schema) => {
          let newSchema = schema;
          customKeywords.forEach((keyword) => {
            if ((newSchema as any)[keyword.name]) {
              newSchema = keyword.transformSchema(schema);
            }
          });
          return newSchema;
        };
      }
      return (s: Schema) => s;
    });

    const context: any = {
      SchemaItem,
      transformSchemaRef,
    };

    provide(SchemaFormContextKey, context);

    return () => {
      const { schema, value } = props;
      // const formData = useFormData(schema)
      // console.log('formData: ', formData);
      return <SchemaItem schema={schema} rootSchema={schema} value={value} />;
    };
  },
});
