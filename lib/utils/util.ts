import { validatenull } from "./validate";

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
