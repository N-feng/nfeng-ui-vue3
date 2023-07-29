import { PropType } from "vue";

import MenuTree, { Menu } from "./MenuTree";
import { SelectEventHandler } from "ant-design-vue/es/menu/src/interface";
import { uResolve } from "../../../src/utils/path";

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
    const openKeys = ref<string[]>([]);
    const selectedKeys = ref<string[]>([]);
    const route = useRoute();
    const router = useRouter();
    const activeKey = ref<string>("");
    const { systemMenus, headerSelectedKeys } = props;

    const systemMenu: any = computed(() =>
      systemMenus.find((i: SystemMenu) => i.baseUrl === headerSelectedKeys[0])
    );

    const handleSelect: SelectEventHandler = ({ key, item }) => {
      if (item.href) {
        window.open(item.href);
      } else {
        router.push(`${key}`);
      }
      activeKey.value = key as string;
    };

    watchEffect(() => {
      const { path, subPaths } = uResolve(route.path);

      openKeys.value = subPaths;
      selectedKeys.value = [path];
    });

    return () => {
      return (
        <a-menu
          mode={"inline"}
          openKeys={openKeys.value}
          selectedKeys={selectedKeys.value}
          onSelect={handleSelect}
        >
          <MenuTree
            menus={systemMenu.value.menuList}
            baseUrl={systemMenu.value.baseUrl}
          />
        </a-menu>
      );
    };
  },
});
