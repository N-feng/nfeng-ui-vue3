import { BodyCellParams } from "./types";
import { getPrefix } from "../../../src/_utils/common";
import { CrudKey } from "./common";
import useInit, { defineInit } from "../../core/common/init";
import { calcCascader } from "../../../src/core/dataformat";
import { deepClone, getColumn, arraySort, vaildData } from "../../../src/utils/util";
import useTablePage from "./TablePage";
import HeaderSearch from "./HeaderSearch";
import ColumnSlot from "./ColumnSlot";

const { prefixName, prefixCls } = getPrefix("Crud");

export default defineComponent({
  name: prefixName,
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
    search: {
      type: Object,
      default() {
        return {};
      },
    },
    page: {
      type: Object,
      default() {
        return {};
      },
    },
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
    const { pageFlag, defaultPage, onChage } = useTablePage(props, emit, {
      isMobile,
    });

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
          (objectOption.value as any)[a.prop]?.index -
          (objectOption.value as any)[b.prop]?.index
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
        propOption,
        objectOption,
        option: props.option,
        search: props.search,
      },
    });

    function dataInit() {
      cellForm.list = props.data;
    }

    dataInit();

    return () => {
      return (
        <div class={prefixCls}>
          <HeaderSearch />
          <>
            <a-table
              dataSource={cellForm.list}
              columns={columns.value}
              onChange={onChage}
              pagination={
                pageFlag.value &&
                vaildData(tableOption.page, true) &&
                defaultPage
              }
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
