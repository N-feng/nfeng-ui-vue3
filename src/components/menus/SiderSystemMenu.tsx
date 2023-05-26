import { PropType } from "vue";

import MenuTree, { Menu } from "./MenuTree";

export interface SystemMenu {
  baseUrl: string
  title: string
  routes: Menu[]
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
    const router = useRouter();
    const activeKey = ref<string>('');
    console.log('activeKey: ', activeKey);
    const handleSelect = ({ key }: { key: string }) => {
      const path = key.replace(props.systemMenus.baseUrl, "");
      router.push(path);
      activeKey.value = path as string;
    };

    watchEffect(() => {
      console.log("watch")
    })

    return () => {
      const { systemMenus } = props;
      return (
        <a-menu mode={"inline"} onSelect={handleSelect}>
          <MenuTree menus={systemMenus.routes} baseUrl={systemMenus.baseUrl} />
        </a-menu>
      );
    };
  },
});