import { CrudKey } from "./common";
import config from "./config";
import { getPrefix } from "../../../src/_utils/common";
import { vaildData } from "../../../src/utils/util";

const { prefixName, prefixCls } = getPrefix("HeaderMenu");

export default defineComponent({
  setup(props, { attrs, slots }) {
    const { crud } = inject(CrudKey) as any;
    return () => {
      return (
        <div class={prefixCls}>
          <>
            {vaildData(crud.tableOption.menuLeft, true) && (
              <>
                {vaildData(crud.tableOption.addBtn, config.addBtn) &&
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
                {vaildData(crud.tableOption.addRowBtn, config.addRowBtn) &&
                  !crud.isIconMenu && (
                    <a-button type="primary" onClick={crud.rowCellAdd}>
                      {crud.menuIcon("addBtn")}
                    </a-button>
                  )}
                {slots["menu-left"] &&
                  slots["menu-left"]({ size: crud.isMediumSize })}
              </>
            )}
          </>
        </div>
      );
    };
  },
});
