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
      let collapsed = collapsedRef.value;
      return (
        <a-layout-sider
          theme="light"
          v-model:collapsed={collapsedRef.value}
          trigger={<SiderTrigger
            modelValue={collapsed}
            
          />
          }
          collapsible
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
