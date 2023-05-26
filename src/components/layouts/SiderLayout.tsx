import { PropType } from "vue";
import { SystemMenu } from "../menus/SiderSystemMenu";
import SiderSystemMenu from "../menus/SiderSystemMenu";
import Divider from "../divider/Divider";

export default defineComponent({
  name: "SiderLayout",
  props: {
    systemMenus: {
      type: Array as PropType<SystemMenu[]>,
      required: true,
    },
    headerSelectedKeys: {
      type: Array as PropType<String[]>,
      required: true,
    },
  },
  setup(props) {
    const collapsedRef = ref();

    const handleClick = (v: boolean) => {
      collapsedRef.value = v;
    };
    return () => {
      const collapsed = collapsedRef.value;
      const { systemMenus, headerSelectedKeys } = props;
      return (
        <a-layout-sider theme="light" collapsed={collapsed}>
          <SiderSystemMenu
            systemMenus={systemMenus}
            headerSelectedKeys={headerSelectedKeys}
          />
          <Divider />
          <div
            class="icons__wrapper"
            style={{ left: `${collapsed ? 32 : 24}px` }}
          >
            {collapsed ? (
              <menu-unfold-outlined onClick={() => handleClick(false)} />
            ) : (
              <menu-fold-outlined onClick={() => handleClick(true)} />
            )}
          </div>
        </a-layout-sider>
      );
    };
  },
});
