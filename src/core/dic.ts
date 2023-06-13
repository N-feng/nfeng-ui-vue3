import { TableOption, Column } from "../../packages/antd/form/types";
import { DIC_PROPS } from "../global/variable";
import { detailDataType } from "../utils/util";

function getDataType(list = [], props = {}, type: any) {
  let valueKey = (props as any).value || DIC_PROPS.value;
  let childrenKey = (props as any).children || DIC_PROPS.children;
  list.forEach((ele: any) => {
    ele[valueKey] = detailDataType(ele[valueKey], type);
    if (ele[childrenKey]) getDataType(ele[childrenKey], props, type);
  });
  return list;
}

export const loadLocalDic = (option: TableOption, safe: any) => {
  let columnData: any = {};
  let optionData = option?.dicData || {};
  option.column?.forEach((ele) => {
    if (ele.dicData) columnData[ele.prop] = getDataType(ele.dicData, ele.props, ele.dataType);
  })
  let result = { ...optionData, ...columnData };
  Object.keys(result).forEach(ele => {
    safe[ele] = result[ele];
  })
  return result;
};