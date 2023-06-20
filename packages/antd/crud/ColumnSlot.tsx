import { CrudKey, DynamicKey } from "./common";
import { validatenull } from "../../../src/utils/validate";
import { detail } from "../../../src/core/detail";

export default defineComponent({
  props: {
    column: Object,
    columnOption: Array,
    record: {},
  },
  setup(props, { attrs, slots }) {
    const { column, record } = props;

    const { crud } = inject(CrudKey) as any;
    const { getColumnProp } = inject(DynamicKey) as any;

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

    return () => {
      return (
        getColumnProp(column, "hide") && (
          <span>{handleDetail(record, column)}</span>
        )
      );
    };
  },
});
