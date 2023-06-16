import { PropType } from "vue";
import { getPrefix } from "../../../src/_utils/common";
import FormMenu from "./Menu";
import FormTemp from "../../core/components/form/FormTemp";
import { FormKey } from "./common";
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
    modelValue: {
      // type: Object as PropType<any>,
    },
  },
  emits: ["update:modelValue", "change"],
  setup(props, { slots, emit }) {
    // let formDataRef: any = reactive({});
    let formData: any = reactive({});
    let formCreate = false;
    let formList: any[] = [];

    let { tableOption, columnOptionRef, propOptionRef, DIC } = useInit(
      props.option
    );

    let parentOptionRef = computed(() => {
      return tableOption || {};
    });

    let menuPositionRef = computed(() => {
      if (parentOptionRef.value.menuPosition) {
        return parentOptionRef.value.menuPosition;
      } else {
        return "center";
      }
    });

    let detailRef = computed(() => {
      return parentOptionRef.value.detail;
    });

    let isMenuRef = computed(() => {
      return columnOptionRef.value.length != 1;
    });

    let isDetailRef = computed(() => {
      return detailRef.value === true;
    });

    watch(() => props.modelValue, (val) => {
      if (formCreate) {
        setForm();
      }
    });

    watch(formData, (val) => {
      if (formCreate) {
        setVal();
      }
    });

    provide(FormKey, {
      parentOption: parentOptionRef.value,
      setValue: (column: Column, val: any) => {
        formData[column.prop as string] = val;
      },
    });

    //初始化表单
    function dataFormat() {
      let formDefault = formInitVal(propOptionRef.value).tableForm;
      let formValue: any = Object.assign({}, props.modelValue, props.value);
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
      // formDataRef.value = formData;
      Object.assign(formData, form);
      setVal();
      setTimeout(() => {
        formCreate = true;
      })
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

    function setForm() {
      Object.keys(props.modelValue as any).forEach(ele => {
        formData[ele] = (props.modelValue as any)[ele];
      })
    }

    function setVal() {
      console.log("setVal formData: ", formData);
      emit("update:modelValue", {
        province: 1,
        city: '110100'
      });
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
