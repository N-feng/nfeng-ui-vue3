import { PropType } from "vue";
import { getPrefix } from "../../../src/_utils/common";
import FormMenu from "./Menu";
import FormTemp from "../../core/components/form";
import { TableOption, Column } from "./types";
import useInit from "../../core/common/init";
import { setPx, vaildData } from "../../../src/utils/util";
import config from "./config";
import { formInitVal } from "../../../src/core/dataformat";
import { validatenull } from "../../../src/utils/validate";

const { prefixName, prefixCls } = getPrefix("Form");

export default defineComponent({
  name: prefixName,
  props: {
    option: {
      type: Object as PropType<TableOption>,
      required: true,
    },
    value: {},
    modelValue: {},
  },
  setup(props, { slots }) {

    const {
      tableOption,
      columnOptionRef,
      propOptionRef,
      DIC,
    } = useInit(props.option);

    const parentOptionRef = computed(() => {
      return tableOption || {};
    });

    const menuPositionRef = computed(() => {
      if (parentOptionRef.value.menuPosition) {
        return parentOptionRef.value.menuPosition;
      } else {
        return "center";
      }
    });

    const detailRef = computed(() => {
      return parentOptionRef.value.detail;
    });

    const isMenuRef = computed(() => {
      return columnOptionRef.value.length != 1;
    });

    const isDetailRef = computed(() => {
      return detailRef.value === true;
    });

    //初始化表单
    function dataFormat() {
      let formDefault = formInitVal(propOptionRef.value).tableForm;
      let formValue: any = Object.assign({}, props.modelValue, props.value);
      let formData: any = {};
      Object.entries(Object.assign(formDefault, formValue)).forEach((ele) => {
        let key = ele[0];
        let value = ele[1];
        if (validatenull(formValue?.[key])) {
          formData[key] = value;
        } else {
          formData[key] = formValue[key];
        }
      });
      return formData;
    }

    function getItemParams(
      column: Column ,
      item: TableOption,
      type: "span" | "xsSpan" | "offset" | "push" | "pull" | "labelWidth",
      isPx?: boolean
    ) {
      let result;
      if (!validatenull(column[type])) {
        result = column?.type;
      } else if (!validatenull(item[type])) {
        result = item?.type;
      } else {
        result = parentOptionRef.value[type];
      }
      result = vaildData(result, config[type]);
      return isPx ? setPx(result) : result;
    }

    let formData = dataFormat();

    provide("formSafe", {
      parentOption: parentOptionRef.value
    });

    return () => {
      const parentOption = parentOptionRef.value;
      const columnOption = columnOptionRef.value;
      const menuPosition = menuPositionRef.value;
      const isMenu = isMenuRef.value;
      const isDetail = isDetailRef.value;

      return (
        <div>
          <a-form>
            <a-row>
              {columnOption.map((item) => {
                return (
                  <>
                    {item.column?.map((column, cindex) => {
                      return (
                        <a-col
                          key={cindex}
                          span={getItemParams(column, item, "span")}
                          md={getItemParams(column, item, "span")}
                          sm={getItemParams(column, item, "span")}
                          xs={getItemParams(column, item, "xsSpan")}
                          offset={getItemParams(column, item, "offset")}
                          push={getItemParams(column, item, "push")}
                          pull={getItemParams(column, item, "pull")}
                        >
                          <a-form-item label={column.label}>
                            <FormTemp column={column} dic={(DIC as any)[column.prop]} />
                          </a-form-item>
                        </a-col>
                      );
                    })}
                    {!isDetail && !isMenu && (
                      <FormMenu
                        parentOption={parentOption}
                        menuPosition={menuPosition}
                        v-slots={{
                          menuForm: () => slots.menuForm && slots.menuForm(),
                        }}
                      />
                    )}
                  </>
                );
              })}
            </a-row>
          </a-form>
        </div>
      );
    };
  },
});
