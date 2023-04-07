import { ARRAY_LIST, ARRAY_VALUE_LIST, MULTIPLE_LIST, RANGE_LIST } from "../global/variable";
import { Schema } from "../types";
import { isObject } from "../utils";
import { detailDataType } from "../utils/util";
import { validatenull } from "../utils/validate";

/**
 * 表格初始化值
 */
function initFormData(objectArray: string [], property: string) {
  console.log('objectArray: ', objectArray);
  return objectArray.reduce((obj, name) => {
    console.log('obj: ', obj);
      //  obj[name] = 'obj?.value';

    return obj;
  }, {} as any);
}
export function useFormData (schema: Schema) {
  console.log('schema: ', schema.properties);
  // initFormData(Object.keys(schema.properties || {}), 'properties')
};

export function formInitVal (node: Schema, name: string = 'properties') {
  if (!node || !node[name]) return;

  if (isObject(node[name])) {
    formInitVal(node[name])
  }
}
