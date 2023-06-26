import { DIC_PROPS, CHILDREN_LIST } from "../global/variable";
import { validatenull } from "./validate";

export function getAsVal(obj: any, bind = "") {
  let result = deepClone(obj);
  if (validatenull(bind)) return result;
  bind.split(".").forEach((ele) => {
    result = !validatenull(result[ele]) ? result[ele] : "";
  });
  return result;
}

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
/**
 * 根据位数获取*密码程度
 */
export const getPasswordChar = (result = '', char: string) => {
  let len = result.toString().length;
  result = '';
  for (let i = 0; i < len; i++) {
    result = result + char;
  }
  return result;
};

export const arraySort = (list = [], prop: string, callback: Function) => {
  return list
    .filter((ele) => !validatenull(ele[prop]))
    .sort((a, b) => callback(a, b))
    .concat(list.filter((ele) => validatenull(ele[prop])));
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

export const getObjType = (obj: any) => {
  var toString = Object.prototype.toString;
  var map: any = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
};

/**
 * 对象深拷贝
 */
export const deepClone = (data: any) => {
  var type = getObjType(data);
  var obj: any;
  if (type === 'array') obj = [];
  else if (type === 'object') obj = {};
  else return data;
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i];
        }
        return data[i];
      })();
      if (data[i]) {
        delete data[i].$parent;
      }
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      if (data) {
        delete data.$parent;
      }
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

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
 * 根据字典的value显示label
 */

export const getDicValue = (list: any, value: any, props: any = {}) => {
  if (validatenull(list)) return value
  let isArray = Array.isArray(value)
  value = isArray ? value : [value]
  let result: any = [];
  let labelKey = props[DIC_PROPS.label] || DIC_PROPS.label
  let groupsKey = props[DIC_PROPS.groups] || DIC_PROPS.groups
  let dic = deepClone(list);
  dic.forEach((ele: any) => {
    if (ele[groupsKey]) {
      dic = dic.concat(ele[groupsKey]);
      delete ele[groupsKey];
    }
  });
  value.forEach((val: any) => {
    if (Array.isArray(val)) {
      let array_result: any = []
      val.forEach(array_val => {
        let obj = findNode(dic, props, array_val) || {}
        array_result.push(obj[labelKey] || array_val);
      })
      result.push(array_result);
    } else {
      let obj = findNode(dic, props, val) || {}
      result.push(obj[labelKey] || val);
    }
  })
  if (isArray) {
    return result
  } else {
    return result.join('')
  }
};
/**
 * 过滤字典翻译字段和空字段
 */
export const filterParams = (form: any, list = ['', '$'], deep = true) => {
  let data = deep ? deepClone(form) : form
  for (let o in data) {
    if (list.includes('')) {
      if (validatenull(data[o])) delete data[o];
    }
    if (list.includes('$')) {
      if (o.indexOf('$') !== -1) delete data[o];
    }

  }
  return data
};
export const clearVal = (obj: any, propList: any, list: any[] = []) => {
  if (!obj) return {};
  propList.forEach((ele: string) => {
    if (list.includes(ele)) return;
    else if (ele.includes("$")) delete obj[ele];
    else if (!validatenull(obj[ele])) {
      let type = getObjType(obj[ele]);
      if (type === "array") obj[ele] = [];
      else if (type === "object") obj[ele] = {};
      else if (["number", "boolean"].includes(type)) obj[ele] = undefined;
      else obj[ele] = undefined;
    }
  });
  return obj;
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
