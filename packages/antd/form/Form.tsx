import { PropType } from "vue";
import type { FormInstance } from "ant-design-vue";
import set from "lodash-es/set";
import unset from "lodash-es/unset";
import { isEmpty, getPrefix } from "../../../src/_utils/common";
import { FormKey } from "./common";
import { TableOption, Column } from "./types";
import useInit from "../../core/common/init";
import { formInitVal, getPlaceholder } from "../../../src/core/dataformat";
import { sendDic } from "../../../src/core/dic";
import { getSlotName } from "../../../src/core/slot";
import b from "../../../src/utils/bem";
import {
  clearVal,
  findObject,
  setPx,
  vaildData,
} from "../../../src/utils/util";
import { validatenull } from "../../../src/utils/validate";
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
  emits: ["submit", "error", "reset-change", "update:status"],
  setup(props, { attrs, slots, emit, expose }) {
    const formRef: any = ref<FormInstance>();
    const activeName = ref("");
    const allDisabled = ref(false);
    const formData: any = reactive({});
    const formList: any[] = [];

    watch(
      allDisabled,
      (val) => {
        emit("update:status", val);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const option = computed(() => {
      return props.option;
    });

    const { DIC, controlSize, columnOption, propOption, rowKey, tableOption } =
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

    const isTabs = computed(() => {
      return parentOption.value.tabs === true;
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

    const tabsActive = computed(() => {
      return vaildData(tableOption.tabsActive + "", "1");
    });

    watch(
      tabsActive,
      (val) => {
        activeName.value = val;
      },
      { immediate: true }
    );

    provide(FormKey, {
      allDisabled,
      tableOption,
      parentOption,
      columnOption,
      menuPosition,
      // setValue: setValue,
      submit,
      resetForm,
    });

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
        });
      });
    }

    function hide() {
      allDisabled.value = false;
    }

    function isGroupShow(item: any, index: any) {
      if (isTabs.value) {
        return index == activeName.value || index == 0;
      } else {
        return true;
      }
    }

    function onInput(name: string, val: any) {
      formData[name] = val;
    }

    function propChange(option?: TableOption, column?: Column) {
      if (column?.cascader) handleChange(option, column);
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

    function resetForm(reset: boolean = true) {
      if (reset) {
        let propList = propOption.value.map((ele: any) => ele.prop);
        Object.assign(
          formData,
          clearVal(
            formData,
            propList,
            (tableOption.filterParams || []).concat([rowKey.value])
          )
        );
        // formRef.value.resetFields();
        resetFields();
      }
      nextTick(() => {
        emit("reset-change");
      });
    }

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

    function show() {
      allDisabled.value = true;
    }

    function submit() {
      validate((valid: boolean, msg: string) => {
        if (valid) {
          emit("submit", formData, hide);
        } else {
          emit("error", msg);
        }
      });
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

    function validTip(column: Column) {
      return !column.tip || column.type === "upload";
    }

    dataFormat();

    expose({
      submit: submit,
      resetForm: resetForm,
    });

    return () => {
      return (
        <div>
          <a-form
            ref={formRef}
            model={formData}
            class={prefixCls}
            labelOption={parentOption.value.labelOption}
            labelCol={{
              style: {
                width: setPx(parentOption.value.labelWidth, config.labelWidth),
              },
            }}
            layout={parentOption.value.layout}
          >
            <a-row>
              {columnOption.value.map((item: any, index: number) => {
                return (
                  <n-group
                    collapse={item.collapse}
                    display={vaildDisplay(item)}
                    header={!isTabs.value}
                    key={item.prop}
                    label={item.label}
                    v-slots={{
                      tabs: () => isTabs.value && index == 1 && (
                        <a-tabs v-model:activeKey={activeName.value}>
                          {columnOption.value.map(
                            (tabs: any, index: number) => {
                              if (vaildDisplay(tabs) && index != 0) {
                                return (
                                  <a-tab-pane
                                    key={index + ""}
                                    tab={tabs.label}
                                  />
                                );
                              }
                              return <></>;
                            }
                          )}
                        </a-tabs>
                      ),
                      header: getSlotName(item, "H", slots)
                        ? () =>
                            slots[getSlotName(item, "H")]?.({ column: item })
                        : null,
                      default: () => (
                        <div
                          class={b(prefixCls, "group", {
                            flex: vaildData(item.flex, true),
                          })}
                          v-show={isGroupShow(item, index)}
                        >
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
                                    offset={getItemParams(
                                      column,
                                      item,
                                      "offset"
                                    )}
                                    push={getItemParams(column, item, "push")}
                                    pull={getItemParams(column, item, "pull")}
                                  >
                                    <a-form-item
                                      // label={column.label}
                                      labelCol={{
                                        style: {
                                          width: getItemParams(
                                            column,
                                            item,
                                            "labelWidth",
                                            true
                                          ),
                                        },
                                      }}
                                      class={[
                                        `form-item--${
                                          column.size || controlSize.value
                                        }`,
                                      ]}
                                      v-slots={{
                                        label: () => {
                                          return (
                                            <span>
                                              {column.labelTip && (
                                                <a-tooltip
                                                  placement={
                                                    column.labelTipPlacement ||
                                                    "topLeft"
                                                  }
                                                  v-slots={{
                                                    title: () =>
                                                      column.labelTip,
                                                    default: () => (
                                                      <span style="margin-right:8px">
                                                        <info-circle-outlined />
                                                      </span>
                                                    ),
                                                  }}
                                                ></a-tooltip>
                                              )}
                                              {column.label}
                                            </span>
                                          );
                                        },
                                        default: () => {
                                          const componentProps = {
                                            column: column,
                                            dic: DIC.value[column.prop] || [],
                                            size:
                                              column.size || controlSize.value,
                                            value: (formData as any)[
                                              column.prop
                                            ],
                                            onChange: () =>
                                              propChange(item.column, column),
                                            "onUpdate:modelValue": (val: any) =>
                                              onInput(column.prop, val),
                                            onSetValue: setValue,
                                          };
                                          return slots[column.prop] ? (
                                            slots[column.prop]?.(componentProps)
                                          ) : (
                                            <FormTemp {...componentProps} />
                                          );
                                        },
                                      }}
                                    />
                                  </a-col>
                                )}
                                {column.row &&
                                  column.span !== 24 &&
                                  column.count && (
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
                                menuForm: () =>
                                  slots.menuForm && slots.menuForm(),
                              }}
                            />
                          )}
                        </div>
                      ),
                    }}
                  ></n-group>
                );
              })}
            </a-row>

            {!isDetail.value && isMenu.value && (
              <FormMenu
                v-slots={{
                  menuForm: () => slots.menuForm && slots.menuForm(),
                }}
              />
            )}
          </a-form>
        </div>
      );
    };
  },
});
