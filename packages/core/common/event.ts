import { initVal } from "../../../src/core/dataformat";
import { validatenull } from "../../../src/utils/validate";

export function getLabelText(item: any, typeformat: any, labelKey: string, valueKey: string) {
  if (validatenull(item)) return "";
  if (typeof typeformat === "function") {
    return typeformat(item, labelKey, valueKey);
  }
  return item[labelKey];
}

export function useEvent(props: any) {
  const textRef = ref(initVal(props.value, props));
  watch(() => textRef.value, (n) => {
    handleChange(n);
  });

  function handleChange(value: any) {
    let result = value;
    let flag =
      props.isString ||
      props.isNumber ||
      props.stringMode ||
      props.listType === "picture-img";
    if (flag && Array.isArray(value)) {
      result = value.join(props.separator);
    }
    props.onChange(result);
  }

  return {
    textRef,
  };
}