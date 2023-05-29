import { TableOption } from "./types";

export default function useInit(option: TableOption) {
  let tableOption = option;

  function getIsMobile() {
    return document.body.clientWidth <= 768;
  }

  return {
    tableOption,
    isMobile: getIsMobile(),
  }
}