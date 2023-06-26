import { getPrefix, isBasicType } from "../../../src/_utils/common";
import { defineProps } from "../../core/common/props";
import { useProps } from "../../core/common/props";
import { useEvent, getLabelText } from "../../core/common/event";

const { prefixName } = getPrefix("Select");

const Select = defineComponent({
  name: prefixName,
  inheritAttrs: false,
  props: {
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
    const netDic = ref(props.dic);

    const { clearableVal, valueKey, labelKey } = useProps(props);
    const { text, handleFocus, handleBlur } = useEvent(props, emit);

    const computedOptions = computed(() => {
      const options = netDic.value.map((row: any) => {
        const option = {
          label: isBasicType(row) ? row : getLabelText(
            row,
            props.typeformat,
            labelKey.value,
            valueKey.value
          ),
          value: isBasicType(row) ? row : row[valueKey.value],
          item: row,
        }
        return option;
      });
      return options;
    });

    // watch(() => props.dic, (val) => {
    //   netDic.value = val;
    // });

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
    function getValue(event: any) {
      if (res && !choose && props.allowCreate) {
        text.value = res;
      }
      isBlur = true;
      handleBlur(event);
    }
    function onSelect(value: string) {
      choose = true;
      text.value = value;
    }
    return () => {
      return (
        <a-select
          {...attrs}
          v-model:value={text.value}
          show-search={props.filterable}
          filter-option={filterOption}
          allow-clear={clearableVal.value}
          placeholder={props.placeholder || "请选择"}
          onSearch={props.filterable ? onChangeSelect : void 0}
          onFocus={handleFocus}
          onBlur={getValue}
          onSelect={onSelect}
          options={computedOptions.value}
        />
      );
    };
  },
});

export default Select;