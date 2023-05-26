import { PropType } from "vue";
import { SystemMenu } from "../menus/SiderSystemMenu";
import SiderSystemMenu from "../menus/SiderSystemMenu";

export default defineComponent({
  name: "SiderLayout",
  props: {
    systemMenus: {
      type: Object as PropType<SystemMenu>,
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
      const { systemMenus } = props;
      return (
        <a-layout-sider theme="light" collapsed={collapsed}>
          <SiderSystemMenu systemMenus={systemMenus} />
          <divider />
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
