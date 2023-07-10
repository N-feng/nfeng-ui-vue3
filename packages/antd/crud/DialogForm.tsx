import { CrudKey } from "./common";
import config from "./config";
import lang from "../../../src/locale/lang/zh";
import {
  deepClone,
  filterParams,
  setPx,
  vaildData,
} from "../../../src/utils/util";
import { validatenull } from "../../../src/utils/validate";
import Form from "../form/Form";

export default defineComponent({
  setup(props, { expose }) {
    const boxType = ref<string>("");
    const boxVisible = ref<boolean>(false);
    const { crud } = inject(CrudKey) as any;
    const disabled = ref<boolean>(false);
    const fullscreen = ref<boolean>(false);
    const tableForm = ref<any>();

    const isView = computed(() => {
      return boxType.value === "view";
    });

    const isAdd = computed(() => {
      return boxType.value === "add";
    });

    const isEdit = computed(() => {
      return boxType.value === "edit";
    });

    const formOption = computed(() => {
      let option = deepClone(crud.tableOption);
      option.boxType = boxType;
      option.column = deepClone(crud.propOption.value);
      option.menuBtn = false;
      if (isAdd.value) {
        option.submitBtn = option.saveBtn;
        option.submitText = crud.menuIcon("saveBtn");
        option.submitIcon = crud.getBtnIcon("saveBtn");
      } else if (isEdit.value) {
        option.submitBtn = option.updateBtn;
        option.submitText = crud.menuIcon("updateBtn");
        option.submitIcon = crud.getBtnIcon("updateBtn");
      } else if (isView.value) {
        option.detail = true;
      }
      option.emptyBtn = option.cancelBtn;
      option.emptyText = crud.menuIcon("cancelBtn");
      option.emptyIcon = crud.getBtnIcon("cancelBtn");
      //不分组的表单不加载字典
      if (!crud.isGroup) {
        option.dicFlag = false;
        option.dicData = crud.DIC;
      }
      if (!validatenull(option.dicFlag)) {
        option.column.forEach((ele: any) => {
          ele.boxType = boxType;
          ele.dicFlag = ele.dicFlag || option.dicFlag;
        });
      }
      return option;
    });

    const isDrawer = computed(() => {
      return crud.tableOption.dialogType === "drawer";
    });

    const dialogType = computed(() => {
      return isDrawer.value ? "ADrawer" : "AModal";
    });

    const width = computed(() => {
      return vaildData(
        crud.tableOption.dialogWidth + "",
        crud.isMobile ? "100%" : config.dialogWidth + ""
      );
    });

    const params = computed(() => {
      return isDrawer.value
        ? {
            size: fullscreen.value ? "100%" : setPx(width.value),
            direction: crud.tableOption.dialogDirection,
          }
        : {
            width: setPx(width.value),
            fullscreen: fullscreen.value,
          };
    });

    const dialogTitle = computed(() => {
      const key = `${boxType.value}`;
      if (!validatenull(boxType.value)) {
        return (
          crud.tableOption[key + "Title"] ||
          (lang as any)["crud"][`${key}Title`]
        );
      }
    });

    function submit() {
      tableForm.value.submit();
    }

    function reset() {
      tableForm.value.resetForm();
    }

    // 隐藏菜单
    function hide(done?: () => void) {
      const callback = () => {
        done && done();
        boxVisible.value = false;
      };
      callback();
    }

    // 显示表单
    function show(type: string) {
      boxType.value = type;
      const callback = () => {
        boxVisible.value = true;
      };
      callback();
    }

    function closeDialog(row: any) {
      row = deepClone(row);
      const callback = () => {
        if (isEdit.value) {
          let { parentList, index } = crud.findData(row[crud.rowKey]);
          if (parentList.value) {
            const oldRow = parentList.value.splice(index, 1)[0];
            row[crud.childrenKey.value] = oldRow[crud.childrenKey];
            parentList.value.splice(index, 0, row);
          }
        } else if (isAdd.value) {
          let { item } = crud.findData(row[crud.rowParentKey]);
          if (item) {
            if (!item[crud.childrenKey]) {
              item[crud.childrenKey] = [];
            }
            if (crud.tableOption.lazy) {
              item[crud.hasChildrenKey] = true;
            }
            item[crud.childrenKey].push(row);
          } else {
            crud.list.value.push(row);
          }
        }
      };
      if (row) callback();
      hide();
    }

    // 保存
    function rowSave(hide: Function) {
      crud.emit(
        "row-save",
        filterParams(crud.tableForm, ["$"]),
        closeDialog,
        hide
      );
    }

    // 更新
    function rowUpdate(hide: Function) {
      crud.emit(
        "row-update",
        filterParams(crud.tableForm, ["$"]),
        crud.tableIndex.value,
        closeDialog,
        hide
      );
    }

    function handleSubmit(form: any, hide: Function) {
      if (isAdd.value) {
        rowSave(hide);
      } else if (isEdit.value) {
        rowUpdate(hide);
      }
    }

    expose({
      show,
    });

    const Component = resolveComponent(dialogType.value) as string;

    return () => {
      return (
        <>
          {h(
            Component,
            {
              visible: boxVisible.value,
              title: dialogTitle.value,
              ...params.value,
              width: params.value.size,
              onClose: (event: any) => hide(),
            },
            {
              default: () => {
                return (
                  <>
                    {boxVisible.value && (
                      <Form
                        option={formOption.value}
                        model={crud.tableForm}
                        v-model:status={disabled.value}
                        ref={tableForm}
                        onSubmit={handleSubmit}
                        onReset-change={hide}
                      />
                    )}
                  </>
                );
              },
              footer: () => {
                return (
                  <>
                    <a-button onClick={submit} loading={disabled.value}>
                      {formOption.value.submitText}
                    </a-button>
                    <a-button onClick={reset} disabled={disabled.value}>
                      {formOption.value.emptyText}
                    </a-button>
                  </>
                );
              },
            }
          )}
        </>
      );
    };
  },
});
