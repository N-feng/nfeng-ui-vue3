import type { FormInstance } from "ant-design-vue";
import { CrudKey } from "./common";
import config from "./config";
import { BodyCellParams } from "./types";
import { getPrefix } from "../../../src/_utils/common";
import lang from "../../../src/locale/lang/zh";
import { DIC_PROPS } from "../../../src/global/variable";
import useInit, { defineInit } from "../../core/common/init";
import { calcCascader, formInitVal } from "../../../src/core/dataformat";
import { getSlotName, getSlotList } from "../../../src/core/slot";
import {
  deepClone,
  getColumn,
  arraySort,
  vaildData,
} from "../../../src/utils/util";
import { validatenull } from "../../../src/utils/validate";
import useTablePage from "./TablePage";
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";
import ColumnSlot from "./ColumnSlot";
import ColumnMenu from "./ColumnMenu";
import DialogColumn from "./DialogColumn";
import DialogForm from "./DialogForm";
import Sortable from "sortablejs";

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
    tableLoading: {
      type: Boolean,
      default: false,
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
  emits: [
    "currentRowChange",
    "current-change",
    "load",
    "refresh-change",
    "row-click",
    "row-dblclick",
    "row-del",
    "row-save",
    "row-update",
    "searchChange",
    "searchReset",
    "sortable-change",
  ],
  setup(props, { attrs, slots, emit, expose }) {
    const btnDisabledList = reactive<any>({});
    const btnDisabled = ref(false);
    const cascaderFormList = reactive<any>([]);
    const cellForm = reactive<any>({
      list: [],
    });
    const dialogColumn = ref();
    const dialogForm = ref();
    const formRef = ref<any>();
    const list = ref<any>([]);
    const oldCurrentRow = reactive<any>({});
    const reload = ref(Math.random());
    const rowSelected = reactive<any>({});
    const tableForm = reactive({});
    const tableIndex = ref(-1);
    const tableRef = ref<any>();
    const theadColumns = ref<any[]>([]);

    const {
      DIC,
      cascaderDIC,
      controlSize,
      isMobile,
      isMediumSize,
      rowKey,
      tableOption,
    } = useInit(props.option);

    const { defaultPage, onChange, pageFlag } = useTablePage(props, emit, {
      isMobile,
    });

    const childrenKey = computed(() => {
      return treeProps.value.children || DIC_PROPS.children;
    });

    const columnOption = computed(() => {
      if (theadColumns.value.length) {
        return theadColumns.value;
      }
      return getColumn(props.option.column);
    });

    const data = computed(() => props.data || []);

    const initColumns = computed(() => {
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
      if (vaildData(tableOption?.index)) {
        const seq = reactive({
          title: tableOption?.indexLabel || config.indexLabel,
          dataIndex: "seq",
          fixed: "left",
          align: "center",
          width: tableOption?.indexWidth || config.indexWidth,
        });
        newColumns.unshift(seq);
      }
      if (vaildData(tableOption?.menu, config.menu)) {
        newColumns.push({
          title: "操作",
          dataIndex: propMap.value["operation"],
          key: propMap.value["operation"],
          fixed: "right",
          align: "center",
          width: props.editable ? 60 : 220,
        });
      }
      return newColumns.filter((column: any) => getColumnProp(column, "hide"));
    });

    const isColumnSort = computed(() => {
      return tableOption?.columnSort;
    });

    const isRowSort = computed(() => {
      return tableOption?.rowSort;
    });

    const isSortable = computed(() => {
      return tableOption?.sortable;
    });

    const propMap = computed(() => {
      return Object.assign({}, defaultPropMap, props.propMap);
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

    const mainSlot = computed(() => {
      let result: any = [];
      propOption.value.forEach((item: any) => {
        if (slots[item.prop]) result.push(item.prop);
      });
      return getSlotList(["Header", "Form"], slots, propOption.value).concat(
        result
      );
    });

    const objectOption: any = computed(() => {
      let result = {};
      propOption.value.forEach((ele: any) => {
        (result as any)[ele.prop] = ele;
      });
      return result;
    });

    const rowParentKey = computed(() => {
      return props.option.rowParentKey || DIC_PROPS.rowParentKey;
    });

    const treeProps = computed(() => {
      return tableOption?.treeProps || {};
    });

    watch(
      () => props.data,
      (val) => {
        dataInit();
      }
    );

    watch(list, (val) => {
      cellForm.list = val;
    });

    //设置单选
    function currentRowChange(currentRow: any, oldCurrentRow?: any) {
      Object.assign(rowSelected, currentRow);
      emit("currentRowChange", currentRow, oldCurrentRow);
    }

    function dataInit() {
      list.value = data.value;
      list.value.forEach((ele: any, index: number) => {
        if (ele.$cellEdit && !cascaderFormList[index]) {
          cascaderFormList[index] = deepClone(ele);
        }
        ele.$cellEdit = ele.$cellEdit || false;
        ele.$index = index;
        ele.key = ele[rowKey.value];
      });
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
            };
          }
          if (ele[childrenKey.value]) {
            callback(ele[childrenKey.value], ele);
          }
        });
      };
      callback(list.value);
      return result;
    }

    function getBtnIcon(value: string) {
      const name = value + "Icon";
      return props.option[name] || (config as any)[name];
    }

    function getColumnProp(column: any, type: string) {
      let obj = objectOption.value[column.prop] || {};
      if (type === "filterMethod") return obj?.filters;
      if (isMobile.value && ["fixed"].includes(type)) return false;
      let result = obj?.[type];
      if (type == "width" && result == 0) {
        return undefined;
      }
      if (type == "filters") return handleFilters(column, result);
      if (type == "hide") return obj?.hide !== true;
      else return result;
    }

    //表格筛选字典
    function handleFilters(column: any, flag: boolean) {
      if (flag !== true) return undefined;
      let list: any[] = [];
      if (!validatenull(DIC[column.prop])) {
        DIC[column.prop].forEach((ele: any) => {
          const props = column.props || tableOption.props || {};
          list.push({
            text: ele[props.label || DIC_PROPS.label],
            value: ele[props.value || DIC_PROPS.value],
          });
        });
      } else {
        cellForm.list.forEach((ele: any) => {
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

    function headerSort(oldIndex: number, newIndex: number) {
      let column = columnOption.value;
      let targetRow = column.splice(oldIndex, 1)[0];
      column.splice(newIndex, 0, targetRow);
      refreshChange();
    }

    function menuIcon(value: string) {
      return vaildData(
        tableOption?.[value + "Text"],
        (lang as any)["crud"][value]
      );
    }

    function onGetThead(option: any) {
      const newColumns = option.columns;
      theadColumns.value = newColumns || [];
    }

    //刷新事件
    function refreshChange() {
      emit("refresh-change");
    }

    function refreshTable(callback?: Function) {
      reload.value = Math.random();
      nextTick(() => {
        callback && callback();
      });
    }

    function rowAdd() {
      dialogForm.value.show("add");
    }

    // 行取消
    function rowCancel(row: any, index: number) {
      if (validatenull(row[rowKey.value])) {
        list.value.splice(index, 1);
      } else {
        cascaderFormList[index].$cellEdit = false;
        list.value[index] = cascaderFormList[index];
      }
    }

    // 行编辑点击
    function rowCell(row: any, index: number) {
      if (row.$cellEdit) {
        rowCellUpdate(row, index);
      } else {
        rowCellEdit(row, index);
      }
    }

    // 单元格新增
    function rowCellAdd(row: any = {}) {
      let len = list.value.length;
      let formDefault = formInitVal(propOption.value).tableForm;
      row = deepClone(
        Object.assign({ $cellEdit: true, $index: len }, formDefault, row)
      );
      list.value.push(row);
    }

    // 单元格编辑
    function rowCellEdit(row: any, index: number) {
      row.$cellEdit = true;
      // 缓冲行数据
      cascaderFormList[index] = deepClone(row);
    }

    async function rowCellUpdate(row: any, index: number) {
      row = deepClone(row);
      var result = await validateCellField(index);
      const done = () => {
        btnDisabledList[index] = false;
        btnDisabled.value = false;
        list.value[index].$cellEdit = false;
      };
      const loading = () => {
        btnDisabledList[index] = false;
        btnDisabled.value = false;
      };
      if (result) {
        btnDisabledList[index] = true;
        btnDisabled.value = false;
        if (validatenull(row[rowKey.value])) {
          emit("row-save", row, done, loading);
        } else {
          emit("row-update", row, index, done, loading);
        }
      }
    }

    // 行单机
    function rowClick(row: any, event: any, column?: any) {
      if (
        event.target.cellIndex === initColumns.value.length - 1 ||
        event.target.cellIndex === undefined
      ) {
        return;
      }
      emit("row-click", row, event, column);
      //设置单选
      if (JSON.stringify(row) !== JSON.stringify(oldCurrentRow)) {
        currentRowChange(row, oldCurrentRow);
        Object.assign(oldCurrentRow, row);
      }
    }

    // 行双击
    function rowDblclick(row: any, event: any) {
      if (
        event.target.cellIndex === initColumns.value.length - 1 ||
        !event.target.cellIndex
      ) {
        return;
      }
      emit("row-dblclick", row, event);
    }

    // 删除
    function rowDel(row: any, index: number) {
      emit("row-del", row, index, () => {
        let { parentList, index } = findData(row[rowKey.value]);
        if (parentList) parentList.value.splice(index, 1);
      });
    }

    // 编辑
    function rowEdit(row: any, index: number) {
      Object.assign(tableForm, deepClone(row));
      tableIndex.value = index;
      dialogForm.value.show("edit");
    }

    function setCurrentRow(row: any) {
      currentRowChange(row);
    }

    function tableDrop(type: string, el: any, callback: Function) {
      if (isSortable.value !== true) {
        if (type == "row" && !isRowSort.value) {
          return;
        } else if (type == "column" && isColumnSort.value) {
          return;
        }
      }
      Sortable.create(el, {
        ghostClass: config.ghostClass,
        chosenClass: config.ghostClass,
        animation: 500,
        delay: 0,
        onEnd: (evt: any) => callback(evt),
      });
    }

    async function validateCellField(index: number) {
      let result = true;
      const r = await formRef.value.validate();
      // const r = await formRef.value.validateFields([`cellForm.list.${index}`]);
      console.log("r: ", r);
      return result;
    }

    provide(CrudKey, {
      crud: {
        btnDisabledList,
        cascaderDIC,
        cellForm,
        childrenKey: childrenKey,
        dialogColumn: dialogColumn,
        DIC,
        emit,
        findData,
        getBtnIcon,
        getColumnProp,
        headerSort,
        isMediumSize: isMediumSize.value,
        isMobile,
        list: list,
        menuIcon,
        objectOption: objectOption.value,
        option: props.option,
        propOption,
        refreshTable,
        rowAdd,
        rowCancel,
        rowCell,
        rowCellAdd,
        rowDel,
        rowEdit,
        rowKey: rowKey,
        rowParentKey: rowParentKey,
        search: props.search,
        tableDrop,
        tableForm,
        tableIndex,
        tableOption,
        tableRef,
      },
    });

    onMounted(() => {
      dataInit();
    });

    expose({
      refreshTable,
      rowAdd,
      rowCancel,
      rowCell,
      rowCellAdd,
      rowEdit,
      setCurrentRow,
    });

    return () => {
      const { scroll } = attrs;
      return (
        <div class={prefixCls}>
          <HeaderSearch />
          <HeaderMenu v-slots={slots} />
          <a-form model={cellForm.list} ref={formRef}>
            <a-table
              columns={initColumns.value}
              customRow={(record: any, index: number) => {
                return {
                  onClick: (event: any) => rowClick(record, event), // 点击行
                  onDblclick: (event: any) => rowDblclick(record, event),
                };
              }}
              dataSource={cellForm.list}
              key={reload.value}
              loading={props.tableLoading}
              onChange={onChange}
              pagination={
                pageFlag.value &&
                vaildData(props.option.page, true) &&
                defaultPage
              }
              ref={tableRef}
              rowClassName={(record: any, index: number) => {
                return record[rowKey.value] === rowSelected[rowKey.value]
                  ? "ant-table-row-selected"
                  : null;
              }}
              scroll={{ x: 100, ...((scroll as object) || {}) }}
              size={controlSize.value}
              v-slots={{
                bodyCell: (prop: BodyCellParams) => {
                  const { column, index, text, record } = prop;
                  if (tableOption?.index && column.dataIndex === "seq") {
                    return index + 1;
                  }
                  if (
                    vaildData(tableOption?.menu, config.menu) &&
                    [column.dataIndex, column.key].includes(
                      propMap.value["operation"]
                    )
                  ) {
                    return (
                      <ColumnMenu
                        record={record}
                        index={index}
                        v-slots={{
                          menu: (scope: any) => {
                            return slots.menu && slots.menu(scope);
                          },
                          menuBtn: (scope: any) => {
                            return (
                              slots?.["menu-btn"] && slots?.["menu-btn"](scope)
                            );
                          },
                        }}
                      />
                    );
                  } else {
                    return (
                      <ColumnSlot
                        column={column}
                        columnOption={columnOption.value}
                        record={record}
                        index={index}
                        v-slots={slots}
                      />
                    );
                  }
                },
              }}
            />
          </a-form>
          <DialogColumn ref={dialogColumn} onOk={onGetThead} />
          <DialogForm ref={dialogForm} />
        </div>
      );
    };
  },
});
