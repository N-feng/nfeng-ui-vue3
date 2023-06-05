export default defineComponent({
  name: "ContentLayout",
  props: {
    collapsed: {
      type: Boolean
    }
  },
  setup(props) {
    return () => {
      const { collapsed } = props;
      return (
        <a-layout-content style={{
          marginLeft: collapsed ? "90px" : "210px"
        }}>
          <router-view />
        </a-layout-content>
      );
    };
  },
});