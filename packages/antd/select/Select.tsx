import { getPrefix } from "../../../src/_utils/common";
import { defineProps } from "../../core/common/props";
import { useInit } from "../../core/common/props";
import { getLabelText } from "../../core/common/event";

const { prefixName } = getPrefix("Select");

const Select = defineComponent({
  name: prefixName,
  props: {
    typeformat: Function,
    dic: {
      type: Array<any>,
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
    filterable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    ...defineProps(),
  },
  setup(props) {
    let textRef: any = ref(undefined);
    let netDic = ref(props.dic);
    let { column, filterable } = props;

    const { valueKey, labelKey } = useInit(props);

    const optionsRef = computed(() => {
      const options = netDic.value.map((row: any) => {
        return {
          ...row,
          value: row[valueKey.value],
          label: getLabelText(
            row,
            props.typeformat,
            labelKey.value,
            valueKey.value
          ),
          item: row,
        };
      });
      return options;
    });

    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    let res = "";
    let choose = false;
    let isBlur = false;
    let createOption = [];
    function onChangeSelect(value: string) {
      if (choose || isBlur) {
        res = "";
      }
      choose = false;
      isBlur = false;
      if (value) {
        res = value;
      }
      if (props.allowCreate && value && !netDic.value.find((item: any) => item[valueKey.value] === value)) {
        createOption = [
          {
            [labelKey.value]: value,
            [valueKey.value]: value,
          }
        ]
        netDic.value = [...createOption, ...props.dic];
      }
    }
    function getValue() {
      if (res && !choose) {
        textRef.value = res;
      }
      isBlur = true;
    }
    function onSelect(value: string) {
      choose = true;
      textRef.value = value;
    }
    return () => {
      const options = optionsRef.value;
      return (
          <a-select
            v-model={textRef.value}
            show-search={filterable}
            filter-option={filterOption}
            onSearch={onChangeSelect}
            onBlur={getValue}
            onSelect={onSelect}
            options={optionsRef.value}
          />
      );
    };
  },
});

export default Select;