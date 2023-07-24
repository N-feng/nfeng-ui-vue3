import kebabCase from "lodash-es/kebabCase";
export function getSlotName(item: any = {}, type = "D", slot?: any) {
  let result: any = {
    F: "Form",
    H: "Header",
    E: "Error",
    L: "Label",
    S: "Search",
    T: "Type",
    D: "",
  };
  // let name = item.prop + result[type];
  let name = `${item.prop}-${kebabCase(result[type])}`;
  if (slot) return slot[name];
  return name;
}

export function getSlotList(list: string[] = [], slot: any, propList: any) {
  propList = propList.map((ele: any) => ele.prop);
  return Object.keys(slot).filter((ele: any) => {
    let result = false;
    if (!propList.includes(ele)) {
      list.forEach((name) => {
        if (ele.includes(name)) result = true;
      });
    }
    return result;
  });
}
