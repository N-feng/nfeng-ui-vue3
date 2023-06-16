import { getPrefix } from "../../../src/_utils/common";
import { defineProps } from "../../core/common/props";
import { useProps } from "../../core/common/props";
import { useEvent, getLabelText } from "../../core/common/event";

const { prefixName } = getPrefix("Select");

const Select = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
    typeformat: Function,
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
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    let { textRef } = useEvent(props, emit);
    let netDic = ref(props.dic);
    let { filterable } = props;

    let { valueKey, labelKey } = useProps(props);

    let optionsRef = computed(() => {
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

    watch(() => props.dic, (val) => {
      netDic.value = val;
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
      if (
        props.allowCreate &&
        value &&
        !netDic.value.find((item: any) => item[valueKey.value] === value)
      ) {
        createOption = [
          {
            [labelKey.value]: value,
            [valueKey.value]: value,
          },
        ];
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
          { ...attrs }
          v-model:value={textRef.value}
          show-search={filterable}
          filter-option={filterOption}
          placeholder={props.placeholder || "请选择"}
          onSearch={filterable ? onChangeSelect : void 0}
          onBlur={getValue}
          onSelect={onSelect}
          options={optionsRef.value}
        />
      );
    };
  },
});

export default Select;