import { Column } from "../../packages/antd/form/types";
import { validatenull } from "../utils/validate";
import {
  KEY_COMPONENT_NAME,
  KEY_CLASS_NAME,
  ARRAY_LIST,
  DATE_LIST,
  INPUT_LIST,
  ARRAY_VALUE_LIST,
  MULTIPLE_LIST,
  RANGE_LIST,
  SELECT_LIST,
  DIC_SPLIT,
} from "../global/variable";
import { detailDataType } from "../utils/util";

/**
 * 计算空白列row
 */
let count = 0;
export const calcCount = (ele: Column, spanDefault = 12, init = false) => {
  if (init) count = 0;
  const spanAll = 24;
  count = count + (ele.span || spanDefault) + (ele.offset || 0);
  if (count === spanAll) {
    count = 0;
  } else if (count > spanAll) {
    count = 0 + (ele.span || spanDefault) + (ele.offset || 0);
  } else if (ele.row && count !== spanAll) {
    ele.count = spanAll - count;
    count = 0;
  }
  return ele;
};

/**
 * 初始化数据格式
 */
export const initVal = (value: any, props: any) => {
  let {
    type,
    multiple,
    dataType,
    separator = DIC_SPLIT,
    alone,
    emitPath,
    range,
  } = props;
  let list = value;
  if (
    (MULTIPLE_LIST.includes(type) && multiple == true) ||
    (ARRAY_VALUE_LIST.includes(type) && emitPath !== false) ||
    (RANGE_LIST.includes(type) && range == true)
  ) {
    if (!Array.isArray(list)) {
      if (validatenull(list)) {
        list = [];
      } else {
        list = (list + '').split(separator) || [];
      }
    }
    // 数据转化
    list.forEach((ele: any, index: number) => {
      list[index] = detailDataType(ele, dataType);
    });
    if (ARRAY_LIST.includes(type) && validatenull(list) && alone) list = [''];
  } else {
    list = detailDataType(list, dataType)
  }
  return list;
};

/**
 * 动态获取组件
 */
export const getComponent = (type: string, component: any) => {
  let result = type || 'input';
  if (!validatenull(component)) {
    return component;
  } else if (ARRAY_LIST.includes(type)) {
    result = 'array';
  } else if (['time', 'timerange'].includes(type)) {
    result = 'time';
  } else if (DATE_LIST.includes(type)) {
    result = 'date';
  } else if (['password', 'textarea', 'search'].includes(type)) {
    result = 'input';
  } else if (INPUT_LIST.includes(type)) {
    result = 'input-' + type;
  }
  return KEY_CLASS_NAME + result;
};

/**
 * 表格初始化值
 */
export const formInitVal = (list: Column[] = []) => {
  let tableForm: any = {};
  list.forEach((ele: Column) => {
    if (
      ARRAY_VALUE_LIST.includes(ele.type) ||
      (MULTIPLE_LIST.includes(ele.type) && ele.multiple) || ele.dataType === 'array'
    ) {
      tableForm[ele.prop] = [];
    } else if (RANGE_LIST.includes(ele.type) && ele.range == true) {
      tableForm[ele.prop] = [0, 0]
    } else if (
      ['rate', 'slider', 'number'].includes(ele.type) ||
      ele.dataType === 'number'
    ) {
      tableForm[ele.prop] = undefined;
    } else {
      tableForm[ele.prop] = '';
    }
    // 表单默认值设置
    if (!validatenull(ele.value)) {
      tableForm[ele.prop] = ele.value;
    }
  });
  return {
    tableForm
  };
};


export const getPlaceholder = function (column: Column) {
  const placeholder = column.placeholder;
  const label = column.label;
  if (validatenull(placeholder)) {
    if (SELECT_LIST.includes(column.type)) {
      return `请选择 ${label}`;
    } else {
      return `请输入 ${label}`;
    }
  }
  return placeholder;
};
