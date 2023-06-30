import { CrudKey } from "./common";
import { getPrefix } from "../../../src/_utils/common";
import { vaildData } from "../../../src/utils/util";
import config from "./config";

const { prefixName, prefixCls } = getPrefix("HeaderMenu");

export default defineComponent({
  setup(props, { attrs, slots }) {
    const { crud } = inject(CrudKey) as any;
    return () => {
      return (
        <div class={prefixCls}>
          <div>
            {vaildData(crud.tableOption.addBtn,config.addBtn) && !crud.isIconMenu && (
              <a-button type="primary" onClick={crud.rowAdd}>
                {crud.menuIcon("addBtn")}
              </a-button>
            )}
          </div>
        </div>
      );
    };
  },
});
