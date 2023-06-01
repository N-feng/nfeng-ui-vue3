import { getPrefix } from "../../../src/_utils/common";

import type { CSSProperties } from "vue";
type CSSPositionProperties = Pick<
  CSSProperties,
  "height" | "width" | "marginLeft"
>;

const { prefixName, prefixCls } = getPrefix("divider");

const props = {
  vertical: {
    type: Boolean,
  },
  virtual: {
    type: Boolean,
  },
  alignRight: {
    type: Boolean,
  },
  length: {
    type: String,
  },
} as const;

export default defineComponent({
  name: prefixName,
  props: props,
  setup(props) {
    const classObjRef = computed(() => ({
      [`${prefixCls}${
        props.vertical
          ? `--vertical${props.virtual ? "__virtual" : ""}`
          : `${props.virtual ? "--virtual" : ""}`
      }`]: true,
    }));

    return () => {
      const classObj = classObjRef.value;

      return <div class={classObj} />;
    };
  },
});
