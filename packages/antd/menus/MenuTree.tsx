import { PropType } from "vue";

export interface Menu {
  href: string;
  url: string;
  icon: string;
  level: number;
  menuCode: string;
  menuName: string;
  children: Menu[];
}

const MenuTree = defineComponent({
  name: "MenuTree",
  props: {
    menus: {
      type: Object as PropType<Menu[]>,
      required: true,
    },
    baseUrl: {
      type: String,
    },
  },
  setup(props) {
    const menus = computed(() => {
      return props.menus.filter((row: any) => !row.meta?.hide);
    });
    return () => {
      const { baseUrl } = props;
      return menus.value.map((menu) => {
        return (
          <>
            {menu.children && menu.children.length > 0 ? (
              <a-sub-menu
                key={`${baseUrl}${menu.url}`}
                v-slots={{
                  icon: () => (menu.icon ? h(menu.icon) : <menu-outlined />),
                  title: () => menu.menuName,
                }}
              >
                <MenuTree menus={menu.children} baseUrl={baseUrl} />
              </a-sub-menu>
            ) : (
              <a-menu-item key={`${baseUrl}${menu.url}`} href={menu.href}>
                {menu.menuName}
              </a-menu-item>
            )}
          </>
        );
      });
    };
  },
});

export default MenuTree;
