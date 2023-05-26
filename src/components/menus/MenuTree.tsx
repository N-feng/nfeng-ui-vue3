import { PropType } from "vue";

export interface Menu {
  href: string;
  path: string;
  icon: string;
  level: number;
  title: string;
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
    return () => {
      const { menus, baseUrl } = props;
      return menus.map((menu) => {
        return (
          <>
            {menu.children && menu.children.length > 0 ? (
              <a-sub-menu
                key={`${baseUrl}${menu.path}`}
                v-slots={{
                  icon: () => (menu.icon ? h(menu.icon) : <menu-outlined />),
                  title: () => menu.title,
                }}
              >
                <MenuTree menus={menu.children} baseUrl={baseUrl} />
              </a-sub-menu>
            ) : (
              <a-menu-item key={`${baseUrl}${menu.path}`} href={menu.href}>{menu.title}</a-menu-item>
            )}
          </>
        );
      });
    };
  },
});

export default MenuTree;
