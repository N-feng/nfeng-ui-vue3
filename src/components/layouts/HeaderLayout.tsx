import { defineComponent } from "vue";
// import { RouterLink } from "vue-router";
// import Image from "../image/Image";
// import HeaderSystemMenu from "../menus/HeaderSystemMenu";
// import Row from "../row/Row";

export default defineComponent({
  name: "HeaderLayout",
  setup() {
    return () => {
      return (
        <div>HeaderLayout</div>
        // <a-layout-header>
        //   {/* <RouterLink to={"/"} class={"w-180 f-l"}>
        //     <Image src={"logo.png"} height={24} />
        //   </RouterLink> */}
        //   <Row justify="space-between" class={"text-nowrap"}>
        //     {/* <HeaderSystemMenu /> */}
        //     <Row class={"c-fff"}>
        //       <span class={"ml-10"}>hello</span>
        //     </Row>
        //   </Row>
        // </a-layout-header>
      )
    }
  }
})