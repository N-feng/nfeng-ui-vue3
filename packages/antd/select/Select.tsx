import { DIC_PROPS } from "../../../src/global/variable";
import { getPrefix } from "../../../src/_utils/common";
import { getLabelText } from "../../../src/core/event";

const { prefixName } = getPrefix("Select");

const Select = defineComponent({
  name: prefixName,
  props: {
    typeformat: Function,
    dic: {
      type: Array,
      default: () => {
        return {};
      },
    },
    column: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dicMap: {
      type: Object,
      default: () => DIC_PROPS,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let netDic: any[] = [];
    let propsDefault = DIC_PROPS;
    let { column, dic, typeformat, dicMap, filterable } = props;

    let valueKey = computed(() => {
      return dicMap.value || propsDefault.value;
    });

    let labelKey = computed(() => {
      return dicMap.label || propsDefault.label;
    });

    netDic = dic;

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return () => {
      return (
        <a-select show-search={filterable} filter-option={filterOption}>
          {netDic.map((item) => {
            return (
              <a-select-option
                value={item.value}
                label={getLabelText(
                  item,
                  typeformat,
                  labelKey.value,
                  valueKey.value
                )}
              >
                {getLabelText(item, typeformat, labelKey.value, valueKey.value)}
              </a-select-option>
            );
          })}
        </a-select>
      );
    };
  },
});

export default Select;