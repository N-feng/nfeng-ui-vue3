import { PropType } from "vue";

import MenuTree, { Menu } from "./MenuTree";
import { SelectEventHandler } from "ant-design-vue/es/menu/src/interface";
import { uResolve } from "../../utils/path";

export interface SystemMenu {
  tenementId: number;
  baseUrl: string;
  title: string;
  menuList: Menu[];
  redirectUrl?: string;
}

export default defineComponent({
  name: "SiderSystemMenu",
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
    const openKeysRef = ref<string[]>([]);
    const selectedKeysRef = ref<string[]>([]);
    const route = useRoute();
    const router = useRouter();
    const activeKey = ref<string>("");
    const { systemMenus, headerSelectedKeys } = props;

    const systemMenuRef = computed(() =>
      systemMenus.find((i: SystemMenu) => i.baseUrl === headerSelectedKeys[0])
    );

    const handleSelect: SelectEventHandler = ({ key, item }) => {
      if (item.href) {
        window.open(item.href);
      } else {
        router.push(`${key}`);
      }
      // activeKey.value = path as string;
    };

    watchEffect(() => {
      const { path, subPaths } = uResolve(route.path);

      openKeysRef.value = subPaths.map(
        (item) => `${headerSelectedKeys}${item}`
      );
      selectedKeysRef.value = [`${headerSelectedKeys}${path}`];
    });

    return () => {
      const openKeys = openKeysRef.value;
      const selectedKeys = selectedKeysRef.value;
      const systemMenu = systemMenuRef.value;
      return (
        <a-menu
          mode={"inline"}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onSelect={handleSelect}
        >
          <MenuTree menus={systemMenu?.menuList} baseUrl={systemMenu?.baseUrl} />
        </a-menu>
      );
    };
  },
});
