

export default defineComponent({
  name: "Row",
  props: {
    reverse: Boolean,
    inline: Boolean,
    justify: {
      type: String,
      default: "center",
    },
    align: {
      type: Object as PropType<string | string[]>,
      default: "center",
    },
    wrap: Boolean,
    wrapReverse: Boolean,
  },
  setup(props, { slots }) {
    const classObjRef = computed(() => {
      const list = [];
      list.push(
        `ygp-row${props.reverse ? "-reverse" : ""}${
          props.inline
            ? `--inline${
                props.wrap
                  ? "__wrap"
                  : props.wrapReverse
                  ? "__wrap-reverse"
                  : ""
              }`
            : props.wrap
            ? "--wrap"
            : props.wrapReverse
            ? "--wrap-reverse"
            : ""
        }`
      );

      if (props.justify && props.justify !== "center") {
        list.push(`justify-content__${props.justify}`);
      }
      if (props.align) {
        if (typeof props.align === "string" && props.align !== "center") {
          list.push(`align-items__${props.align}`);
        } else if (props.align instanceof Array) {
          props.align[0] &&
            props.align[0] !== "center" &&
            list.push(`align-items__${props.align[0]}`);
          props.align[1] &&
            props.align[1] !== "stretch" &&
            list.push(`align-content__${props.align[1]}`);
        }
      }

      return list.map((className) => ({ [className]: true }));
    });

    return () => {
      const classObj = classObjRef.value;

      return <div class={classObj}>{slots.default && slots.default()}</div>;
    }
  },
});