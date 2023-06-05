import { PropType } from "vue";
import { SystemMenu } from "../menus/SiderSystemMenu";
import SiderSystemMenu from "../menus/SiderSystemMenu";
import SiderTrigger from "./SiderTrigger";

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
    let collapsedRef = ref<boolean>(false);

    const handleClick = (v: boolean) => {
      collapsedRef.value = v;
    };

    return () => {
      const { systemMenus, headerSelectedKeys } = props;
      const collapsed = collapsedRef.value;
      const style = {
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: "58px",
        bottom: 0,
      };
      return (
        <a-layout-sider
          theme="light"
          v-model:collapsed={collapsedRef.value}
          trigger={<SiderTrigger modelValue={collapsed} />}
          collapsible
          style={style}
        >
          <SiderSystemMenu
            systemMenus={systemMenus}
            headerSelectedKeys={headerSelectedKeys}
          />
        </a-layout-sider>
      );
    };
  },
});
