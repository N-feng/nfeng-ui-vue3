import { validatenull } from "./validate"

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
export const setPx = (val: string, defval = '') => {
  if (validatenull(val)) val = defval;
  if (validatenull(val)) return '';
  val = val + '';
  if (val.indexOf('%') === -1) {
    val = val + 'px';
  }
  return val;
};

/**
 * 字符串数据类型转化
 */
export const detailDataType = (value: any, type: string) => {
  if (validatenull(value)) return value
  if (type === 'number') {
    return Number(value);
  } else if (type === 'string') {
    return value + '';
  } else {
    return value;
  }
};

/**
 * 验证是否存在true/false
 */
export const vaildData = (val: any, dafult: any) => {
  if (typeof val === 'boolean') {
    return val;
  }
  return !validatenull(val) ? val : dafult;
};
