import kebabCase from "lodash-es/kebabCase";
import upperFirst from "lodash-es/upperFirst";
import { camelize } from "vue";
import { KEY_CLASS_NAME, KEY_COMPONENT_NAME } from "../global/variable";

/**
 * 根据组件名称生成具有前缀的组件名称和具有前缀的基础类样式，例如
 *
 * ```ts
 * getPrefix('alert'); // ['YAlert', 'ygp-alert']
 * getPrefix('search-table'); // ['YSearchTable', 'ygp-search-table']
 * getPrefix('searchTable'); // ['YSearchTable', 'ygp-search-table']
 * ```
 * @param name 组件名称
 */
export function getPrefix<T extends string>(name: T) {
  const compName = upperFirst(camelize(name));

  return {
    prefixName: `${KEY_COMPONENT_NAME}${compName}`,
    prefixCls: `${KEY_CLASS_NAME}${kebabCase(name)}`,
  };
}
