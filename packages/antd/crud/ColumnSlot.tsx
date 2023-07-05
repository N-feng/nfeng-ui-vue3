import { CrudKey } from "./common";
import { validatenull } from "../../../src/utils/validate";
import { detail } from "../../../src/core/detail";
import { DIC_PROPS } from "../../../src/global/variable";
// import { FormKey } from "../form/common";
import FormTemp from "../../core/components/form/FormTemp";

export default defineComponent({
  props: {
    column: Object,
    columnOption: Array,
    record: {},
    index: {
      type: Number,
    },
  },
  setup(props, { attrs, slots }) {
    const { crud } = inject(CrudKey) as any;

    // provide(FormKey, {
    //   setValue: setValue,
    // });

    function setValue(prop: string, val: any) {
      crud.cellForm.list[(props as any).index][prop] = val;
    }

    function vaildLabel(column: any, record: any, val: any) {
      if (column.rules && record.$cellEdit) {
        return val;
      }
    }

    //表格筛选字典
    function handleFilters(column: any, flag: boolean) {
      if (flag !== true) return undefined;
      let list: any[] = [];
      if (!validatenull(crud.DIC[column.prop])) {
        crud.DIC[column.prop].forEach((ele: any) => {
          const props = column.props || crud.tableOption.props || {};
          list.push({
            text: ele[props.label || DIC_PROPS.label],
            value: ele[props.value || DIC_PROPS.value],
          });
        });
      } else {
        crud.cellForm.list.forEach((ele: any) => {
          if (!list.map((item) => item.text).includes(ele[column.prop])) {
            list.push({
              text: ele[column.prop],
              value: ele[column.prop],
            });
          }
        });
      }
      return list;
    }

    function getColumnProp(column: any, type: string) {
      let obj = crud.objectOption[column.prop] || {};
      if (type === "filterMethod") return obj?.filters;
      if (crud.isMobile && ["fixed"].includes(type)) return false;
      let result = obj?.[type];
      if (type == "width" && result == 0) {
        return undefined;
      }
      if (type == "filters") return handleFilters(column, result);
      if (type == "hide") return obj?.hide !== true;
      else return result;
    }

    function handleDetail(row: any, column: any) {
      let result;
      let DIC = column.parentProp
        ? (crud.cascaderDIC[row.$index] || {})[column.prop]
        : crud.DIC[column.prop];
      result = detail(row, column, crud.tableOption, DIC);
      if (!validatenull(DIC) && crud.tableOption.filterDic !== true) {
        row["$" + column.prop] = result;
      }
      return result;
    }

    function setVal(val: any) {
      console.log('val: ', val);
    }

    return () => {
      const column: any = props.column;
      const record: any = props.record;
      const index: any = props.index;
      return (
        getColumnProp(column, "hide") &&
        (record.$cellEdit && column.cell ? (
          <a-form-item
            label={vaildLabel(column, record, undefined)}
            name={[index, column.prop]}
            rules={column.rules}
          >
            <FormTemp
              column={column}
              dic={crud.DIC[column.prop] || []}
              disabled={
                crud.disabled ||
                crud.tableOption.disabled ||
                column.disabled ||
                crud.btnDisabledList[index]
              }
              value={record[column.prop]}
              onUpdate:modelValue={setVal}
              onSetValue={setValue}
            />
          </a-form-item>
        ) : (
          <span>{handleDetail(props.record, props.column)}</span>
        ))
      );
    };
  },
});
