import { BodyCellParams } from "./types";
import { getPrefix } from "../../../src/_utils/common";
import { CrudKey } from "./common";
import config from "./config";
import lang from "../../../src/locale/lang/zh";
import { DIC_PROPS } from "../../../src/global/variable";
import useInit, { defineInit } from "../../core/common/init";
import { calcCascader } from "../../../src/core/dataformat";
import { deepClone, getColumn, arraySort, vaildData } from "../../../src/utils/util";
import useTablePage from "./TablePage";
import HeaderSearch from "./HeaderSearch";
import ColumnSlot from "./ColumnSlot";
import ColumnMenu from "./ColumnMenu";
import DialogForm from "./DialogForm";

const { prefixName, prefixCls } = getPrefix("Crud");

const defaultPropMap = {
  operation: "operation",
};


const tableProps = () => ({
  propMap: {
    type: Object,
    default: () => defaultPropMap,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

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
    ...tableProps(),
  },
  emits: ["search-change", "on-load", "row-update"],
  setup(props, { attrs, slots, emit }) {
    const cellForm = reactive({
      list: [],
    });
    const list: any = ref([]);
    const tableForm = reactive({});
    const tableIndex = ref(-1);
    const dialogForm = ref();

    const {
      DIC,
      cascaderDIC,
      controlSize,
      isMobile,
      isMediumSize,
      rowKey,
      tableOption,
    } = useInit(props.option);

    const { pageFlag, defaultPage, onChage } = useTablePage(props, emit, {
      isMobile,
    });

    const propMap = computed(() => {
      return Object.assign({}, defaultPropMap, props.propMap);
    });

    const treeProps = computed(() => {
      return tableOption.treeProps || {};
    });

    const childrenKey = computed(() => {
      return treeProps.value.children || DIC_PROPS.children;
    });

    const columnOption = computed(() => {
      return getColumn(props.option.column);
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
      const newColumns = result.map((ele: any) => {
        return {
          ...ele,
          title: ele.label,
          dataIndex: ele.prop,
          key: ele.prop,
        };
      });
      newColumns.push({
        title: "操作",
        dataIndex: propMap.value["operation"],
        key: propMap.value["operation"],
        fixed: "right",
        align: "center",
        width: props.editable ? 60 : 160,
      });
      return newColumns;
    });

    function menuIcon(value: string) {
      return vaildData(
        tableOption[value + "Text"],
        (lang as any)["crud"][value]
      );
    }

    function getBtnIcon(value: string) {
      const name = value + "Icon";
      return props.option[name] || (config as any)[name];
    }

    // 编辑
    function rowEdit(row: any, index: number) {
      Object.assign(tableForm, deepClone(row));
      tableIndex.value = index;
      dialogForm.value.show("edit");
    }

    function findData(id: number | string) {
      let result: any = {};
      const callback = (parentList: any, parent?: any) => {
        parentList.forEach((ele: any, index: number) => {
          if (ele[rowKey.value] == id) {
            result = {
              item: ele,
              index: index,
              parentList: parentList,
              parent: parent,
            }
          }
          if (ele[childrenKey.value]) {
            callback(ele[childrenKey.value], ele);
          }
        })
      }
      callback(list.value);
      return result;
    }

    provide(CrudKey, {
      crud: {
        DIC,
        cascaderDIC,
        cellForm,
        childrenKey,
        emit,
        findData,
        getBtnIcon,
        isMediumSize,
        isMobile,
        menuIcon,
        objectOption: objectOption,
        option: props.option,
        propOption,
        rowEdit,
        rowKey,
        search: props.search,
        tableOption,
        tableForm,
        tableIndex,
      },
    });

    function dataInit() {
      Object.assign(cellForm, {
        list: props.data,
      });
      list.value = props.data;
    }

    dataInit();

    return () => {
      return (
        <div class={prefixCls}>
          <HeaderSearch />
          <>
            <a-table
              size={controlSize.value}
              dataSource={cellForm.list}
              columns={columns.value}
              onChange={onChage}
              pagination={
                pageFlag.value &&
                vaildData(props.option.page, true) &&
                defaultPage
              }
              v-slots={{
                bodyCell: (prop: BodyCellParams) => {
                  const { column, index, text, record } = prop;
                  if (
                    vaildData(tableOption.menu, config.menu) &&
                    [column.dataIndex, column.key].includes(
                      propMap.value["operation"]
                    )
                  ) {
                    return <ColumnMenu record={record} index={index} />;
                  } else {
                    return (
                      <ColumnSlot
                        column={column}
                        columnOption={columnOption.value}
                        record={record}
                      />
                    );
                  }
                },
              }}
            />
          </>
          <DialogForm ref={dialogForm} />
        </div>
      );
    };
  },
});
