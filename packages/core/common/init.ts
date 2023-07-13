import { TableOption, Column } from "../../antd/form/types";
import { deepClone, getColumn } from "../../../src/utils/util";
import { calcCount } from "../../../src/core/dataformat";
import { loadLocalDic } from "../../../src/core/dic";
import config from "../../antd/form/config";
import { DIC_PROPS } from "../../../src/global/variable";

export const defineInit = () => ({
  option: {
    type: Object as PropType<TableOption>,
    required: true,
    default: () => {
      return {};
    },
  },
});

export default function useInit(option: any) {
  const DIC: any = ref({});
  const cascaderDIC: any = reactive({});
  const isMobile = ref(false);

  const columnOption = computed(() => {
    let tableOption = deepClone(option.value);
    let column = getColumn(tableOption?.column);
    let group = option.value?.group || [];
    group.unshift({
      column: column,
    });
    group.forEach((ele: any, index: number) => {
      ele.column = getColumn(ele.column);
      // 循环列的全部属性
      ele.column.forEach((column: any, cindex: number) => {
        //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
        if (column.display !== false && !isMobile) {
          column = calcCount(column, config.span, cindex === 0);
        }
      });
      //根据order排序
      ele.column = ele.column.sort((a: any, b: any) => (b.order || 0) - (a.order || 0));
    });
    return group;
  });

  const propOption = computed(() => {
    let list: Column[] = [];
    columnOption.value.forEach((option: TableOption) => {
      if (option.display !== false) {
        (option?.column || []).forEach((column) => {
          list.push(column);
        });
      }
    });
    return list;
  });

  const resultOption = computed(() => {
    return {
      ...option,
      ...{
        column: propOption.value,
      },
    };
  });

  const rowKey = computed(() => {
    return option.value?.rowKey || DIC_PROPS.rowKey;
  });

  const controlSize = computed(() => {
    return option.value?.size || "default";
  });

  const isMediumSize = computed(() => {
    return controlSize.value;
  });

  // watch(
  //   () => option,
  //   (val) => {
  //     init(false);
  //   },
  //   { deep: true }
  // );

  function getIsMobile() {
    isMobile.value = document.body.clientWidth <= 768;
  }

  // 本地字典
  function handleLocalDic() {
    const result = loadLocalDic(resultOption.value, DIC);
    Object.keys(result).forEach(ele => {
      DIC.value[ele] = result[ele];
    })
  }

  function init(type?: boolean) {
    getIsMobile();
    handleLocalDic();
    if (type !== false) return false;
  }

  init();

  return {
    DIC,
    cascaderDIC,
    controlSize,
    columnOption,
    isMediumSize,
    isMobile,
    propOption,
    resultOption,
    rowKey,
    tableOption: option,
  };
}
