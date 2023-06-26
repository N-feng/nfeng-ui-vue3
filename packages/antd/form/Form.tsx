import { PropType } from "vue";
import type { FormInstance } from "ant-design-vue";
import set from "lodash-es/set";
import unset from "lodash-es/unset";
import { isEmpty, getPrefix } from "../../../src/_utils/common";
import { FormKey } from "./common";
import { TableOption, Column } from "./types";
import useInit from "../../core/common/init";
import {
  setPx,
  vaildData,
  findObject,
  clearVal,
} from "../../../src/utils/util";
import { validatenull } from "../../../src/utils/validate";
import { formInitVal } from "../../../src/core/dataformat";
import { sendDic } from "../../../src/core/dic";
import config from "./config";
import FormMenu from "./Menu";
import FormTemp from "../../core/components/form/FormTemp";

const { prefixName, prefixCls } = getPrefix("Form");

export default defineComponent({
  name: prefixName,
  props: {
    option: {
      type: Object as PropType<TableOption>,
      required: true,
    },
    value: {},
    model: {},
  },
  emits: ["submit", "error"],
  setup(props, { attrs, slots, emit }) {
    const formRef: any = ref<FormInstance>();
    const allDisabled = ref(false);
    const formData: any = reactive({});
    const formList: any[] = [];

    const option = computed(() => {
      return props.option;
    });
    const { DIC, tableOption, columnOption, propOption, rowKey } =
      useInit(option);

    const parentOption = computed(() => {
      return props.option;
    });

    const menuPosition = computed(() => {
      if (parentOption.value.menuPosition) {
        return parentOption.value.menuPosition;
      } else {
        return "center";
      }
    });

    const detail = computed(() => {
      return parentOption.value.detail;
    });

    const isDetail = computed(() => {
      return detail.value === true;
    });

    const isMenu = computed(() => {
      return columnOption.value.length != 1;
    });

    const boxType = computed(() => {
      return parentOption.value.boxType;
    });

    const isAdd = computed(() => {
      return boxType.value === "add";
    });

    const isEdit = computed(() => {
      return boxType.value === "edit";
    });

    const isView = computed(() => {
      return boxType.value === "view";
    });

    const model = computed(() => (props.model as object) || {});

    provide(FormKey, {
      allDisabled,
      tableOption,
      parentOption,
      columnOption,
      menuPosition,
      setValue: setValue,
      submit,
      resetForm,
    });

    function setValue(name: string | string[], value: any | any[]) {
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
    }

    function resetFields() {
      propOption.value.forEach((item) => {
        if (typeof item.prop === "string") {
          if (isEmpty(formData[item.prop])) {
            unset(model.value, item.prop);
          }
        }
      });
    }

    //初始化表单
    function dataFormat() {
      let formDefault = formInitVal(propOption.value).tableForm;
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
        result = parentOption.value[type];
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
        sendDic({
          column: columnNext,
          value: value,
          form: formData,
        })
      });
    }

    function propChange(option?: TableOption, column?: Column) {
      if (column?.cascader) handleChange(option, column);
    }

    // 验证表单是否显隐
    function vaildDisplay(column: Column) {
      let key: any;
      if (!validatenull(column.display)) {
        key = "display";
      } else if (isAdd.value) {
        key = "addDisplay";
      } else if (isEdit.value) {
        key = "editDisplay";
      } else if (isView.value) {
        key = "viewDisplay";
      }
      return vaildData((column as any)[key], true);
    }

    function show() {
      allDisabled.value = true;
    }

    function hide() {
      allDisabled.value = false;
    }

    async function validate(callback: Function) {
      // TODO: dynamicOption validate
      try {
        const values = await formRef.value.validateFields();
        // console.log("Success:", values);
        show();
        callback(true, hide);
      } catch (errorInfo) {
        // console.log("Failed:", errorInfo);
        callback(false, hide, errorInfo);
      }
    }

    function resetForm(reset: boolean = true) {
      if (reset) {
        let propList = propOption.value.map((ele: any) => ele.prop);
        Object.assign(
          formData,
          clearVal(
            formData,
            propList,
            (tableOption.value.filterParams || []).concat([rowKey.value])
          )
        );
        console.log("formData: ", formData);
        // formRef.value.resetFields();
        resetFields();
      }
    }

    function submit() {
      validate((valid: boolean, msg: string) => {
        if (valid) {
          emit("submit", formData, hide);
        } else {
          emit("error", msg);
        }
      })
    }

    function onInput(name: string, val: any) {
      formData[name] = val;
    }

    dataFormat();

    return () => {
      return (
        <div>
          <a-form
            ref={formRef}
            model={formData}
            class={prefixCls}
            labelCol={{
              style: {
                width: setPx(parentOption.value.labelWidth, config.labelWidth),
              },
            }}
          >
            <a-row>
              {columnOption.value.map((item: any) => {
                return (
                  <>
                    {item.column?.map((column: any, cindex: number) => {
                      return (
                        <>
                          {vaildDisplay(column) && (
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
                                  onChange={() =>
                                    propChange(item.column, column)
                                  }
                                  onUpdate:modelValue={(val) => onInput(column.prop, val)}
                                />
                              </a-form-item>
                            </a-col>
                          )}
                          {column.row && column.span !== 24 && column.count && (
                            <a-col
                              class={`${prefixCls}__line`}
                              key={cindex}
                              style={{
                                width: (column.count / 24) * 100 + "%",
                              }}
                            />
                          )}
                        </>
                      );
                    })}
                    {!isDetail.value && !isMenu.value && (
                      <FormMenu
                        v-slots={{
                          menuForm: () => slots.menuForm && slots.menuForm(),
                        }}
                      />
                    )}
                  </>
                );
              })}
              {!isDetail.value && isMenu.value && <div>222</div>}
            </a-row>
          </a-form>
        </div>
      );
    };
  },
});
