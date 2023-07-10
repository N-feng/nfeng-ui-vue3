import { CrudKey } from "./common";
import config from "./config";
import { vaildData } from "../../../src/utils/util";

export default defineComponent({
  props: {
    record: {},
    index: {
      type: Number,
    },
  },
  setup(props, { slots }) {
    const { crud } = inject(CrudKey) as any;

    const menuType = computed(() => {
      return crud.tableOption.menuType || "link";
    });

    const isIconMenu = computed(() => {
      return menuType.value === "icon";
    });

    const isTextMenu = computed(() => {
      return menuType.value === "text";
    });

    const isMenu = computed(() => {
      return menuType.value === "menu";
    });

    function menuText(value: string) {
      return ["text", "menu"].includes(menuType.value) ? "text" : value;
    }

    return () => {
      const record: any = props.record;
      const index: any = props.index;
      return (
        <>
          {["button", "text", "icon", "link"].includes(menuType.value) && (
            <>
              {vaildData((crud as any).tableOption.cellBtn, config.cellBtn) && (
                <>
                  {vaildData(crud.tableOption.editBtn, config.editBtn) &&
                    !record.$cellEdit && (
                      <a-button
                        type={menuText("link")}
                        disabled={crud.btnDisabledList[index]}
                        onClick={() => crud.rowCell(record, index)}
                      >
                        {crud.menuIcon("editBtn")}
                      </a-button>
                    )}
                  {vaildData(crud.tableOption.saveBtn, config.saveBtn) &&
                    record.$cellEdit && (
                      <a-button
                        type={menuText("link")}
                        disabled={crud.btnDisabledList[index]}
                        onClick={() => crud.rowCell(record, index)}
                      >
                        {crud.menuIcon("saveBtn")}
                      </a-button>
                    )}
                  {record.$cellEdit && (
                    <a-button
                      type={menuText("link")}
                      size={crud.isMediumSize}
                      disabled={crud.btnDisabledList[index]}
                      onClick={() => crud.rowCancel(record, index)}
                    >
                      {crud.menuIcon("cancelBtn")}
                    </a-button>
                  )}
                </>
              )}
              {vaildData(crud.tableOption.editBtn, config.editBtn) &&
                !crud.tableOption.cellBtn && (
                  <a-button
                    type={menuText("link")}
                    size={crud.isMediumSize}
                    onClick={() => crud.rowEdit(props.record, props.index)}
                  >
                    {!isIconMenu.value && crud.menuIcon("editBtn")}
                  </a-button>
                )}
              {vaildData(crud.tableOption.delBtn, config.delBtn) &&
                !(props.record as any).$cellEdit && (
                  <a-button
                    type={menuText("link")}
                    danger
                    size={crud.isMediumSize}
                    onClick={() => crud.rowDel(props.record, props.index)}
                  >
                    {!isIconMenu.value && crud.menuIcon("delBtn")}
                  </a-button>
                )}
            </>
          )}
          {slots.menu &&
            slots.menu({
              row: record,
              type: menuText("link"),
              disabled: crud.btnDisabled,
              size: crud.isMediumSize,
              index: index,
            })}
        </>
      );
    };
  },
});
