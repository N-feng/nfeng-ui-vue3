import { initVal } from "../../../src/core/dataformat";
import { validatenull } from "../../../src/utils/validate";
import { findNode } from "../../../src/utils/util";

export function getLabelText(item: any, typeformat: any, labelKey: string, valueKey: string) {
  if (validatenull(item)) return "";
  if (typeof typeformat === "function") {
    return typeformat(item, labelKey, valueKey);
  }
  return item[labelKey];
}

export function useEvent(props: any, emit?: any) {
  const text = ref(initVal(props.modelValue, props));

  watch(() => text.value, (n) => {
    handleChange(n);
  });

  watch(() => props.value, (val) => {
    text.value = initVal(val, props);
  });

  function bindEvent(name: string, params: any) {
    let item = findNode(props.dic, props.props, text.value);
    params = Object.assign(params, { column: props.column, dic: props.dic, item: item });
    if (typeof props[name] === "function") {
      if (name == "change") {
        if (props.column.cell != true) {
          props[name](params);
        }
      } else {
        props[name](params);
      }
    }
  }

  function handleFocus (event: any) {
    bindEvent("focus", { value: text.value, event });
  }

  function handleBlur (event: any) {
    bindEvent("blur", { value: text.value, event });
  }

  function handleClick (event: any) {
    bindEvent("click", { value: text.value, event });
  }

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
    bindEvent("change", { value: result });
    emit("update:modelValue", result);
  }

  return {
    text,
    handleFocus,
    handleBlur,
    handleClick,
  };
}