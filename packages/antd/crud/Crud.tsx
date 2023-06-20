import {
  BodyCellParams,
} from "./types";
import { isEmpty, getPrefix } from "../../../src/_utils/common";
import useInit, { defineInit } from "../../core/common/init";
import { deepClone, getColumn } from "../../../src/utils/util";
import { calcCascader, formInitVal } from "../../../src/core/dataformat";
import Column from "./Column";
import { CrudKey } from "./common";

const { prefixName, prefixCls } = getPrefix("Crud");

export default defineComponent({
  name: prefixName,
  props: {
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    ...defineInit(),
  },
  setup(props, { attrs, slots }) {
    const cellForm: any = reactive({
      list: [],
    });

    const { DIC, cascaderDIC, tableOption, isMobile } = useInit(props.option);

    const columnOption = computed(() => {
      return getColumn(deepClone(tableOption.column));
    });

    const propOption = computed(() => {
      let result: any = [];
      function findProp(list: any = []) {
        if (!Array.isArray(list)) return;
        list.forEach((ele: any) => {
          if (Array.isArray(ele.children)) findProp(ele.children);
          else result.push(ele);
        });
      }
      findProp(columnOption.value);
      result = calcCascader(result);
      return result;
    });

    const objectOption = computed(() => {
      let result = {};
      propOption.value.forEach((ele: any) => {
        (result as any)[ele.prop] = ele;
      });
      return result;
    });

    provide(CrudKey, {
      crud: {
        cellForm,
        DIC,
        cascaderDIC,
        tableOption,
        isMobile,
        objectOption,
      }
    });

    function dataInit() {
      cellForm.list = props.data;
    }

    dataInit();

    return () => {
      return (
        <div class={prefixCls}>
          <>
            <a-table
              dataSource={cellForm.list}
              v-slots={{
                bodyCell: (prop: BodyCellParams) => {
                  const { column, index, text, record } = prop;
                  return <Column columnOption={columnOption.value} record={record} />;
                },
              }}
            />
          </>
        </div>
      );
    };
  },
});
