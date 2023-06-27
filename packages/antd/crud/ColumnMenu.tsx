import { CrudKey } from "./common";
import { vaildData } from "../../../src/utils/util";
import config from "./config";

export default defineComponent({
  props: {
    record: {},
    index: {
      type: Number,
    },
  },
  setup(props) {
    const { crud } = inject(CrudKey) as any;

    const menuType = computed(() => {
      return crud.tableOption.menuType || "link";
    });

    const isIconMenu = computed(() => {
      return menuType.value === 'icon';
    });

    const isTextMenu = computed(() => {
      return menuType.value === 'text';
    });

    const isMenu = computed(() => {
      return menuType.value === 'menu';
    });

    function menuText(value: string) {
      return ["text", "menu"].includes(menuType.value) ? "text" : value;
    };

    return () => {
      return (
        <>
          {["button", "text", "icon", "link"].includes(menuType.value) && (
            <>
              {vaildData(crud.tableOption.editBtn, config.editBtn) &&
                !crud.tableOption.cellBtn && (
                  <a-button
                    type={menuText("link")}
                    size={crud.isMediumSize.value}
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
                    size={crud.isMediumSize.value}
                  >
                    {!isIconMenu.value && crud.menuIcon("delBtn")}
                  </a-button>
                )}
            </>
          )}
        </>
      );
    };
  },
});
