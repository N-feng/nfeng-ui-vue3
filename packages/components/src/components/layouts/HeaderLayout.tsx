import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import Image from "../image/Image";
import Row from "../row/Row";
import HeaderSystemMenu from "../menus/HeaderSystemMenu";

export default defineComponent({
  name: "HeaderLayout",
  setup() {
    return () => {
      return (
        <a-layout-header>
          <RouterLink to={"/"} class={"w-180 f-l"}>
            <Image src={"logo.png"} height={24} />
          </RouterLink>
          <Row justify="space-between" class={"text-nowrap"}>
            <HeaderSystemMenu />
            <Row class={"c-fff"}>
              <span class={"ml-10"}>hello</span>
            </Row>
          </Row>
        </a-layout-header>
      )
    }
  }
})