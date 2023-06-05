import { RowProps as ARowProps } from "ant-design-vue";
import useAttrs from "../../../src/_hooks/useAttrs";
import {
  GlobalComponentConstructor,
  PropsType,
} from "../../../src/types/ts-helpers";


const Row = defineComponent<ARowProps>({
  setup() {
    const attrs = useAttrs<ARowProps>();

    return () => {
      return <a-row {...attrs} />
    };
  },
});

export type RowProps = PropsType<typeof Row> & PropsType<ARowProps>;

// export default Row as GlobalComponentConstructor<RowProps>;

export default Row;