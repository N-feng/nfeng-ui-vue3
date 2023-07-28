import type { FormInstance } from "ant-design-vue";
import { CrudKey } from "./common";
import config from "./config";
import lang from "../../../src/locale/lang/zh";
import b from "../../../src/utils/bem";
import { cloneDeep } from "lodash-es";

import { isEmpty, getPrefix } from "../../../src/_utils/common";
import Sortable from "sortablejs";
const { prefixName, prefixCls } = getPrefix("DialogColumn");

export default defineComponent({
  emits: ["ok"],
  setup(props, { expose, emit }) {
    const columnBox = ref<boolean>(false);
    const { crud } = inject(CrudKey) as any;
    const tableRef = ref();

    let data = ref<any[]>([]);
    const defaultColumn = computed(() => {
      return [
        {
          label: lang.crud.column.name,
          prop: "label",
        },
        {
          label: lang.crud.column.hide,
          prop: "hide",
        },
        {
          label: lang.crud.column.fixed,
          prop: "fixed",
        },
        {
          label: lang.crud.column.filters,
          prop: "filters",
          hide: true,
        },
        {
          label: lang.crud.column.sortable,
          prop: "sortable",
          hide: true,
        },
        {
          label: lang.crud.column.index,
          prop: "index",
          hide: true,
        },
        {
          label: lang.crud.column.width,
          prop: "width",
          hide: true,
        },
      ]
        .map((ele: any) => {
          return {
            ...ele,
            title: ele.label,
            dataIndex: ele.prop,
            key: ele.prop,
          };
        })
        .filter((item: any) => item.hide !== true);
    });

    const checkAll = ref<boolean>(false);
    const normal = ref<any[]>([]);
    const fixedR = ref<any[]>([]);
    const fixedL = ref<any[]>([]);

    const indeterminate = computed(() => {
      return (
        !!(
          normal.value.filter((item) => !item.hide).length +
          fixedL.value.filter((item) => !item.hide).length +
          fixedR.value.filter((item) => !item.hide).length
        ) &&
        normal.value.filter((item) => !item.hide).length +
          fixedL.value.filter((item) => !item.hide).length +
          fixedR.value.filter((item) => !item.hide).length <
          crud.propOption.value.length
      );
    });

    function getCheckAll() {
      checkAll.value =
        normal.value.filter((item) => !item.hide).length +
          fixedL.value.filter((item) => !item.hide).length +
          fixedR.value.filter((item) => !item.hide).length ===
        crud.propOption.value.length;
    }

    function getColumns() {
      normal.value = [];
      fixedR.value = [];
      fixedL.value = [];
      const propOption = cloneDeep(crud.propOption.value);
      propOption.forEach((item: any) => {
        if (item.showColumn === false) return;
        if (item.fixed == "right") {
          fixedR.value.push(item);
        } else if (
          item.fixed == "left" ||
          (typeof item.fixed == "boolean" && item.fixed)
        ) {
          fixedL.value.push(item);
        } else {
          normal.value.push(item);
        }
      });
    }

    function handleAddFixedL(item: any, index: number, type: string) {
      item.fixed = "left";
      if (type === "normal") {
        normal.value.splice(index, 1);
      }
      if (type === "right") {
        fixedR.value.splice(index, 1);
      }
      fixedL.value.push(item);
    }

    function handleAddFixedR(item: any, index: number, type: string) {
      item.fixed = "right";
      if (type === "normal") {
        normal.value.splice(index, 1);
      }
      if (type === "left") {
        fixedL.value.splice(index, 1);
      }
      fixedR.value.push(item);
    }

    function handleAddNormal(item: any, index: number, type: string) {
      item.fixed = false;
      if (type === "left") {
        fixedL.value.splice(index, 1);
      }
      if (type === "right") {
        fixedR.value.splice(index, 1);
      }
      normal.value.push(item);
    }

    function handleCancel() {
      columnBox.value = false;
    }

    function handleOk() {
      const columns = [...fixedL.value, ...normal.value, ...fixedR.value];
      emit("ok", { columns });
      columnBox.value = false;
    }

    function handleReset() {
      normal.value.forEach((item) => {
        item.hide = false;
      });
      fixedL.value.forEach((item) => {
        item.hide = false;
      });
      fixedR.value.forEach((item) => {
        item.hide = false;
      });
      getCheckAll();
    }

    function handleShow() {
      data.value = [];
      crud.propOption.value.forEach((column: any) => {
        if (column.showColumn != false) data.value.push(column);
      });
      getColumns();
      getCheckAll();
      columnBox.value = true;
      setSort();
      nextTick(() => {
        // rowDrop();
      });
    }

    function onCheckAllChange(e: any) {
      const checked = e.target.checked;
      normal.value.forEach((item) => {
        item.hide = !checked;
      });
      fixedL.value.forEach((item) => {
        item.hide = !checked;
      });
      fixedR.value.forEach((item) => {
        item.hide = !checked;
      });
    }

    function rowDrop() {
      const el = tableRef.value.table.$el.querySelectorAll(
        config.dropRowClass
      )[0];
      crud.tableDrop("column", el, (evt: any) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;
        crud.headerSort(oldIndex, newIndex);
        crud.refreshTable(() => rowDrop());
      });
    }

    function setSort() {
      nextTick(() => {
        const ops = {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          chosenClass: "chosen",
        };
        Sortable.create(
          document.querySelector(".sort_left") as HTMLElement,
          ops
        );
        Sortable.create(
          document.querySelector(".sort_normal") as HTMLElement,
          ops
        );
        Sortable.create(
          document.querySelector(".sort_right") as HTMLElement,
          ops
        );
      });
    }

    expose({
      handleShow,
    });

    return () => {
      return (
        columnBox.value && (
          // <a-drawer
          //   v-model:visible={columnBox.value}
          //   placement={"right"}
          // >
          //   <a-table
          //     ref={tableRef}
          //     columns={defaultColumn.value}
          //     dataSource={data.value}
          //     pagination={false}
          //     v-slots={{
          //       bodyCell: ({ column, record }: any) => {
          //         if (column.prop !== "label") {
          //           return (
          //             <a-checkbox
          //               v-model:checked={
          //                 crud.objectOption[record.prop][column.prop]
          //               }
          //             ></a-checkbox>
          //           );
          //         }
          //       },
          //     }}
          //   />
          // </a-drawer>
          <a-modal
            v-model:visible={columnBox.value}
            class={b(prefixCls, "column")}
            title={lang.crud.showTitle}
            width={750}
            v-slots={{
              footer: () => {
                return (
                  <div class="modal_footer">
                    <div class="modal-left">
                      <a-checkbox
                        v-model:checked={checkAll.value}
                        indeterminate={indeterminate.value}
                        onChange={onCheckAllChange}
                      >
                        全选
                      </a-checkbox>
                    </div>
                    <div class="modal-right">
                      <a-button type="link" onClick={handleReset}>
                        重置
                      </a-button>
                      <a-button onClick={handleCancel}>取消</a-button>
                      <a-button type="primary" onClick={handleOk}>
                        确定
                      </a-button>
                    </div>
                  </div>
                );
              },
            }}
          >
            <div class="main">
              <div class="show_fields">
                <div class="title">固定在左侧</div>
                <div class="field_box">
                  <a-row class="sort_group sort_left">
                    {fixedL.value
                      .filter((item) => item.showColumn !== false)
                      .map((item: any, index) => {
                        return (
                          <a-col span={6} class="marginB10">
                            <div class="pointer">
                              <holder-outlined class="icon-menu" />
                              <a-checkbox
                                checked={!item.hide}
                                onChange={() => (
                                  (item.hide = !item.hide), getCheckAll()
                                )}
                              >
                                {item.label}
                              </a-checkbox>
                              <a-tooltip title="不固定">
                                <a-button
                                  type="link"
                                  size="small"
                                  onClick={() =>
                                    handleAddNormal(item, index, "left")
                                  }
                                  v-slots={{
                                    icon: () => (
                                      <vertical-align-middle-outlined />
                                    ),
                                  }}
                                ></a-button>
                              </a-tooltip>
                              <a-tooltip title="固定在列尾">
                                <a-button
                                  type="link"
                                  size="small"
                                  onClick={() =>
                                    handleAddFixedR(item, index, "left")
                                  }
                                  v-slots={{
                                    icon: () => (
                                      <vertical-align-bottom-outlined />
                                    ),
                                  }}
                                ></a-button>
                              </a-tooltip>
                            </div>
                          </a-col>
                        );
                      })}
                  </a-row>
                </div>
              </div>
              <div class="show_fields">
                <div class="title">不固定</div>
                <div class="field_box">
                  <a-row class="sort_group sort_normal">
                    {normal.value
                      .filter((item) => item.showColumn !== false)
                      .map((item: any, index) => {
                        return (
                          <a-col span={6} class="marginB10">
                            <div class="pointer">
                              <holder-outlined class="icon-menu" />
                              <a-checkbox
                                checked={!item.hide}
                                onChange={() => (
                                  (item.hide = !item.hide), getCheckAll()
                                )}
                              >
                                {item.label}
                              </a-checkbox>
                              <a-tooltip title="固定在列首">
                                <a-button
                                  type="link"
                                  size="small"
                                  onClick={() =>
                                    handleAddFixedL(item, index, "normal")
                                  }
                                  v-slots={{
                                    icon: () => <vertical-align-top-outlined />,
                                  }}
                                ></a-button>
                              </a-tooltip>
                              <a-tooltip title="固定在列尾">
                                <a-button
                                  type="link"
                                  size="small"
                                  onClick={() =>
                                    handleAddFixedR(item, index, "normal")
                                  }
                                  v-slots={{
                                    icon: () => (
                                      <vertical-align-bottom-outlined />
                                    ),
                                  }}
                                ></a-button>
                              </a-tooltip>
                            </div>
                          </a-col>
                        );
                      })}
                  </a-row>
                </div>
              </div>
              <div class="show_fields">
                <div class="title">固定在右侧</div>
                <div class="field_box">
                  <a-row class="sort_group sort_right">
                    {fixedR.value
                      .filter((item) => item.showColumn !== false)
                      .map((item: any, index) => {
                        return (
                          <a-col span={6} class="marginB10">
                            <div class="pointer">
                              <holder-outlined class="icon-menu" />
                              <a-checkbox
                                checked={!item.hide}
                                onChange={() => (
                                  (item.hide = !item.hide), getCheckAll()
                                )}
                              >
                                {item.label}
                              </a-checkbox>
                              <a-tooltip title="固定在列首">
                                <a-button
                                  type="link"
                                  size="small"
                                  onClick={() =>
                                    handleAddFixedL(item, index, "right")
                                  }
                                  v-slots={{
                                    icon: () => <vertical-align-top-outlined />,
                                  }}
                                ></a-button>
                              </a-tooltip>
                              <a-tooltip title="不固定">
                                <a-button
                                  type="link"
                                  size="small"
                                  onClick={() =>
                                    handleAddNormal(item, index, "right")
                                  }
                                  v-slots={{
                                    icon: () => (
                                      <vertical-align-middle-outlined />
                                    ),
                                  }}
                                ></a-button>
                              </a-tooltip>
                            </div>
                          </a-col>
                        );
                      })}
                  </a-row>
                </div>
              </div>
            </div>
          </a-modal>
        )
      );
    };
  },
});
