import { validatenull } from "../../../src/utils/validate";

export function getLabelText(item: any, typeformat: any, labelKey: string, valueKey: string) {
  if (validatenull(item)) return "";
  if (typeof typeformat === "function") {
    return typeformat(item, labelKey, valueKey);
  }
  return item[labelKey];
}
