import set from "lodash-es/set";

export default function (props: any, emit?: any, crud?: any) {
  const defaultPage = reactive({
    single: false,
    total: 0, // 总页数
    pagerCount: 7, //超过多少条隐藏
    current: 1, // 当前页数
    pageSize: 10, // 每页显示多少条
    pageSizes: [10, 20, 30, 40, 50, 100],
    layout: "total, sizes, prev, pager, next, jumper",
    background: true, // 背景颜色
  });

  if (crud.isMobole) {
    defaultPage.layout = "total, sizes, prev, pager, next";
  }

  const pageFlag = computed(() => {
    return defaultPage.total != 0;
  });

  // watch(() => props.page, (val) => {
  //   pageInit();
  // }, { deep: true });

  function pageInit() {
    Object.assign(defaultPage, props.page);
  }

  function updateValue(name: string | string[], value: any | any[]) {
    if (typeof name === "string") {
      set(props.page, name, value);
      Object.assign(defaultPage, {
        [name]: value,
      });
    } else if (Array.isArray(name)) {
      name.forEach((ele, index) => {
        set(props.page, ele, value[index]);
        Object.assign(defaultPage, {
          [ele]: value[index],
        });
      });
    }
  }

  // 页大小回调
  function sizeChange(val: number) {
    updateValue(["current", "pageSize"], [1, val]);
    emit("on-load", defaultPage);
    emit("size-change", val);
  }

  // 页码回调
  function currentChange(val: any) {
    updateValue("current", val);
    emit("on-load", defaultPage);
    emit("current-change", props.page.current);
  }

  function onChange(page: any, ...args: any[]) {
    if (
      page.current === defaultPage.current &&
      page.pageSize === defaultPage.pageSize
    ) {
      return;
    }
    if (page.current != defaultPage.current) {
      currentChange(page.current);
    } else if (page.pageSize != defaultPage.pageSize) {
      sizeChange(page.pageSize);
    }
  }

  onMounted(() => {
    pageInit();
    emit("on-load", defaultPage);
  });

  return {
    pageFlag,
    defaultPage,
    onChange,
  };
}
