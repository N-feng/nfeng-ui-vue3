import { defineComponent, reactive } from "vue";
import { SchemaForm, ThemeProvider } from "../lib";
import themeDefault from "../lib/theme-antd";

export default defineComponent({
  setup() {
    const schema = reactive({
      description: "A simple form example.",
      type: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: {
          title: "firstName",
          type: "string",
          default: "Chuck",
        },
        lastName: {
          title: "lastName",
          type: "string",
        },
        telephone: {
          title: "telephone",
          type: "string",
          minLength: 10,
        },
        staticArray: {
          title: "staticArray",
          type: "array",
          items: [
            {
              type: "string",
            },
            {
              type: "number",
            },
          ],
        },
        singleTypeArray: {
          title: "singleTypeArray",
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              age: {
                type: "number",
              },
            },
          },
          value: [{ name: "jokcy", age: 12 }],
        },
        multiSelectArray: {
          title: "multiSelectArray",
          type: "array",
          items: {
            type: "string",
            enum: ["123", "456", "789"],
          },
        },
      },
    });

    return () => {
      return (
        <ThemeProvider theme={themeDefault}>
          <SchemaForm schema={schema} />
        </ThemeProvider>
      );
    };
  },
});
