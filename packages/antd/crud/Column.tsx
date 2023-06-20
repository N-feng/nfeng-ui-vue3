import { arraySort } from "../../../src/utils/util";
import { CrudKey, DynamicKey } from "./common";
import ColumnSlot from "./ColumnSlot";
import { validatenull } from "../../../src/utils/validate";
import { DIC_PROPS } from "../../../src/global/variable";

export default defineComponent({
  props: {
    columnOption: {
      type: Array<any>,
      required: true,
    },
    record: {},
  },
  setup(props, { attrs, slots }) {
    const { columnOption, record } = props;
    const { crud } = inject(CrudKey) as any;

    const list = computed(() => {
      let result: any = [...props.columnOption];
      result = arraySort(
        result,
        "index",
        (a: any, b: any) =>
          crud.objectOption[a.prop]?.index - crud.objectOption[b.prop]?.index
      );
      return result;
    });

    provide(DynamicKey, {
      getColumnProp,
    });

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

    return () => {
      return (
        <div>
          {list.value.map((column: any) => {
            return (
              <ColumnSlot
                column={column}
                columnOption={columnOption}
                record={record}
              />
            );
          })}
        </div>
      );
    };
  },
});
