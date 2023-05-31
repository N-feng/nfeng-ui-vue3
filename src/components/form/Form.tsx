import { PropType } from "vue";
import { getPrefix } from "../../_utils/common";
import FormMenu from "./Menu";
import FormTemp from "./FormTemp";
import { TableOption, Column } from "./types";
import useInit from "../../_hooks/useInIt";
import { getColumn } from "../../utils/util";
import config from "./config";
import { calcCount, formInitVal } from "../../core/dataformat";
import { validatenull } from "../../utils/validate";
import { globalOptions } from "../../theme-antd";

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

    let formData = dataFormat();
    console.log("formData: ", formData);

    const { COMPONENT_MAP } = globalOptions;

    return () => {
      const columnOption = columnOptionRef.value;
      const isMenu = isMenuRef.value;
      const isDetail = isDetailRef.value;
      const parentOption = parentOptionRef.value;

      return (
        <div>
          <>
            {h(COMPONENT_MAP.form, null, {
              default: () => {
                return <>{h(COMPONENT_MAP.row, {
                  span: 24
                })}</>;
              },
            })}
          </>
          <>
            {columnOption.map((item) => {
              return (
                <>
                  {item.column?.map((column) => {
                    return <FormTemp column={column}></FormTemp>;
                  })}
                </>
              );
            })}
          </>
          {!isDetail && !isMenu ? (
            <FormMenu
              parentOption={parentOption}
              v-slots={{ menuForm: () => slots.menuForm && slots.menuForm() }}
            />
          ) : (
            ""
          )}
        </div>
      );
    };
  },
});
