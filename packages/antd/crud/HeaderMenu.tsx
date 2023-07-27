import { CrudKey } from "./common";
import config from "./config";
import { getPrefix } from "../../../src/_utils/common";
import { vaildData } from "../../../src/utils/util";
import b from "../../../src/utils/bem";

const { prefixName, prefixCls } = getPrefix("HeaderMenu");

export default defineComponent({
  setup(props, { attrs, slots }) {
    const { crud } = inject(CrudKey) as any;
    return () => {
      return (
        <div class={b(prefixCls, "header")}>
          {vaildData(crud.tableOption?.menuLeft, true) && (
            <div class={b(prefixCls, "left")}>
              {vaildData(crud.tableOption?.addBtn, config.addBtn) &&
                !crud.isIconMenu && (
                  <a-button
                    type="primary"
                    onClick={crud.rowAdd}
                    v-slots={{
                      icon: () =>
                        h(resolveComponent(crud.getBtnIcon("addBtn"))),
                    }}
                  >
                    {crud.menuIcon("addBtn")}
                  </a-button>
                )}
              {vaildData(crud.tableOption?.addRowBtn, config.addRowBtn) &&
                !crud.isIconMenu && (
                  <a-button type="primary" onClick={crud.rowCellAdd}>
                    {crud.menuIcon("addBtn")}
                  </a-button>
                )}
              {slots["menu-left"] &&
                slots["menu-left"]({ size: crud.isMediumSize })}
            </div>
          )}
          {vaildData(crud.tableOption?.menuRight, true) && (
            <div class={b(prefixCls, "right")}>
              {vaildData(crud.tableOption?.columnBtn, config.columnBtn) && (
                <a-button
                  shape="circle"
                  onClick={() => crud.dialogColumn.value.handleShow()}
                  v-slots={{
                    icon: () =>
                      h(resolveComponent(crud.getBtnIcon("columnBtn"))),
                  }}
                />
              )}
            </div>
          )}
        </div>
      );
    };
  },
});
