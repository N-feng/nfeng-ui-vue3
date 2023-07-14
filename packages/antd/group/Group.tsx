import { isEmpty, getPrefix } from "../../../src/_utils/common";
import b from "../../../src/utils/bem";

const { prefixName, prefixCls } = getPrefix("Group");

export default defineComponent({
  name: prefixName,
  props: {
    arrow: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
      default: true,
    },
    display: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  setup(props, { slots }) {
    const activeKey = ref([1]);
    const text = computed(() => (props.collapse ? 1 : 0));

    const isHeader = computed(() => {
      return (
        (slots.header && props.header) ||
        ((props.label || props.icon) && props.header)
      );
    });

    function handleChange(val: any) {
      console.log("val: ", val);
    }

    onMounted(() => {
      activeKey.value = [text.value];
    });

    return () => {
      const { arrow, label } = props;
      return (
        <div class={[b(prefixCls, { header: !isHeader.value, arrow: !arrow })]}>
          <a-collapse
            v-model:activeKey={activeKey.value}
            ghost
            onChange={handleChange}
          >
            <a-collapse-panel key={1} header={label}>
              {slots.default?.()}
            </a-collapse-panel>
          </a-collapse>
        </div>
      );
    };
  },
});
