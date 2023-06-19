import { TableOption, Column } from "../../antd/form/types";
import { getColumn } from "../../../src/utils/util";
import { calcCount } from "../../../src/core/dataformat";
import { loadLocalDic } from "../../../src/core/dic";
import config from "../../antd/form/config";

export default function useInit(option: TableOption) {
  let DIC: any = ref({});
  let tableOption = option;
  let isMobile: boolean = false;

  function getIsMobile() {
    isMobile = document.body.clientWidth <= 768;
  }

  const columnOption = computed(() => {
    let column = getColumn(Object.assign({}, tableOption)?.column);
    let group = option.group || [];
    group.unshift({
      column: column,
    });
    group.forEach((ele, index) => {
      ele.column = getColumn(ele.column);
      // 循环列的全部属性
      ele.column.forEach((column, cindex) => {
        //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
        if (column.display !== false && !isMobile) {
          column = calcCount(column, config.span, cindex === 0);
        }
      });
      //根据order排序
      ele.column = ele.column.sort((a, b) => (b.order || 0) - (a.order || 0));
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
      ...tableOption,
      ...{
        column: propOption.value,
      },
    };
  });

  // watch(
  //   () => option,
  //   (val) => {
  //     init(false);
  //   },
  //   { deep: true }
  // );

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
    tableOption,
    columnOption,
    propOption,
    resultOption,
    isMobile,
    DIC,
  };
}
