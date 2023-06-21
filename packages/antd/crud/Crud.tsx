import { BodyCellParams } from "./types";
import { getPrefix } from "../../../src/_utils/common";
import useInit, { defineInit } from "../../core/common/init";
import useTablePage from "./TablePage";
import { deepClone, getColumn, arraySort } from "../../../src/utils/util";
import { calcCascader } from "../../../src/core/dataformat";
import ColumnSlot from "./ColumnSlot";
import { CrudKey } from "./common";

const { prefixName, prefixCls } = getPrefix("Crud");

export default defineComponent({
  name: prefixName,
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    ...defineInit(),
  },
  setup(props, { attrs, slots, emit }) {
    const cellForm: any = reactive({
      list: [],
    });

    const { DIC, cascaderDIC, tableOption, isMobile } = useInit(props.option);
    useTablePage(props, emit);

    const columnOption = computed(() => {
      return getColumn(deepClone(tableOption.column));
    });

    const propOption = computed(() => {
      let result: any = [];
      function findProp(list: any = []) {
        if (!Array.isArray(list)) return;
        list.forEach((ele: any) => {
          if (Array.isArray(ele.children)) findProp(ele.children);
          else result.push(ele);
        });
      }
      findProp(columnOption.value);
      result = calcCascader(result);
      return result;
    });

    const objectOption = computed(() => {
      let result = {};
      propOption.value.forEach((ele: any) => {
        (result as any)[ele.prop] = ele;
      });
      return result;
    });

    const columns = computed(() => {
      let result: any = [...columnOption.value];
      result = arraySort(
        result,
        "index",
        (a: any, b: any) =>
          (objectOption.value as any)[a.prop]?.index - (objectOption.value as any)[b.prop]?.index
      );
      return result.map((ele: any) => {
        return {
          ...ele,
          title: ele.label,
          dataIndex: ele.prop,
          key: ele.prop,
        };
      });
    });

    provide(CrudKey, {
      crud: {
        cellForm,
        DIC,
        cascaderDIC,
        tableOption,
        isMobile,
        objectOption,
      }
    });

    function dataInit() {
      cellForm.list = props.data;
    }

    dataInit();

    return () => {
      return (
        <div class={prefixCls}>
          <>
            <a-table
              dataSource={cellForm.list}
              columns={columns.value}
              v-slots={{
                bodyCell: (prop: BodyCellParams) => {
                  const { column, index, text, record } = prop;
                  return (
                    <ColumnSlot
                      column={column}
                      columnOption={columnOption.value}
                      record={record}
                    />
                  );
                },
              }}
            />
          </>
        </div>
      );
    };
  },
});
