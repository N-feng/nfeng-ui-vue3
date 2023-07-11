import type { FormInstance } from "ant-design-vue";
import { BodyCellParams } from "./types";
import { getPrefix } from "../../../src/_utils/common";
import { CrudKey } from "./common";
import config from "./config";
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
  emits: [
    "current-change",
    "on-load",
    "row-click",
    "row-dblclick",
    "row-del",
    "row-save",
    "row-update",
    "search-change",
  ],
  setup(props, { attrs, slots, emit, expose }) {
    const btnDisabledList: any = reactive({});
    const btnDisabled = ref(false);
    const cascaderFormList: any = reactive([]);
    const cellForm = reactive({
      list: [],
    });
    const dialogForm = ref();
    const formRef: any = ref<FormInstance>();
    const list: any = ref([]);
    const tableForm = reactive({});
    const tableIndex = ref(-1);

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

    const data = computed(() => props.data || []);

    const propMap = computed(() => {
      return Object.assign({}, defaultPropMap, props.propMap);
    });

    const treeProps = computed(() => {
      return tableOption.treeProps || {};
    });

    const rowParentKey = computed(() => {
      return props.option.rowParentKey || DIC_PROPS.rowParentKey;
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

    const mainSlot = computed(() => {
      let result: any = [];
      propOption.value.forEach((item: any) => {
        if (slots[item.prop]) result.push(item.prop);
      });
      return getSlotList(["Header", "Form"], slots, propOption.value).concat(
        result
      );
    });

    const objectOption = computed(() => {
      let result = {};
      propOption.value.forEach((ele: any) => {
        (result as any)[ele.prop] = ele;
      });
      return result;
    });

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
      if (vaildData(tableOption.index)) {
        const seq = reactive({
          title: tableOption.indexLabel || config.indexLabel,
          dataIndex: "seq",
          fixed: "left",
          align: "center",
          width: tableOption.indexWidth || config.indexWidth,
        });
        newColumns.unshift(seq);
      }
      if (vaildData(tableOption.menu, config.menu)) {
        newColumns.push({
          title: "操作",
          dataIndex: propMap.value["operation"],
          key: propMap.value["operation"],
          fixed: "right",
          align: "center",
          width: props.editable ? 60 : 160,
        });
      }
      return newColumns;
    });

    watch(
      () => props.data,
      (val) => {
        dataInit();
      }
    );

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

    async function validateCellField(index: number) {
      let result = true;
      const r = await formRef.value.validate();
      // const r = await formRef.value.validateFields([`cellForm.list.${index}`]);
      console.log("r: ", r);
      return result;
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
        !event.target.cellIndex
      ) {
        return;
      }
      emit("row-click", row, event, column);
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

    function findData(id: number | string) {
      let result: any = {};
      const callback = (parentList: any, parent?: any) => {
        parentList.value.forEach((ele: any, index: number) => {
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
      callback(list);
      return result;
    }

    provide(CrudKey, {
      crud: {
        btnDisabledList,
        cascaderDIC,
        cellForm,
        childrenKey: childrenKey.value,
        DIC,
        emit,
        findData,
        getBtnIcon,
        isMediumSize: isMediumSize.value,
        isMobile,
        list: list,
        menuIcon,
        objectOption: objectOption.value,
        option: props.option,
        propOption,
        rowAdd,
        rowCancel,
        rowCell,
        rowCellAdd,
        rowDel,
        rowEdit,
        rowKey: rowKey.value,
        rowParentKey: rowParentKey.value,
        search: props.search,
        tableOption,
        tableForm,
        tableIndex,
      },
    });

    function dataInit() {
      Object.assign(cellForm, {
        list: data.value,
      });
      list.value = data.value;
      list.value.forEach((ele: any, index: number) => {
        if (ele.$cellEdit && !cascaderFormList[index]) {
          cascaderFormList[index] = deepClone(ele);
        }
        ele.$cellEdit = ele.$cellEdit || false;
        ele.$index = index;
      });
    }

    onMounted(() => {
      dataInit();
    });

    expose({
      rowCancel,
      rowCell,
      rowCellAdd,
      rowEdit,
    });

    return () => {
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
              onChange={onChange}
              pagination={
                pageFlag.value &&
                vaildData(props.option.page, true) &&
                defaultPage
              }
              size={controlSize.value}
              v-slots={{
                bodyCell: (prop: BodyCellParams) => {
                  const { column, index, text, record } = prop;
                  if (tableOption.index && column.dataIndex === "seq") {
                    return index + 1;
                  }
                  if (
                    vaildData(tableOption.menu, config.menu) &&
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
          <DialogForm ref={dialogForm} />
        </div>
      );
    };
  },
});
