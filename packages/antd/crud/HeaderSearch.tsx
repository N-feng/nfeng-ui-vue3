import { CrudKey } from "./common";
import { deepClone, vaildData, filterParams } from "../../../src/utils/util";
import { getSearchType } from "../../../src/core/dataformat";
import config from "./config";
import Form from "../../antd/form/Form";

export default defineComponent({
  setup(props, ctx) {
    const { crud } = inject(CrudKey) as any;
    const show = ref(false);
    const searchIndex = crud.option.searchIndex || 2;

    watch(crud.propOption, (val) => {
      // console.log('val: ', val);
    }, { deep: true });

    const search = computed(() => {
      return crud.search;
    });

    const searchLen = computed(() => {
      let count = 0;
      crud.propOption.value.forEach((ele: any) => {
        if (ele.search) count++;
      });
      return count;
    });

    const searchFlag = computed(() => {
      return searchLen.value !== 0;
    });

    const isSearchIcon = computed(() => {
      return (
        vaildData(crud.option.searchIcon, false) && searchLen.value > searchIndex
      );
    });

    const option = computed(() => {
      const detailColumn = (list = []) => {
        list = deepClone(list);
        let column: any = [];
        let count = 0;
        list = list.sort((a: any, b: any) => (b.searchOrder || 0) - (a.searchOrder || 0));
        list.forEach((ele: any) => {
          if (ele.search) {
            let isCount = count < searchIndex;
            let obj: any = {};
            Object.keys(ele).forEach((item) => {
              let key = "search";
              if (item == "searchProp") return;
              if (item.includes(key)) {
                let result = item.replace(key, "");
                if (result.length == 0) return;
                result = result.replace(result[0], result[0].toLowerCase());
                obj[result] = ele[item];
              }
            });
            ele = Object.assign(ele, obj, {
              type: getSearchType(ele),
              detail: false,
              dicFlag: ele.cascader ? true : vaildData(ele.dicFlag, false),
              span:
                ele.searchSpan || crud.option.searchSpan || config.searchSpan,
              control: ele.searchControl,
              labelWidth:
                ele.searchLabelWidth ||
                crud.option.searchLabelWidth ||
                config.searchLabelWidth,
              labelPosition:
                ele.searchLabelPosition || crud.option.searchLabelPosition,
              size: ele.searchSize || crud.option.searchSize,
              value: ele.searchValue,
              rules: ele.searchRules,
              row: ele.searchRow,
              bind: ele.searchBin,
              disabled: ele.searchDisabled,
              readonly: ele.searchReadonly,
              display: isSearchIcon.value ? (show.value ? true : isCount) : true,
            });
            column.push(ele);
            count = count + 1;
          }
        });
        return column;
      };
      const detailOption = (list: any) => {
        let result = deepClone(list);
        let obj: any = {};
        Object.keys(result).forEach((item) => {
          let key = "search";
          if (item.includes(key)) {
            let str = item.replace(key, "");
            if (str.length == 0) return;
            str = str.replace(str[0], str[0].toLowerCase());
            obj[str] = result[item];
          }
        });
        result.column = detailColumn(crud.propOption.value);
        result = Object.assign(result, obj, {
          rowKey: crud.option.searchRowKey || "null",
          tabs: false,
          group: false,
          printBtn: false,
          mockBtn: false,
          submitText: crud.option.searchBtnText || "搜 索",
          submitBtn: vaildData(crud.option.searchBtn, config.searchSubBtn),
          submitIcon: crud.getBtnIcon("searchBtn"),
          emptyText: crud.option.emptyBtnText || "清 空",
          emptyBtn: vaildData(crud.option.emptyBtn, config.emptyBtn),
          emptyIcon: crud.getBtnIcon("emptyBtn"),
          menuSpan: (() => {
            if (show.value || !isSearchIcon.value) {
              return crud.option.searchMenuSpan;
            } else {
              return crud.option.searchMenuSpan < config.searchBtnSpan
                ? crud.option.searchMenuSpan
                : config.searchBtnSpan;
            }
          })(),
          menuPosition: crud.option.searchMenuPosition || "center",
          dicFlag: false,
          dicData: crud.DIC,
        });
        return result;
      };
      return detailOption(crud.option);
    });

    // 搜索回调
    function searchChange (form: any, done: Function) {
      form = filterParams(form);
      crud.propOption.value.forEach((ele: any) => {
        if (ele.searchProp) {
          form[ele.searchProp] = form[ele.prop];
          delete form[ele.prop];
        }
      });
      crud.emit("search-change", form, done);
    }

    function showChange () {
      show.value = !show.value;
    }

    return () => {
      return (
        <>
          {searchFlag.value && (
            <Form
              option={option.value}
              model={search.value}
              onSubmit={searchChange}
              v-slots={{
                menuForm: () => (
                  <>
                    {isSearchIcon.value && (
                      <a
                        style="font-size: 12px;margin: 0 8px"
                        onClick={showChange}
                      >
                        {show.value ? (
                          <up-outlined style="margin-right: 5px" />
                        ) : (
                          <down-outlined style="margin-right: 5px" />
                        )}
                        Collapse
                      </a>
                    )}
                  </>
                ),
              }}
            />
          )}
        </>
      );
    };
  },
});
