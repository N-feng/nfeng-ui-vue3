import { KEY_CLASS_NAME } from "../../global/variable";

import type { CSSProperties } from "vue";
type CSSPositionProperties = Pick<
  CSSProperties,
  'height' | 'width' | 'marginLeft'
>

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
  name: "Divider",
  props: props,
  setup(props) {
    const classObjRef = computed(() => ({
      [`${KEY_CLASS_NAME}divider${
        props.vertical
          ? `--vertical${props.virtual ? "__virtual" : ""}`
          : `${props.virtual ? "--virtual" : ""}`
      }`]: true,
    }));

    return () => {
      const classObj = classObjRef.value;

      return (
        <div class={classObj} />
      )
    }
  },
});