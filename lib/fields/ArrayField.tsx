import { defineComponent } from "vue";
import SchemaItem from "../SchemaItem";
import { useWidget } from "../theme";
import { FieldPropsDefine, Schema, SelectionWidgetNames } from "../types";

const ArrayItemWrapper = defineComponent({
  name: "ArrayItemWrapper",
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => {
      return (
        <div class={{ border: "1px solid #eee" }}>
          <div class="p10">
            <button class="mr10">新增</button>
            <button class="mr10">删除</button>
            <button class="mr10">上移</button>
            <button class="mr10">下移</button>
          </div>
          <div class="p10">{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});

export default defineComponent({
  name: "ArrayField",
  props: FieldPropsDefine,
  setup(props) {
    const SelectWidgetRef = useWidget(SelectionWidgetNames.SelectionWidget);

    return () => {
      const SelectionWidget = SelectWidgetRef.value;
      const { schema, rootSchema, value } = props;

      const isMultiType = Array.isArray(schema?.items);
      const isSelect = schema?.items && (schema.items as any).enum;

      if (isMultiType) {
        const items: Schema[] = schema?.items as any;
        const arr = Array.isArray(value) ? value : [];

        return items.map((s: Schema, index: number) => {
          return (
            <SchemaItem
              schema={s}
              key={index}
              rootSchema={rootSchema}
              value={arr[index]}
            />
          );
        });
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : [];
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper index={index}>
              <SchemaItem
                schema={schema?.items as Schema}
                value={v}
                key={index}
                rootSchema={rootSchema}
              />
            </ArrayItemWrapper>
          );
        });
      } else {
        const enumOptions = (schema as any).items.enum;
        const options = enumOptions.map((e: any) => ({
          label: e,
          value: e,
        }));
        const placeholder = `请选择 ${schema.title || ''}`;
        return (
          <SelectionWidget
            options={options}
            schema={schema}
            placeholder={placeholder}
          />
        );
      }
    };
  },
});
