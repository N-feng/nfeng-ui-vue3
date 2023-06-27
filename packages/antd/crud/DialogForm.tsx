import { CrudKey } from "./common";
import lang from "../../../src/locale/lang/zh";
import { deepClone, filterParams } from "../../../src/utils/util";
import { validatenull } from "../../../src/utils/validate";
import Form from "../form/Form";

export default defineComponent({
  setup(props, { expose }) {
    const { crud } = inject(CrudKey) as any;

    const boxType = ref<string>("");
    const boxVisible = ref<boolean>(false);
    const tableForm = ref<any>();

    const isView = computed(() => {
      return boxType.value === 'view'
    })

    const isAdd = computed(() => {
      return boxType.value === "add";
    })

    const isEdit = computed(() => {
      return boxType.value === "edit";
    })

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
      return isDrawer.value ? "drawer" : "AModal";
    });

    const dialogTitle = computed( () => {
      const key = `${boxType.value}`;
      if (!validatenull(boxType.value)) {
        return crud.tableOption[key + "Title"] || (lang as any)['crud'][`${key}Title`];
      }
    });

    function submit() {
      tableForm.value.submit();
    }

    function reset() {
      tableForm.value.resetForm();
    }

    function closeDialog(row: any) {
      row = deepClone(row);
      const callback = () => {
        if (isEdit.value) {
          let { parentList, index } = crud.findData(row[crud.rowKey.value])
          if (parentList) {
            const oldRow = parentList.splice(index, 1)[0];
            row[crud.childrenKey.value] = oldRow[crud.childrenKey.value];
            parentList.splice(index, 0, row);
          }
        }
      }
      if (row) callback();
    }

    // 更新
    function rowUpdate(hide: Function) {
      crud.emit(
        "row-update",
        filterParams(crud.tableForm, ["$"]),
        crud.tableIndex.value,
        closeDialog,
        hide,
      );
    }

    function handleSubmit(form: any, hide: Function) {
      if (isAdd.value) {
        crud.handleAdd(tableForm.value);
      } else if (isEdit.value) {
        rowUpdate(hide);
      }
    }

    // 隐藏菜单
    function hide(done: () => void) {
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

    expose({
      show,
    });

    return () => {
      const Component = resolveComponent(dialogType.value) as string;
      return (
        <>
          {
            h(
              Component,
              {
                visible: boxVisible.value,
                title: dialogTitle.value,
              },
              {
                default: () => {
                  return (
                    <>
                      {boxVisible.value && (
                        <Form
                          option={formOption.value}
                          model={crud.tableForm}
                          ref={tableForm}
                          onSubmit={handleSubmit}
                          onResetChange={hide}
                        />
                      )}
                    </>
                  );
                },
                footer: () => {
                  return (
                    <>
                      <a-button onClick={submit}>
                        {formOption.value.submitText}
                      </a-button>
                      <a-button onClick={reset}>
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
