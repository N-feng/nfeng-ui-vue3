import { TableOption, Column } from "../../antd/form/types";
import { getColumn } from "../../../src/utils/util";
import { calcCount } from "../../../src/core/dataformat";
import { loadLocalDic } from "../../../src/core/dic";
import config from "../../antd/form/config";

export default function useInit(option: TableOption) {
  let DIC = {};
  let tableOption = Object.assign({}, option);
  let isMobile: boolean = false;

  function getIsMobile() {
    isMobile = document.body.clientWidth <= 768;
  }

  const columnOptionRef = computed(() => {
    let column = getColumn(option.column);
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

  const propOptionRef = computed(() => {
    let list: Column[] = [];
    columnOptionRef.value.forEach((option: TableOption) => {
      if (option.display !== false) {
        (option?.column || []).forEach((column) => {
          list.push(column);
        });
      }
    });
    return list;
  });

  const resultOptionRef = computed(() => {
    return {
      ...option,
      ...{
        column: propOptionRef.value,
      },
    };
  });

  // 本地字典
  function handleLocalDic() {
    loadLocalDic(resultOptionRef.value, DIC);
  }

  function init() {
    getIsMobile();
    handleLocalDic();
  }

  init();

  return {
    tableOption,
    columnOptionRef,
    propOptionRef,
    resultOptionRef,
    isMobile,
    DIC,
  };
}
