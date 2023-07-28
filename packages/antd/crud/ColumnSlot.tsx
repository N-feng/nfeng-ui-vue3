import { CrudKey } from "./common";
import config from "./config";
import { validatenull } from "../../../src/utils/validate";
import { detail } from "../../../src/core/detail";
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

    function rowDrop() {
      const el = crud.tableRef.value.$el.querySelectorAll(config.dropRowClass)[0]
      crud.tableDrop('row', el, (evt: any) => {
        const oldIndex = evt.oldIndex - 1;
        const newIndex = evt.newIndex - 1;
        const targetRow = crud.list.value.splice(oldIndex, 1)[0];
        crud.list.value.splice(newIndex, 0, targetRow);
        crud.emit('sortable-change', oldIndex, newIndex)
        crud.refreshTable(() => rowDrop());
      })
    }

    function setSort() {
      rowDrop();
    }

    function setVal(val: any) {
      console.log("setVal: ", val);
    }

    function setValue(prop: string, val: any) {
      crud.cellForm.list[(props as any).index][prop] = val;
    }

    function showToolTip(e: any) {
      if (e.target.offsetWidth >= e.target.scrollWidth) {
        e.target.style.pointerEvents = "none"; // 阻止鼠标事件
      }
    }

    function vaildLabel(column: any, record: any, val: any) {
      if (column.rules && record.$cellEdit) {
        return val;
      }
    }

    onMounted(() => {
      setSort();
    });

    return () => {
      const column: any = props.column;
      const record: any = props.record;
      const index: any = props.index;
      return record.$cellEdit && column.cell ? (
        <a-form-item
          label={vaildLabel(column, record, undefined)}
          name={[index, column.prop]}
          rules={column.rules}
        >
          {slots[`${column.prop}-form`] ? (
            (slots as any)[`${column.prop}-form`]({
              row: record,
              disabled: crud.btnDisabledList[index],
            })
          ) : (
            <FormTemp
              column={column}
              dic={crud.DIC[column.prop] || []}
              disabled={
                crud.disabled ||
                crud.tableOption?.disabled ||
                column.disabled ||
                crud.btnDisabledList[index]
              }
              value={record[column.prop]}
              onUpdate:modelValue={setVal}
              onSetValue={setValue}
            />
          )}
        </a-form-item>
      ) : slots[column.prop] ? (
        (slots as any)[column.prop]({ row: record, index: index })
      ) : (
        <>
          {(column.overHidden && (
            <a-tooltip
              placement="top"
              v-slots={{
                title: () => {
                  return (
                    <span v-text={handleDetail(props.record, props.column)} />
                  );
                },
                default: () => {
                  return (
                    <div
                      class={["tooltip", "cell"]}
                      style={{ width: column.width + "px" }}
                      onMouseenter={showToolTip}
                    >
                      <span v-text={handleDetail(props.record, props.column)} />
                    </div>
                  );
                },
              }}
            ></a-tooltip>
          )) ||
            (column.html && (
              <span v-html={handleDetail(props.record, props.column)}></span>
            )) || <span v-text={handleDetail(props.record, props.column)} />}
        </>
      );
    };
  },
});
