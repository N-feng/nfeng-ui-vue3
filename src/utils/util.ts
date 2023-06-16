import { DIC_PROPS, CHILDREN_LIST } from "../global/variable";
import { validatenull } from "./validate";

export const findNode = (list = [], props: any = {}, value: string) => {
  let valueKey = props.value || DIC_PROPS.value;
  let childrenKey = props.children || DIC_PROPS.children;
  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    if (ele[valueKey] == value) {
      return ele;
    } else if (ele[childrenKey] && Array.isArray(ele[childrenKey])) {
      let node: any = findNode(ele[childrenKey], props, value);
      if (node) return node;
    }
  }
};

export function findObject(list: any = [], value: string, prop = "prop") {
  let result: any;
  result = findNode(list, { value: prop }, value);
  if (!result) {
    list.forEach((ele: any) => {
      if (ele.column) {
        if (!result) result = findNode(ele.column, { value: prop }, value);
      } else if (ele.children && CHILDREN_LIST.includes(ele.type)) {
        if (!result)
          result = findNode(ele.children.column, { value: prop }, value);
      }
    });
  }
  return result;
}

export const getColumn = (column: any) => {
  let columnList = [];
  if (Array.isArray(column)) {
    columnList = column;
  } else {
    for (let o in column) {
      let columnMerge = {
        ...column[o],
        ...{ prop: o },
      };
      columnList.push(columnMerge);
    }
  }
  return columnList;
};

/**
 * 设置px像素
 */
export const setPx = (val: string | undefined, defval: any = "") => {
  if (validatenull(val)) val = defval;
  if (validatenull(val)) return "";
  val = val + "";
  if (val.indexOf("%") === -1) {
    val = val + "px";
  }
  return val;
};

/**
 * 字符串数据类型转化
 */
export const detailDataType = (value: any, type: string) => {
  if (validatenull(value)) return value;
  if (type === "number") {
    return Number(value);
  } else if (type === "string") {
    return value + "";
  } else {
    return value;
  }
};

/**
 * 验证是否存在true/false
 */
export const vaildData = (val: any, dafult: any) => {
  if (typeof val === "boolean") {
    return val;
  }
  return !validatenull(val) ? val : dafult;
};
