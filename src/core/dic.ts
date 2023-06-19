import { TableOption } from "../../packages/antd/form/types";
import { detailDataType } from "../utils/util";
import { validatenull } from "../utils/validate";
import { DIC_PROPS } from "../global/variable";
const key = "key";
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
  // Object.keys(result).forEach(ele => {
  //   safe[ele] = result[ele];
  // })
  return result;
};

export const sendDic = (params: any) => {
  let { url, value, column = {}, form = {} } = params;
  url = column.dicUrl || url;
  let list = url.match(/[^\{\}]+(?=\})/g) || [];
  list.forEach((ele: any) => {
    let result = ele === key ? value : form[ele];
    if (validatenull(result)) result = "";
    url = url.replace(`{{${ele}}}`, result);
  });

  return new Promise((resolve, reject) => {
    if (!url) resolve([]);
    console.log('url: ', url);
  });
};