import { PropType } from "vue";
import { getPrefix } from "../../../src/_utils/common";
import FormMenu from "./Menu";
import FormTemp from "../../core/components/form";
import { TableOption, Column } from "./types";
import useInit from "../../core/common/init";
import { getColumn, setPx, vaildData } from "../../../src/utils/util";
import config from "./config";
import { calcCount, formInitVal } from "../../../src/core/dataformat";
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
    modelValue: {},
  },
  setup(props, { slots }) {
    let { tableOption, isMobile } = Object.assign({}, useInit(props.option));

    const propOptionRef = computed(() => {
      let list: Column[] = [];
      columnOptionRef.value.forEach((option: TableOption) => {
        if (option.display !== false) {
          (option?.column || []).forEach((column) => {
            list.push(column);
          });
        }
      });
      return list;
    });

    const parentOptionRef = computed(() => {
      return tableOption || {};
    });

    const columnOptionRef = computed(() => {
      let column = getColumn(tableOption.column);
      let group = tableOption.group || [];
      group.unshift({
        column: column,
      });
      group.forEach((ele, index) => {
        ele.column = getColumn(ele.column);
        // 循环列的全部属性
        ele.column.forEach((column, cindex) => {
          //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
          if (column.display !== false && !isMobile) {
            column = calcCount(column, config.span, cindex === 0);
          }
        });
        //根据order排序
        ele.column = ele.column.sort((a, b) => (b.order || 0) - (a.order || 0));
      });
      return group;
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

    //初始化表单
    function dataFormat() {
      let formDefault = formInitVal(propOptionRef.value).tableForm;
      let formValue: any = Object.assign({}, props.modelValue, props.value);
      let formData: any = {};
      Object.entries(Object.assign(formDefault, formValue)).forEach((ele) => {
        let key = ele[0];
        let value = ele[1];
        if (validatenull(formValue?.[key])) {
          formData[key] = value;
        } else {
          formData[key] = formValue[key];
        }
      });
      return formData;
    }

    function getItemParams(
      column: Column ,
      item: TableOption,
      type: "span" | "xsSpan" | "offset" | "push" | "pull" | "labelWidth",
      isPx?: boolean
    ) {
      let result;
      if (!validatenull(column[type])) {
        result = column?.type;
      } else if (!validatenull(item[type])) {
        result = item?.type;
      } else {
        result = parentOptionRef.value[type];
      }
      result = vaildData(result, config[type]);
      return isPx ? setPx(result) : result;
    }

    let formData = dataFormat();

    provide("formSafe", {
      parentOption: parentOptionRef.value
    });

    return () => {
      const parentOption = parentOptionRef.value;
      const columnOption = columnOptionRef.value;
      const menuPosition = menuPositionRef.value;
      const isMenu = isMenuRef.value;
      const isDetail = isDetailRef.value;

      return (
        <div>
          <a-form>
            <a-row>
              {columnOption.map((item) => {
                return (
                  <>
                    {item.column?.map((column, cindex) => {
                      return (
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
                            <FormTemp column={column} />
                          </a-form-item>
                        </a-col>
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
