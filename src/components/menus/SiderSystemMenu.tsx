import { PropType } from "vue";

import MenuTree, { Menu } from "./MenuTree";
import { SelectEventHandler } from "ant-design-vue/es/menu/src/interface";
import { uResolve } from "../../utils/path";

export interface SystemMenu {
  baseUrl: string;
  title: string;
  routes: Menu[];
}

export default defineComponent({
  name: "SiderSystemMenu",
  props: {
    systemMenus: {
      type: Object as PropType<SystemMenu>,
      required: true,
    },
  },
  setup(props) {
    const selectedKeysRef = ref<string[]>([])
    const route = useRoute();
    const router = useRouter();
    const activeKey = ref<string>("");
    console.log("activeKey: ", activeKey);
    const handleSelect: SelectEventHandler = ({ key, item }) => {
      if (item.href) {
        window.open(item.href);
      } else {
        const path = key.toString().replace(props.systemMenus.baseUrl, "");
        router.push(path);
      }
      // activeKey.value = path as string;
    };

    watchEffect(() => {
      const {path} = uResolve(route.path)
      console.log('path: ', path);

      selectedKeysRef.value = [`${props.systemMenus.baseUrl}${path}`];
      console.log('`${props.systemMenus.baseUrl}${path}`: ', `${props.systemMenus.baseUrl}${path}`);
    });

    return () => {
      const { systemMenus } = props;
      console.log('systemMenus: ', systemMenus);
      const selectedKeys = selectedKeysRef.value;
      console.log('selectedKeys: ', selectedKeys);
      return (
        <a-menu mode={"inline"} selectedKeys={selectedKeys} onSelect={handleSelect}>
          <MenuTree menus={systemMenus.routes} baseUrl={systemMenus.baseUrl} />
        </a-menu>
      );
    };
  },
});
