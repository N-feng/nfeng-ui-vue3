import { RowProps } from "ant-design-vue";
import useAttrs from "../../../src/_hooks/useAttrs";

type ARowProps = {} & RowProps

const Row = defineComponent<ARowProps>({
  setup() {
    const attrs = useAttrs<ARowProps>();

    return () => {
      return <a-row {...attrs} />
    };
  },
});

export default Row;