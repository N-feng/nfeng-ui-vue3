import { CrudKey } from "./common";
import { deepClone, vaildData } from "../../../src/utils/util";
import { getSearchType } from "../../../src/core/dataformat";
import config from "./config";
import Form from "../../antd/form/Form";

export default defineComponent({
  setup(props, ctx) {
    const { crud } = inject(CrudKey) as any;
    const show = ref(false);
    const searchIndex = crud.option.searchIndex || 2;

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
        vaildData(crud.option.searchIcon, false) && searchLen > searchIndex
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
          submitText: crud.option.searchBtnText || "搜索",
          submitBtn: vaildData(crud.option.searchBtn, config.searchSubBtn),
          // submitIcon: crud.getBtnIcon("searchBtn"),
          emptyText: crud.option.emptyBtnText || "暂无数据",
          emptyBtn: vaildData(crud.option.emptyBtn, config.emptyBtn),
          // emptyIcon: crud.getBtnIcon("emptyBtn"),
          menuSpan: (() => {
            if (show.value || !isSearchIcon.value) {
              return crud.option.searchMenuSpan;
            } else {
              return crud.option.searchMenuSpan < 6
                ? crud.option.searchMenuSpan
                : 6;
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

    return () => {
      return (
        <>{searchFlag.value && <Form option={option.value} model={search.value} />}</>
      );
    };
  },
});
