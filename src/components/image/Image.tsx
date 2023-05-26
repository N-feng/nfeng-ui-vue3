import { getPrefix } from "../../_utils/common";
import { defineComponent } from "vue";

const [prefixName, prefixCls] = getPrefix("image");

const Image = defineComponent({
  name: prefixName,
  props: {
    src: {
      type: String,
      required: true,
    },
    size: String,
    width: [String, Number],
    height: [String, Number],
    alt: String,
    round: String,
    radius: String,
  },
  setup(props) {
    const qn = "https://qiniu-fe.yigongpin.com/workbench/";
    const urlRef = ref("");
    watchEffect(() => {
      if (/^(http(s)?:)?\/{2}/.test(props.src)) {
        urlRef.value = props.src;
      } else if (/^~/.test(props.src)) {
        urlRef.value = `${qn}${props.src.slice(1)}`;
      } else {
        urlRef.value = new URL(`../assets/${props.src}`, import.meta.url).href;
      }
    });
    const styleObjRef = computed(() => {
      if (props.round) {
        return { borderRadius: "100%" };
      } else if (props.radius) {
        return { borderRadius: props.radius };
      } else {
        return "";
      }
    });
    return () => {
      const { size, width, height, alt } = props;
      const styleObj = styleObjRef.value;
      let url = urlRef.value;
      return (
        <img
          class={prefixCls}
          src={url}
          width={size || width}
          height={size || height}
          alt={alt}
          style={styleObj}
          onError={($event) => (url = `${qn}placeholder.png`)}
        />
      );
    };
  },
});

export default Image;
