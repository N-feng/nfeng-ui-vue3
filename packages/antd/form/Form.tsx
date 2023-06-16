import { PropType } from "vue";
import { isEmpty, getPrefix } from "../../../src/_utils/common";
import FormMenu from "./Menu";
import FormTemp from "../../core/components/form/FormTemp";
import { FormKey } from "./common";
import set from "lodash-es/set";
import get from "lodash-es/get";
import unset from "lodash-es/unset";
import { TableOption, Column } from "./types";
import useInit from "../../core/common/init";
import { setPx, vaildData, findObject } from "../../../src/utils/util";
import config from "./config";
import { formInitVal } from "../../../src/core/dataformat";
import { validatenull } from "../../../src/utils/validate";

const { prefixName, prefixCls } = getPrefix("Form");

export default defineComponent({
  name: prefixName,
  props: {
    option: {
      type: Object as PropType<TableOption>,
      required: true,
    },
    value: {},
  },
  setup(props, { attrs, slots }) {
    const formData: any = reactive({});
    const formList: any[] = [];

    const { tableOption, columnOptionRef, propOptionRef, DIC } = useInit(
      props.option
    );

    const parentOptionRef = computed(() => {
      return tableOption || {};
    });

    const menuPositionRef = computed(() => {
      if (parentOptionRef.value.menuPosition) {
        return parentOptionRef.value.menuPosition;
      } else {
        return "center";
      }
    });

    const detailRef = computed(() => {
      return parentOptionRef.value.detail;
    });

    const isMenuRef = computed(() => {
      return columnOptionRef.value.length != 1;
    });

    const isDetailRef = computed(() => {
      return detailRef.value === true;
    });

    const model = computed(() => (attrs['model'] as object) || {});
    provide(FormKey, {
      parentOption: parentOptionRef.value,
      setValue: (name: string | string[], value: any | any[]) => {
        if (typeof name === "string") {
          if (isEmpty(value)) {
            unset(model.value, name);
          } else {
            set(model.value, name, value);
          }
        } else if (Array.isArray(name)) {
          name.forEach((field, index) => {
            if (isEmpty(value)) {
              unset(model.value, field);
            } else {
              if (Array.isArray(value)) {
                set(model.value, field, value[index]);
              } else {
                set(model.value, field, value);
              }
            }
          });
        }
      },
    });

    //初始化表单
    function dataFormat() {
      let formDefault = formInitVal(propOptionRef.value).tableForm;
      let formValue: any = model.value;
      let form: any = {};
      Object.entries(Object.assign(formDefault, formValue)).forEach((ele) => {
        let key = ele[0];
        let value = ele[1];
        if (validatenull(formValue?.[key])) {
          form[key] = value;
        } else {
          form[key] = formValue[key];
        }
      });
      Object.assign(formData, form);
    }

    function getItemParams(
      column: Column,
      item: TableOption,
      type: "span" | "xsSpan" | "offset" | "push" | "pull" | "labelWidth",
      isPx?: boolean
    ) {
      let result;
      if (!validatenull(column[type])) {
        result = column[type];
      } else if (!validatenull(item[type])) {
        result = item?.type;
      } else {
        result = parentOptionRef.value[type];
      }
      result = vaildData(result, config[type]);
      return isPx ? setPx(result) : result;
    }

    function handleChange(list?: TableOption, column?: Column) {
      const cascader = column?.cascader;
      const str = cascader?.join(",");
      cascader?.forEach((item) => {
        const columnNextProp = item;
        // const value = formDataRef.value[column?.prop as string];
        const value = formData[column?.prop as string];
        // 下一个节点
        const columnNext = findObject(list, columnNextProp);
        if (validatenull(columnNext)) return;
        // 如果不是首次加载则清空全部关联节点的属性值和字典值
        if (formList.includes(str)) {
          //清空子类字典列表和值
          cascader?.forEach((ele) => {
            formData.value[ele] = "";
            DIC[ele] = [];
          });
        }
        /**
         * 1.判断当前节点是否有下级节点
         * 2.判断当前节点是否有值
         */
        if (
          validatenull(cascader) ||
          validatenull(value) ||
          validatenull(columnNext)
        ) {
          return;
        }
        // TODO:根据当前节点值获取下一个节点的字典
      });
    }

    function propChange(option?: TableOption, column?: Column) {
      if (column?.cascader) handleChange(option, column);
    }

    dataFormat();

    return () => {
      const parentOption = parentOptionRef.value;
      const columnOption = columnOptionRef.value;
      const menuPosition = menuPositionRef.value;
      const isMenu = isMenuRef.value;
      const isDetail = isDetailRef.value;

      return (
        <div>
          <a-form
            class={prefixCls}
            labelCol={{
              style: {
                width: setPx(parentOption.labelWidth, config.labelWidth),
              },
            }}
          >
            <a-row>
              {columnOption.map((item) => {
                return (
                  <>
                    {item.column?.map((column, cindex) => {
                      return (
                        <>
                          <a-col
                            key={cindex}
                            span={getItemParams(column, item, "span")}
                            md={getItemParams(column, item, "span")}
                            sm={getItemParams(column, item, "span")}
                            xs={getItemParams(column, item, "xsSpan")}
                            offset={getItemParams(column, item, "offset")}
                            push={getItemParams(column, item, "push")}
                            pull={getItemParams(column, item, "pull")}
                          >
                            <a-form-item label={column.label}>
                              <FormTemp
                                column={column}
                                dic={DIC.value[column.prop] || []}
                                value={(formData as any)[column.prop]}
                                onChange={() => propChange(item.column, column)}
                              />
                            </a-form-item>
                          </a-col>
                          {column.row && column.span !== 24 && column.count && (
                            <a-col
                              class={`${prefixCls}__line`}
                              key={cindex}
                              style={{ width: (column.count / 24) * 100 + "%" }}
                            />
                          )}
                        </>
                      );
                    })}
                    {!isDetail && !isMenu && (
                      <FormMenu
                        parentOption={parentOption}
                        menuPosition={menuPosition}
                        v-slots={{
                          menuForm: () => slots.menuForm && slots.menuForm(),
                        }}
                      />
                    )}
                  </>
                );
              })}
            </a-row>
          </a-form>
        </div>
      );
    };
  },
});
