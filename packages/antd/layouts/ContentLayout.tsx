export default defineComponent({
  name: "ContentLayout",
  setup() {
    return () => {
      return (
        <a-layout-content class={"mg-10-10-0 f-oya1"}>
          <router-view />
        </a-layout-content>
      )
    }
  }
})